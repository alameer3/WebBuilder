// Movies Page - مطابق للأصل تماماً
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/akwam.css';

// استيراد المكونات
import AkwamHeader from '../components/AkwamHeader';
import MovieCard from '../components/MovieCard';

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
  year: string;
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

  // بيانات تجريبية للأفلام (سيتم استبدالها ببيانات حقيقية)
  const moviesData: Movie[] = [
    {
      id: "227",
      title: "فيلم الأزرق 3",
      poster: "https://img.downet.net/thumb/270x400/uploads/4f2gT.jpg",
      year: "2024",
      rating: 8.2,
      genre: ["اكشن", "مغامرات"],
      quality: "HD",
      description: "فيلم اكشن مثير..."
    },
    {
      id: "228", 
      title: "فيلم الأزرق 4",
      poster: "https://img.downet.net/thumb/270x400/uploads/TiYPC.jpg",
      year: "2024",
      rating: 7.8,
      genre: ["اكشن", "مغامرات"], 
      quality: "HD",
      description: "تكملة مشوقة..."
    },
    {
      id: "241",
      title: "Rambo: First Blood Part II",
      poster: "https://img.downet.net/thumb/270x400/uploads/iQofs.jpg",
      year: "1985",
      rating: 8.5,
      genre: ["اكشن", "حرب"],
      quality: "HD",
      description: "فيلم حرب كلاسيكي..."
    },
    {
      id: "243",
      title: "Rambo",
      poster: "https://img.downet.net/thumb/270x400/uploads/R8cXw.jpg", 
      year: "2008",
      rating: 7.0,
      genre: ["اكشن", "حرب"],
      quality: "HD",
      description: "عودة رامبو بقوة..."
    },
    {
      id: "245",
      title: "Maleficent",
      poster: "https://img.downet.net/thumb/270x400/uploads/v1234.jpg",
      year: "2014", 
      rating: 6.9,
      genre: ["فانتازيا", "عائلي"],
      quality: "HD",
      description: "قصة الساحرة الشريرة..."
    },
    {
      id: "247",
      title: "يا أنا يا خالتي",
      poster: "https://img.downet.net/thumb/270x400/uploads/q5678.jpg",
      year: "2005",
      rating: 7.5,
      genre: ["كوميدي", "مصري"],
      quality: "HD", 
      description: "كوميديا مصرية رائعة..."
    }
  ];

  const { data: movies = moviesData, isLoading } = useQuery({
    queryKey: ['/api/movies'],
    queryFn: () => fetch('/api/movies').then(res => res.json()).catch(() => moviesData)
  });

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
      document.body.className = '';
    };
  }, []);

  const filteredMovies = Array.isArray(movies) ? movies.filter((movie: Movie) => {
    if (filters.year !== '0' && movie.year !== filters.year) return false;
    if (filters.rating !== '0' && movie.rating < parseInt(filters.rating)) return false;
    return true;
  }) : [];

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
                                <option value="8">+8</option>
                                <option value="7">+7</option>
                                <option value="6">+6</option>
                                <option value="5">+5</option>
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
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="widget widget-style-1 mb-4" data-grid="6">
                <div className="widget-body">
                  <div className="row" data-testid="movies-grid">
                    {filteredMovies.map((movie) => (
                      <MovieCard key={movie.id} {...movie} />
                    ))}
                    
                    {filteredMovies.length === 0 && (
                      <div className="col-12 text-center py-5">
                        <p className="text-white">لا توجد أفلام تطابق المعايير المحددة</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}