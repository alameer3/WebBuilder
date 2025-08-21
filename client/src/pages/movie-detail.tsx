// صفحة تفاصيل الفيلم/المسلسل - مطابقة تماماً لـ ak.sv
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Heart, Download, Play, Star, ThumbsUp, ThumbsDown, Share2, Eye, User } from 'lucide-react';

// استيراد CSS الأصلي
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/akwam.css';
import '../assets/css/movie-detail.css';

// استيراد المكونات
import AkwamHeader from '../components/AkwamHeader';

interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  poster: string;
  backdrop?: string;
  year: number;
  duration?: number;
  rating: number;
  imdbRating?: number;
  tmdbRating?: number;
  genre: string[];
  tags?: string[];
  description: string;
  quality: string;
  language: string;
  subtitle: string[];
  category: string;
  section: string;
  country: string;
  director: string[];
  cast: string[];
  writer?: string[];
  producer?: string[];
  trailer?: string;
  viewCount?: number;
  downloadCount?: number;
  likeCount?: number;
  dislikeCount?: number;
}

export default function MovieDetail() {
  const params = useParams();
  const movieId = params.id;
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // جلب تفاصيل الفيلم
  const { data: movieResponse, isLoading, error } = useQuery({
    queryKey: ['/api/movies', movieId],
    enabled: !!movieId
  });

  const movie = Array.isArray(movieResponse) ? 
    movieResponse.find((m: any) => m.id === movieId) : 
    (movieResponse as any)?.movies?.find((m: any) => m.id === movieId) || 
    movieResponse as Movie;

  // جلب الأفلام المشابهة
  const { data: relatedMovies } = useQuery({
    queryKey: ['/api/movies'],
    select: (data: any) => {
      const movies = data?.movies || [];
      if (!movie?.genre) return [];
      
      return movies.filter((m: Movie) => 
        m.id !== movieId && 
        movie.genre.some((g: string) => m.genre?.includes(g))
      ).slice(0, 12);
    },
    enabled: !!movie
  });

  useEffect(() => {
    // تطبيق كلاسات body الأصلية
    document.body.className = 'header-fixed header-pages';
    
    if (movie) {
      // تحديث title الصفحة
      document.title = `${movie.title} | يمن فليكس`;
      
      // إضافة Schema markup
      const movieSchema = {
        "@context": "https://schema.org",
        "name": movie.title,
        "@type": "Movie",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://yemen-flix.replit.app/movie/${movie.id}`
        },
        "headline": movie.title,
        "image": [movie.poster, movie.backdrop].filter(Boolean),
        "datePublished": `${movie.year}-01-01`,
        "author": {
          "@type": "Person",
          "name": "يمن فليكس"
        },
        "director": movie.director?.map((d: string) => ({ "@type": "Person", "name": d })),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": movie.rating,
          "bestRating": "10",
          "ratingCount": (movie.likeCount || 0) + (movie.dislikeCount || 0)
        }
      };

      const breadcrumbSchema = {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://yemen-flix.replit.app/",
              "name": "يمن فليكس"
            }
          },
          {
            "@type": "ListItem", 
            "position": 2,
            "item": {
              "@id": `https://yemen-flix.replit.app/${movie.category === 'movie' ? 'movies' : movie.category === 'series' ? 'series' : 'shows'}`,
              "name": movie.category === 'movie' ? 'أفلام' : movie.category === 'series' ? 'مسلسلات' : 'برامج'
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@id": `https://yemen-flix.replit.app/movie/${movie.id}`,
              "name": movie.title
            }
          }
        ]
      };

      // إضافة Schema إلى head
      const movieSchemaTag = document.createElement('script');
      movieSchemaTag.type = 'application/ld+json';
      movieSchemaTag.textContent = JSON.stringify([movieSchema, breadcrumbSchema]);
      document.head.appendChild(movieSchemaTag);
    }
  }, [movie, movieId]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (isLoading) {
    return (
      <div className="site-container">
        <AkwamHeader />
        <div className="main-header-top"></div>
        <div className="main-header-height"></div>
        
        <div className="container text-center py-5">
          <div className="loading-spinner">
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only">جاري التحميل...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="site-container">
        <AkwamHeader />
        <div className="main-header-top"></div>
        <div className="main-header-height"></div>
        
        <div className="container text-center py-5">
          <h3>لم يتم العثور على هذا المحتوى</h3>
          <Link href="/movies" className="btn btn-primary mt-3">العودة للأفلام</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-container">
      <AkwamHeader />
      <div className="main-header-top"></div>
      <div className="main-header-height"></div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-container">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">يمن فليكس</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/${movie.category === 'movie' ? 'movies' : movie.category === 'series' ? 'series' : 'shows'}`}>
                  {movie.category === 'movie' ? 'أفلام' : movie.category === 'series' ? 'مسلسلات' : 'برامج'}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {movie.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Movie Cover with Blur Effect */}
      <div className="movie-cover-section" style={{
        backgroundImage: `url(${movie.backdrop || movie.poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <svg className="blur-filter">
          <defs>
            <filter id="blur-effect-1">
              <feGaussianBlur stdDeviation="3"></feGaussianBlur>
            </filter>
          </defs>
        </svg>
        
        <div className="movie-cover-overlay"></div>
        
        <div className="container">
          <div className="row">
            {/* Movie Poster */}
            <div className="col-md-4">
              <div className="movie-poster">
                <img src={movie.poster} alt={movie.title} className="img-fluid rounded shadow" />
                
                {/* Action Buttons */}
                <div className="movie-actions mt-3">
                  <Link href={`/watch/${movie.id}`} className="btn btn-primary btn-block mb-2" style={{borderRadius: '25px'}}>
                    <Play size={16} className="ml-2" />
                    مشاهدة
                  </Link>
                  <button className="btn btn-success btn-block mb-2" style={{borderRadius: '25px'}}>
                    <Download size={16} className="ml-2" />
                    تحميل
                  </button>
                  <div className="d-flex justify-content-between">
                    <button 
                      className={`btn ${isFavorited ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={handleFavorite}
                      style={{borderRadius: '25px', width: '30%'}}
                    >
                      <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
                    </button>
                    <button className="btn btn-outline-info" style={{borderRadius: '25px', width: '30%'}}>
                      <Share2 size={16} />
                    </button>
                    <button className="btn btn-outline-secondary" style={{borderRadius: '25px', width: '30%'}}>
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Details */}
            <div className="col-md-8">
              <div className="movie-details">
                <h1 className="movie-title">{movie.title}</h1>
                {movie.originalTitle && movie.originalTitle !== movie.title && (
                  <h2 className="movie-original-title text-muted">{movie.originalTitle}</h2>
                )}

                {/* Movie Meta Info */}
                <div className="movie-meta-info mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="meta-item">
                        <strong>السنة:</strong> {movie.year}
                      </div>
                      <div className="meta-item">
                        <strong>المدة:</strong> {movie.duration} دقيقة
                      </div>
                      <div className="meta-item">
                        <strong>الجودة:</strong> 
                        <span className="quality-badge badge badge-warning mr-2">{movie.quality}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="meta-item">
                        <strong>التصنيف:</strong> 
                        <div className="rating-stars">
                          <Star size={16} className="text-warning" />
                          <span className="mr-1">{movie.rating}/10</span>
                        </div>
                      </div>
                      <div className="meta-item">
                        <strong>البلد:</strong> {movie.country}
                      </div>
                      <div className="meta-item">
                        <strong>اللغة:</strong> {movie.language === 'ar' ? 'العربية' : 'إنجليزية'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Genre Tags */}
                <div className="movie-genres mb-4">
                  <strong>التصنيف:</strong>
                  <div className="genre-tags">
                    {movie.genre?.map((g: string, index: number) => (
                      <span key={index} className="badge badge-secondary mr-2 mb-2">{g}</span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="movie-description mb-4">
                  <h5>القصة:</h5>
                  <p>{movie.description}</p>
                </div>

                {/* Cast & Crew */}
                <div className="movie-cast-crew mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      <h6>المخرج:</h6>
                      <p>{movie.director && movie.director.length > 0 
                          ? movie.director.map((dir: any) => 
                              typeof dir === 'string' ? dir : dir.name
                            ).join(', ')
                          : 'غير محدد'
                        }</p>
                    </div>
                    <div className="col-md-6">
                      <h6>الكاتب:</h6>
                      <p>{movie.writer && movie.writer.length > 0 
                          ? movie.writer.map((writer: any) => 
                              typeof writer === 'string' ? writer : writer.name
                            ).join(', ')
                          : 'غير محدد'
                        }</p>
                    </div>
                  </div>
                  <div className="cast-section">
                    <h6>الممثلون:</h6>
                    <div className="cast-grid row">
                      {movie.cast && movie.cast.length > 0 ? (
                        movie.cast.slice(0, 6).map((actor: any, index: number) => {
                          // Handle both old string format and new object format
                          const actorName = typeof actor === 'string' ? actor.split(' (')[0] : actor.name;
                          const characterName = typeof actor === 'object' ? actor.character : 
                                               (typeof actor === 'string' && actor.includes('(') ? 
                                                actor.match(/\(([^)]+)\)/)?.[1] : '');
                          const profilePath = typeof actor === 'object' ? actor.profile_path : null;
                          
                          return (
                            <div key={index} className="col-md-4 col-6 mb-3">
                              <div className="cast-member d-flex align-items-center">
                                <div className="cast-avatar ml-3">
                                  {profilePath ? (
                                    <img 
                                      src={profilePath} 
                                      alt={actorName}
                                      className="rounded-circle"
                                      style={{width: '50px', height: '50px', objectFit: 'cover'}}
                                    />
                                  ) : (
                                    <div className="default-avatar bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
                                         style={{width: '50px', height: '50px'}}>
                                      <User size={24} className="text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="cast-info">
                                  <div className="actor-name font-weight-bold" style={{fontSize: '14px'}}>{actorName}</div>
                                  {characterName && (
                                    <div className="character-name text-muted" style={{fontSize: '12px'}}>({characterName})</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p>لا توجد معلومات عن فريق العمل</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating System */}
                <div className="movie-rating-system">
                  <h6>تقييم المشاهدين:</h6>
                  <div className="rating-buttons d-flex">
                    <button 
                      className={`btn ${isLiked ? 'btn-success' : 'btn-outline-success'} mr-3`}
                      onClick={handleLike}
                    >
                      <ThumbsUp size={16} className="ml-1" />
                      أعجبني ({movie.likeCount || 0})
                    </button>
                    <button 
                      className={`btn ${isDisliked ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={handleDislike}
                    >
                      <ThumbsDown size={16} className="ml-1" />
                      لم يعجبني ({movie.dislikeCount || 0})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Server Links Section */}
      <div className="servers-section py-5">
        <div className="container">
          <h4 className="mb-4">خوادم المشاهدة والتحميل</h4>
          
          {/* Watch Servers */}
          <div className="servers-group mb-4">
            <h5 className="text-primary">خوادم المشاهدة:</h5>
            <div className="servers-list">
              <div className="server-item">
                <span className="server-name">سيرفر 1</span>
                <span className="server-quality badge badge-success">HD</span>
                <button className="btn btn-sm btn-primary">مشاهدة</button>
              </div>
              <div className="server-item">
                <span className="server-name">سيرفر 2</span>
                <span className="server-quality badge badge-warning">1080p</span>
                <button className="btn btn-sm btn-primary">مشاهدة</button>
              </div>
            </div>
          </div>

          {/* Download Servers */}
          <div className="servers-group">
            <h5 className="text-success">خوادم التحميل:</h5>
            <div className="servers-list">
              <div className="server-item">
                <span className="server-name">تحميل مباشر</span>
                <span className="server-size text-muted">1.2 GB</span>
                <span className="server-quality badge badge-primary">720p</span>
                <button className="btn btn-sm btn-success">تحميل</button>
              </div>
              <div className="server-item">
                <span className="server-name">تحميل سريع</span>
                <span className="server-size text-muted">2.1 GB</span>
                <span className="server-quality badge badge-warning">1080p</span>
                <button className="btn btn-sm btn-success">تحميل</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Movies */}
      {relatedMovies && relatedMovies.length > 0 && (
        <div className="related-movies-section py-5 bg-light">
          <div className="container">
            <h4 className="mb-4">أفلام مشابهة</h4>
            <div className="row">
              {relatedMovies.map((relatedMovie: Movie) => (
                <div key={relatedMovie.id} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                  <div className="movie-card">
                    <Link href={`/movie/${relatedMovie.id}`}>
                      <img 
                        src={relatedMovie.poster} 
                        alt={relatedMovie.title}
                        className="img-fluid rounded shadow-sm"
                      />
                      <div className="movie-card-info mt-2">
                        <h6 className="movie-card-title">{relatedMovie.title}</h6>
                        <div className="movie-card-meta">
                          <span className="year">{relatedMovie.year}</span>
                          <span className="rating">
                            <Star size={12} className="text-warning" />
                            {relatedMovie.rating}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}