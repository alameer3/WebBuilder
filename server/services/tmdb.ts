import fetch from 'node-fetch';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  adult: boolean;
  video: boolean;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
    }>;
  };
  videos: {
    results: Array<{
      key: string;
      name: string;
      type: string;
      site: string;
    }>;
  };
  images: {
    backdrops: Array<{
      file_path: string;
      width: number;
      height: number;
    }>;
  };
}

export interface TMDBTVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
}

class TMDBService {
  private apiKey: string;

  constructor() {
    if (!TMDB_API_KEY) {
      throw new Error('TMDB_API_KEY is required');
    }
    this.apiKey = TMDB_API_KEY;
  }

  private async request(endpoint: string): Promise<any> {
    // بناء URL مع المعاملات الصحيحة
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${TMDB_BASE_URL}${endpoint}${separator}api_key=${this.apiKey}&language=ar-SA`;
    
    console.log('TMDB API Request URL:', url.replace(this.apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('TMDB API Error Response:', errorText);
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // جلب الأفلام الشائعة
  async getPopularMovies(page: number = 1): Promise<{ results: TMDBMovie[]; total_pages: number }> {
    return this.request(`/movie/popular?page=${page}`);
  }

  // جلب أحدث الأفلام
  async getNowPlayingMovies(page: number = 1): Promise<{ results: TMDBMovie[]; total_pages: number }> {
    return this.request(`/movie/now_playing?page=${page}`);
  }

  // جلب الأفلام الأعلى تقييماً
  async getTopRatedMovies(page: number = 1): Promise<{ results: TMDBMovie[]; total_pages: number }> {
    return this.request(`/movie/top_rated?page=${page}`);
  }

  // جلب الأفلام القادمة
  async getUpcomingMovies(page: number = 1): Promise<{ results: TMDBMovie[]; total_pages: number }> {
    return this.request(`/movie/upcoming?page=${page}`);
  }

  // جلب تفاصيل فيلم محدد
  async getMovieDetails(movieId: number): Promise<TMDBMovieDetails> {
    return this.request(`/movie/${movieId}?append_to_response=credits,videos,images`);
  }

  // البحث في الأفلام
  async searchMovies(query: string, page: number = 1): Promise<{ results: TMDBMovie[]; total_pages: number }> {
    const encodedQuery = encodeURIComponent(query);
    return this.request(`/search/movie?query=${encodedQuery}&page=${page}`);
  }

  // جلب المسلسلات الشائعة
  async getPopularTVShows(page: number = 1): Promise<{ results: TMDBTVShow[]; total_pages: number }> {
    return this.request(`/tv/popular?page=${page}`);
  }

  // جلب المسلسلات الأعلى تقييماً
  async getTopRatedTVShows(page: number = 1): Promise<{ results: TMDBTVShow[]; total_pages: number }> {
    return this.request(`/tv/top_rated?page=${page}`);
  }

  // جلب تفاصيل مسلسل
  async getTVShowDetails(tvId: number): Promise<any> {
    return this.request(`/tv/${tvId}?append_to_response=credits,videos,images`);
  }

  // جلب حلقات مسلسل
  async getTVSeasonEpisodes(tvId: number, seasonNumber: number): Promise<any> {
    return this.request(`/tv/${tvId}/season/${seasonNumber}`);
  }

  // جلب الأنواع (الأفلام)
  async getMovieGenres(): Promise<{ genres: Array<{ id: number; name: string }> }> {
    return this.request('/genre/movie/list');
  }

  // جلب الأنواع (المسلسلات)
  async getTVGenres(): Promise<{ genres: Array<{ id: number; name: string }> }> {
    return this.request('/genre/tv/list');
  }

  // جلب رابط الصورة
  getImageUrl(path: string, size: string = 'w500'): string {
    if (!path) return '/api/placeholder/300/450';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  // جلب رابط الخلفية
  getBackdropUrl(path: string, size: string = 'w1280'): string {
    if (!path) return '/api/placeholder/1280/720';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  // تحويل بيانات TMDB إلى تنسيق قاعدة البيانات
  convertTMDBMovieToDBFormat(tmdbMovie: TMDBMovieDetails): any {
    const directors = tmdbMovie.credits?.crew
      ?.filter(person => person.job === 'Director')
      ?.map(person => person.name) || [];
    
    const cast = tmdbMovie.credits?.cast
      ?.slice(0, 10)
      ?.map(person => person.name) || [];

    const genres = tmdbMovie.genres?.map(genre => genre.name) || [];
    
    const trailerKey = tmdbMovie.videos?.results
      ?.find(video => video.type === 'Trailer' && video.site === 'YouTube')?.key;

    return {
      title: tmdbMovie.title,
      originalTitle: tmdbMovie.original_title,
      description: tmdbMovie.overview,
      year: new Date(tmdbMovie.release_date).getFullYear(),
      duration: tmdbMovie.runtime,
      rating: Math.round(tmdbMovie.vote_average * 10) / 10,
      imdbRating: tmdbMovie.vote_average,
      tmdbRating: tmdbMovie.vote_average,
      genre: genres,
      poster: this.getImageUrl(tmdbMovie.poster_path),
      backdrop: this.getBackdropUrl(tmdbMovie.backdrop_path),
      trailer: trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null,
      quality: 'HD',
      language: tmdbMovie.original_language === 'ar' ? 'العربية' : 'الإنجليزية',
      subtitle: tmdbMovie.original_language === 'ar' ? [] : ['العربية'],
      category: 'movie',
      section: tmdbMovie.original_language === 'ar' ? 'عربي' : 'مترجم',
      country: tmdbMovie.production_countries?.[0]?.name || 'غير محدد',
      director: directors,
      cast: cast,
      isNew: new Date(tmdbMovie.release_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      isFeatured: tmdbMovie.vote_average > 8.0,
      isRecommended: tmdbMovie.popularity > 50
    };
  }

  // تحويل بيانات مسلسل TMDB إلى تنسيق قاعدة البيانات  
  convertTMDBTVToDBFormat(tmdbTV: any): any {
    const directors = tmdbTV.credits?.crew
      ?.filter((person: any) => person.job === 'Director')
      ?.map((person: any) => person.name) || [];
    
    const cast = tmdbTV.credits?.cast
      ?.slice(0, 10)
      ?.map((person: any) => person.name) || [];

    const genres = tmdbTV.genres?.map((genre: any) => genre.name) || [];
    
    const trailerKey = tmdbTV.videos?.results
      ?.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube')?.key;

    return {
      title: tmdbTV.name,
      originalTitle: tmdbTV.original_name,
      description: tmdbTV.overview,
      year: new Date(tmdbTV.first_air_date).getFullYear(),
      rating: Math.round(tmdbTV.vote_average * 10) / 10,
      imdbRating: tmdbTV.vote_average,
      tmdbRating: tmdbTV.vote_average,
      genre: genres,
      poster: this.getImageUrl(tmdbTV.poster_path),
      backdrop: this.getBackdropUrl(tmdbTV.backdrop_path),
      trailer: trailerKey ? `https://www.youtube.com/watch?v=${trailerKey}` : null,
      quality: 'HD',
      language: tmdbTV.original_language === 'ar' ? 'العربية' : 'الإنجليزية',
      subtitle: tmdbTV.original_language === 'ar' ? [] : ['العربية'],
      category: 'series',
      section: tmdbTV.original_language === 'ar' ? 'عربي' : 'مترجم',
      country: tmdbTV.origin_country?.[0] || 'غير محدد',
      director: directors,
      cast: cast,
      isNew: new Date(tmdbTV.first_air_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      isFeatured: tmdbTV.vote_average > 8.0,
      isRecommended: tmdbTV.popularity > 50
    };
  }
}

export const tmdbService = new TMDBService();