import { tmdbService, TMDBMovieDetails } from './tmdb';
import { storage } from '../storage';

export class DataPopulationService {
  
  // تعبئة قاعدة البيانات بالأفلام الحقيقية
  async populateMovies(): Promise<void> {
    console.log('🎬 بدء تعبئة قاعدة البيانات بالأفلام...');
    
    try {
      const movieCategories = [
        { name: 'popular', pages: 10 },
        { name: 'top_rated', pages: 8 },
        { name: 'now_playing', pages: 5 },
        { name: 'upcoming', pages: 3 }
      ];

      let totalMoviesAdded = 0;

      for (const category of movieCategories) {
        console.log(`📥 جلب أفلام ${category.name}...`);
        
        for (let page = 1; page <= category.pages; page++) {
          let movies;
          
          switch (category.name) {
            case 'popular':
              movies = await tmdbService.getPopularMovies(page);
              break;
            case 'top_rated':
              movies = await tmdbService.getTopRatedMovies(page);
              break;
            case 'now_playing':
              movies = await tmdbService.getNowPlayingMovies(page);
              break;
            case 'upcoming':
              movies = await tmdbService.getUpcomingMovies(page);
              break;
            default:
              continue;
          }

          for (const movie of movies.results) {
            try {
              // جلب تفاصيل الفيلم الكاملة
              const movieDetails: TMDBMovieDetails = await tmdbService.getMovieDetails(movie.id);
              
              // تحويل البيانات إلى تنسيق قاعدة البيانات
              const dbMovieData = tmdbService.convertTMDBMovieToDBFormat(movieDetails);
              
              // إضافة الفيلم لقاعدة البيانات
              await storage.createMovie(dbMovieData);
              totalMoviesAdded++;
              
              console.log(`✅ تم إضافة: ${movieDetails.title}`);
              
              // تأخير قصير لتجنب تجاوز حدود API
              await new Promise(resolve => setTimeout(resolve, 250));
              
            } catch (error) {
              console.error(`❌ خطأ في إضافة فيلم ${movie.title}:`, error);
            }
          }
          
          console.log(`📄 تم الانتهاء من صفحة ${page} من ${category.name}`);
        }
      }

      console.log(`🎉 تم الانتهاء! تم إضافة ${totalMoviesAdded} فيلم إلى قاعدة البيانات`);
      
    } catch (error) {
      console.error('❌ خطأ في تعبئة الأفلام:', error);
      throw error;
    }
  }

  // تعبئة قاعدة البيانات بالمسلسلات
  async populateTVShows(): Promise<void> {
    console.log('📺 بدء تعبئة قاعدة البيانات بالمسلسلات...');
    
    try {
      const tvCategories = [
        { name: 'popular', pages: 6 },
        { name: 'top_rated', pages: 5 }
      ];

      let totalShowsAdded = 0;

      for (const category of tvCategories) {
        console.log(`📥 جلب مسلسلات ${category.name}...`);
        
        for (let page = 1; page <= category.pages; page++) {
          let shows;
          
          switch (category.name) {
            case 'popular':
              shows = await tmdbService.getPopularTVShows(page);
              break;
            case 'top_rated':
              shows = await tmdbService.getTopRatedTVShows(page);
              break;
            default:
              continue;
          }

          for (const show of shows.results) {
            try {
              // جلب تفاصيل المسلسل الكاملة
              const showDetails = await tmdbService.getTVShowDetails(show.id);
              
              // تحويل البيانات إلى تنسيق قاعدة البيانات
              const dbShowData = tmdbService.convertTMDBTVToDBFormat(showDetails);
              
              // إضافة المسلسل لقاعدة البيانات
              await storage.createMovie(dbShowData);
              totalShowsAdded++;
              
              console.log(`✅ تم إضافة: ${showDetails.name}`);
              
              // تأخير قصير لتجنب تجاوز حدود API
              await new Promise(resolve => setTimeout(resolve, 300));
              
            } catch (error) {
              console.error(`❌ خطأ في إضافة مسلسل ${show.name}:`, error);
            }
          }
          
          console.log(`📄 تم الانتهاء من صفحة ${page} من ${category.name}`);
        }
      }

      console.log(`🎉 تم الانتهاء! تم إضافة ${totalShowsAdded} مسلسل إلى قاعدة البيانات`);
      
    } catch (error) {
      console.error('❌ خطأ في تعبئة المسلسلات:', error);
      throw error;
    }
  }

  // تعبئة الأنواع (الفئات)
  async populateGenres(): Promise<void> {
    console.log('🏷️ تعبئة أنواع الأفلام والمسلسلات...');
    
    try {
      // جلب أنواع الأفلام
      const movieGenres = await tmdbService.getMovieGenres();
      const tvGenres = await tmdbService.getTVGenres();
      
      // دمج الأنواع وإزالة المكررات
      const allGenres = [...movieGenres.genres, ...tvGenres.genres];
      const uniqueGenres = allGenres.filter((genre, index, self) => 
        index === self.findIndex(g => g.id === genre.id)
      );

      for (const genre of uniqueGenres) {
        try {
          await storage.createCategory({
            name: genre.name,
            nameAr: this.translateGenreToArabic(genre.name),
            slug: genre.name.toLowerCase().replace(/\s+/g, '-'),
            description: `أفلام ومسلسلات ${this.translateGenreToArabic(genre.name)}`,
            type: 'genre'
          });
          
          console.log(`✅ تم إضافة نوع: ${genre.name}`);
        } catch (error) {
          console.error(`❌ خطأ في إضافة نوع ${genre.name}:`, error);
        }
      }

      console.log(`🎉 تم إضافة ${uniqueGenres.length} نوع إلى قاعدة البيانات`);
      
    } catch (error) {
      console.error('❌ خطأ في تعبئة الأنواع:', error);
      throw error;
    }
  }

  // ترجمة أنواع الأفلام للعربية
  private translateGenreToArabic(englishGenre: string): string {
    const translations: { [key: string]: string } = {
      'Action': 'أكشن',
      'Adventure': 'مغامرة',
      'Animation': 'رسوم متحركة',
      'Comedy': 'كوميديا',
      'Crime': 'جريمة',
      'Documentary': 'وثائقي',
      'Drama': 'دراما',
      'Family': 'عائلي',
      'Fantasy': 'خيال',
      'History': 'تاريخي',
      'Horror': 'رعب',
      'Music': 'موسيقي',
      'Mystery': 'غموض',
      'Romance': 'رومانسي',
      'Science Fiction': 'خيال علمي',
      'TV Movie': 'فيلم تلفزيوني',
      'Thriller': 'إثارة',
      'War': 'حرب',
      'Western': 'غربي',
      'Action & Adventure': 'أكشن ومغامرة',
      'Kids': 'أطفال',
      'News': 'أخبار',
      'Reality': 'واقعي',
      'Soap': 'مسلسل درامي',
      'Talk': 'حوار',
      'War & Politics': 'حرب وسياسة',
      'Sci-Fi & Fantasy': 'خيال علمي وفانتازيا'
    };

    return translations[englishGenre] || englishGenre;
  }

  // تعبئة كاملة لقاعدة البيانات
  async populateAll(): Promise<void> {
    console.log('🚀 بدء التعبئة الكاملة لقاعدة البيانات...');
    
    try {
      // تعبئة الأنواع أولاً
      await this.populateGenres();
      
      // تعبئة الأفلام
      await this.populateMovies();
      
      // تعبئة المسلسلات
      await this.populateTVShows();
      
      console.log('🎉 تم الانتهاء من التعبئة الكاملة لقاعدة البيانات!');
      
    } catch (error) {
      console.error('❌ خطأ في التعبئة الكاملة:', error);
      throw error;
    }
  }

  // البحث والإضافة لأفلام محددة (بحث بالاسم)
  async addSpecificMovies(movieTitles: string[]): Promise<void> {
    console.log('🔍 البحث وإضافة أفلام محددة...');
    
    for (const title of movieTitles) {
      try {
        const searchResults = await tmdbService.searchMovies(title);
        
        if (searchResults.results.length > 0) {
          const movie = searchResults.results[0]; // أخذ أول نتيجة
          const movieDetails = await tmdbService.getMovieDetails(movie.id);
          const dbMovieData = tmdbService.convertTMDBMovieToDBFormat(movieDetails);
          
          await storage.createMovie(dbMovieData);
          console.log(`✅ تم إضافة: ${movieDetails.title}`);
          
          // تأخير قصير
          await new Promise(resolve => setTimeout(resolve, 250));
        } else {
          console.log(`❌ لم يتم العثور على: ${title}`);
        }
      } catch (error) {
        console.error(`❌ خطأ في إضافة ${title}:`, error);
      }
    }
  }
}

export const dataPopulationService = new DataPopulationService();