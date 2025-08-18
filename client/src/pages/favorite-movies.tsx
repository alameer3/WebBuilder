import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AkwamHeader from '../components/AkwamHeader';
import MovieCard from '../components/MovieCard';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

interface FavoriteMovie {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  genre?: string[];
  quality?: string;
  duration?: string;
  addedToFavorites?: string;
  views?: number;
  likes?: number;
}

export default function FavoriteMovies() {
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const favoriteMoviesData: FavoriteMovie[] = [
    {
      id: "fav1",
      title: "فيلم الأزرق 3",
      poster: "https://img.downet.net/thumb/270x400/uploads/fav1.jpg",
      year: "2024",
      rating: 8.9,
      genre: ["اكشن", "مغامرات"],
      quality: "4K",
      duration: "2:15:00",
      addedToFavorites: "2025-01-15",
      views: 125000,
      likes: 8500
    },
    {
      id: "fav2",
      title: "Spider-Man: No Way Home",
      poster: "https://img.downet.net/thumb/270x400/uploads/fav2.jpg",
      year: "2021",
      rating: 9.2,
      genre: ["اكشن", "مغامرات", "خيال علمي"],
      quality: "4K",
      duration: "2:28:00",
      addedToFavorites: "2025-01-10",
      views: 350000,
      likes: 25000
    },
    {
      id: "fav3",
      title: "باد بويز فور لايف",
      poster: "https://img.downet.net/thumb/270x400/uploads/fav3.jpg",
      year: "2020",
      rating: 8.5,
      genre: ["اكشن", "كوميدي"],
      quality: "HD",
      duration: "2:04:00",
      addedToFavorites: "2025-01-08",
      views: 200000,
      likes: 15000
    },
    {
      id: "fav4",
      title: "الجوكر",
      poster: "https://img.downet.net/thumb/270x400/uploads/fav4.jpg",
      year: "2019",
      rating: 9.0,
      genre: ["دراما", "إثارة"],
      quality: "4K",
      duration: "2:02:00",
      addedToFavorites: "2025-01-05",
      views: 400000,
      likes: 30000
    },
    {
      id: "fav5",
      title: "أفينجرز: إندجيم",
      poster: "https://img.downet.net/thumb/270x400/uploads/fav5.jpg",
      year: "2019",
      rating: 9.5,
      genre: ["اكشن", "مغامرات", "خيال علمي"],
      quality: "4K",
      duration: "3:01:00",
      addedToFavorites: "2025-01-01",
      views: 500000,
      likes: 40000
    }
  ];

  const { data: favoriteMovies = favoriteMoviesData, isLoading } = useQuery({
    queryKey: ['/api/favorite-movies'],
    queryFn: () => fetch('/api/favorite-movies').then(res => res.json()).catch(() => favoriteMoviesData)
  });

  useEffect(() => {
    document.body.className = 'header-fixed body-main';
    document.title = 'الأفلام المفضلة - يمن فليكس';
    
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
            "@id": "https://yemen-flix.replit.app/favorite-movies",
            "name": "الأفلام المفضلة"
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptTag);

    return () => {
      document.body.className = '';
    };
  }, []);

  const sortedMovies = Array.isArray(favoriteMovies) ? [...favoriteMovies].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.addedToFavorites || '').getTime() - new Date(a.addedToFavorites || '').getTime();
      case 'oldest':
        return new Date(a.addedToFavorites || '').getTime() - new Date(b.addedToFavorites || '').getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return parseInt(b.year) - parseInt(a.year);
      case 'views':
        return (b.views || 0) - (a.views || 0);
      case 'likes':
        return (b.likes || 0) - (a.likes || 0);
      default:
        return 0;
    }
  }) : [];

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-favorite-movies">
          <div className="favorite-movies-header">
            <div className="container">
              <div className="row align-items-center mb-4">
                <div className="col-md-6">
                  <div className="page-title-section">
                    <h1 className="page-title d-flex align-items-center">
                      <i className="icon-heart mr-3 text-danger"></i>
                      الأفلام المفضلة
                    </h1>
                    <p className="page-subtitle text-muted">
                      مجموعتك الشخصية من الأفلام المفضلة ({favoriteMovies.length} فيلم)
                    </p>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="page-controls d-flex justify-content-end align-items-center">
                    <div className="sort-controls mr-3">
                      <label className="text-light mr-2">ترتيب حسب:</label>
                      <select 
                        className="form-control form-control-sm d-inline-block"
                        style={{ width: 'auto' }}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        data-testid="sort-select"
                      >
                        <option value="newest">الأحدث إضافة</option>
                        <option value="oldest">الأقدم إضافة</option>
                        <option value="rating">التقييم</option>
                        <option value="year">سنة الإنتاج</option>
                        <option value="views">الأكثر مشاهدة</option>
                        <option value="likes">الأكثر إعجاباً</option>
                      </select>
                    </div>
                    
                    <div className="view-controls">
                      <button 
                        className={`btn btn-sm ${viewMode === 'grid' ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => setViewMode('grid')}
                        data-testid="grid-view"
                      >
                        <i className="icon-grid"></i>
                      </button>
                      <button 
                        className={`btn btn-sm ${viewMode === 'list' ? 'btn-warning' : 'btn-outline-warning'} mr-2`}
                        onClick={() => setViewMode('list')}
                        data-testid="list-view"
                      >
                        <i className="icon-list"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : sortedMovies.length > 0 ? (
              <div className={`favorite-movies-content ${viewMode}`}>
                {viewMode === 'grid' ? (
                  <div className="widget widget-style-1 mb-4" data-grid="6">
                    <div className="widget-body">
                      <div className="row" data-testid="favorite-movies-grid">
                        {sortedMovies.map((movie) => (
                          <div key={movie.id} className="col-6 col-lg-2 col-md-3 col-xl-2 mb-4">
                            <div className="entry-box entry-box-1 favorite-movie">
                              <div className="favorite-badge">
                                <i className="icon-heart text-danger"></i>
                              </div>
                              
                              <div className="labels d-flex">
                                <span className="label rating">
                                  <i className="icon-star mr-2"></i>{movie.rating}
                                </span>
                                {movie.quality && (
                                  <span className="label quality ml-2">{movie.quality}</span>
                                )}
                                <span className="ml-auto"></span>
                              </div>
                              
                              <a href={`/movie/${movie.id}`} data-testid={`favorite-movie-${movie.id}`}>
                                <div className="entry-image">
                                  <div 
                                    className="image"
                                    style={{
                                      backgroundImage: `url("${movie.poster}")`,
                                      height: '300px',
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center'
                                    }}
                                  ></div>
                                  <div className="entry-overlay">
                                    <div className="overlay-content">
                                      <div className="entry-title">{movie.title}</div>
                                      <div className="entry-year">{movie.year}</div>
                                      {movie.duration && (
                                        <div className="entry-duration">{movie.duration}</div>
                                      )}
                                      {movie.genre && movie.genre.length > 0 && (
                                        <div className="entry-genre">{movie.genre.join(', ')}</div>
                                      )}
                                      {movie.addedToFavorites && (
                                        <div className="entry-date">
                                          أضيف في {new Date(movie.addedToFavorites).toLocaleDateString('ar-EG')}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="favorite-movies-list" data-testid="favorite-movies-list">
                    {sortedMovies.map((movie) => (
                      <div key={movie.id} className="list-item favorite-movie-item bg-dark p-3 rounded mb-3">
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <img 
                              src={movie.poster} 
                              alt={movie.title}
                              className="img-fluid rounded"
                              style={{ height: '120px', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-md-6">
                            <h5 className="movie-title text-light mb-2">
                              <a href={`/movie/${movie.id}`} className="text-light">
                                {movie.title}
                              </a>
                            </h5>
                            <div className="movie-info text-muted">
                              <span className="year mr-3">{movie.year}</span>
                              <span className="rating mr-3">
                                <i className="icon-star text-warning mr-1"></i>{movie.rating}
                              </span>
                              {movie.duration && (
                                <span className="duration mr-3">{movie.duration}</span>
                              )}
                              {movie.quality && (
                                <span className="quality">{movie.quality}</span>
                              )}
                            </div>
                            {movie.genre && movie.genre.length > 0 && (
                              <div className="movie-genre mt-2">
                                {movie.genre.map((g, index) => (
                                  <span key={index} className="badge badge-secondary mr-1">{g}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="col-md-4 text-right">
                            <div className="movie-stats text-muted mb-2">
                              {movie.views && (
                                <div className="stat">
                                  <i className="icon-eye mr-1"></i>
                                  {movie.views.toLocaleString()} مشاهدة
                                </div>
                              )}
                              {movie.likes && (
                                <div className="stat">
                                  <i className="icon-thumbs-up mr-1"></i>
                                  {movie.likes.toLocaleString()} إعجاب
                                </div>
                              )}
                              {movie.addedToFavorites && (
                                <div className="stat">
                                  <i className="icon-heart mr-1 text-danger"></i>
                                  {new Date(movie.addedToFavorites).toLocaleDateString('ar-EG')}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-favorites text-center py-5">
                <i className="icon-heart-outline font-size-48 text-muted mb-3"></i>
                <h3>لا توجد أفلام مفضلة</h3>
                <p className="text-muted mb-4">لم تقم بإضافة أي أفلام إلى قائمة المفضلة بعد</p>
                <a href="/movies" className="btn btn-warning">
                  <i className="icon-video-camera mr-2"></i>
                  تصفح الأفلام
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}