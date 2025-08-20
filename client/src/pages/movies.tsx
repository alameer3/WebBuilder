// Movies Page - مطابق للأصل تماماً
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/akwam.css';

// استيراد المكونات
import AkwamHeader from '../components/AkwamHeader';

// إعلان jQuery على النافذة
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string | number;
  rating: number;
  genre?: string[];
  quality?: string;
  description?: string;
}

export default function Movies() {
  const [filters, setFilters] = useState({
    section: '0',
    category: '0', 
    rating: '0',
    year: '0'
  });

  // جلب الأفلام من API
  const { data: moviesResponse, isLoading, error } = useQuery({
    queryKey: ['/api/movies'],
    select: (data: any) => data?.movies || []
  });

  const movies = moviesResponse || [];

  useEffect(() => {
    // تطبيق كلاسات body الأصلية للصفحة
    document.body.className = 'header-fixed body-main';
    
    // إضافة BreadcrumbList JSON-LD Schema
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
            "@id": "https://yemen-flix.replit.app/movies",
            "name": "أفلام"
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptTag);

    return () => {
      // تنظيف العناصر عند الخروج من الصفحة
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  // فلترة الأفلام حسب الفلاتر المحددة
  const filteredMovies = Array.isArray(movies) ? movies.filter((movie: Movie) => {
    if (filters.year !== '0' && movie.year?.toString() !== filters.year) return false;
    if (filters.rating !== '0' && movie.rating < parseInt(filters.rating)) return false;
    return true;
  }) : [];

  if (isLoading) {
    return (
      <div className="site-container">
        <AkwamHeader />
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">جاري التحميل...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Site Container */}
      <div className="site-container">
        <div className="main-header-top"></div>
        
        {/* Header Component */}
        <AkwamHeader />
        
        <div className="main-header-height"></div>

        {/* Page Content */}
        <div className="page page-archive">
          {/* Archive Cover with Filters */}
          <div className="archive-cover mb-4" style={{ backgroundImage: `url('https://img.downet.net/uploads/xVeQg.webp')` }}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-video-camera ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">أفلام</h1>
                      </div>
                    </div>
                    
                    {/* Filters Section */}
                    <div className="col-md">
                      <form id="filter" method="get">
                        <div className="row">
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12">
                              <select 
                                className="form-control" 
                                name="section" 
                                value={filters.section}
                                onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
                                data-testid="section-filter"
                              >
                                <option value="0">القسم</option>
                                <option value="29">عربي</option>
                                <option value="30">اجنبي</option>
                                <option value="31">هندي</option>
                                <option value="32">تركي</option>
                                <option value="33">اسيوي</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12 mb-lg-0">
                              <select 
                                className="form-control" 
                                name="category" 
                                value={filters.category}
                                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                data-testid="category-filter"
                              >
                                <option value="0">التصنيف</option>
                                <option value="18">اكشن</option>
                                <option value="20">كوميدي</option>
                                <option value="23">دراما</option>
                                <option value="22">رعب</option>
                                <option value="27">رومانسي</option>
                                <option value="24">خيال علمي</option>
                                <option value="19">مغامرة</option>
                                <option value="21">جريمة</option>
                                <option value="35">اثارة</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12 mb-lg-0">
                              <select 
                                className="form-control" 
                                name="year" 
                                value={filters.year}
                                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                                data-testid="year-filter"
                              >
                                <option value="0">سنة الإنتاج</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-0">
                              <select 
                                className="form-control" 
                                name="rating" 
                                value={filters.rating}
                                onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                                data-testid="rating-filter"
                              >
                                <option value="0">التقييم</option>
                                <option value="9">9+</option>
                                <option value="8">8+</option>
                                <option value="7">7+</option>
                                <option value="6">6+</option>
                                <option value="5">5+</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="container">
            {isLoading && (
              <div className="text-center py-5">
                <div className="spinner-border text-orange" role="status">
                  <span className="sr-only">جاري التحميل...</span>
                </div>
                <p className="mt-3 text-muted">جاري تحميل الأفلام...</p>
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger text-center">
                خطأ في تحميل الأفلام. يرجى المحاولة مرة أخرى.
              </div>
            )}
            
            <div className="row">
              {!isLoading && !error && filteredMovies.length > 0 ? (
                filteredMovies.map((movie: Movie) => (
                  <div key={movie.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <div className="post-item">
                      <div className="post-poster">
                        <Link href={`/movie/${movie.id}`}>
                          <a className="d-block">
                            <img
                              src={movie.poster}
                              className="img-fluid"
                              alt={movie.title}
                              data-testid={`movie-poster-${movie.id}`}
                            />
                            <div className="post-overlay">
                              <div className="post-quality">{movie.quality || 'HD'}</div>
                              <div className="post-rating">
                                <i className="icon-star"></i>
                                {movie.rating}
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div className="post-content">
                        <h3 className="post-title">
                          <Link href={`/movie/${movie.id}`}>
                            <a className="text-white" data-testid={`movie-title-${movie.id}`}>
                              {movie.title}
                            </a>
                          </Link>
                        </h3>
                        <div className="post-meta text-muted">
                          <span>{movie.year}</span>
                          {movie.genre && movie.genre.length > 0 && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{movie.genre[0]}</span>
                            </>
                          )}
                        </div>
                        {movie.genre && movie.genre.length > 0 && (
                          <div className="post-genres">
                            {movie.genre.slice(0, 3).map((g, index) => (
                              <span key={index} className="genre-tag">{g}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : !isLoading && !error && (
                <div className="col-12 text-center py-5">
                  <div className="empty-state">
                    <i className="icon-video-camera display-1 text-muted mb-3"></i>
                    <h3 className="text-muted">لا توجد أفلام متاحة حالياً</h3>
                    <p className="text-muted">يرجى تعديل الفلاتر أو المحاولة لاحقاً</p>
                  </div>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {filteredMovies.length > 0 && (
              <div className="text-center mt-5">
                <button className="btn btn-orange btn-pill px-5" data-testid="load-more-btn">
                  <i className="icon-plus mr-2"></i>
                  تحميل المزيد
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}