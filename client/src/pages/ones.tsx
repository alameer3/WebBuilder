import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AkwamHeader from '../components/AkwamHeader';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

interface OnesItem {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  type: 'movie' | 'series' | 'documentary';
  genre?: string[];
  quality?: string;
  duration?: string;
  description?: string;
  featured?: boolean;
}

export default function Ones() {
  const [filter, setFilter] = useState('all');

  const onesData: OnesItem[] = [
    {
      id: "ones1",
      title: "فيلم المليون",
      poster: "https://img.downet.net/thumb/270x400/uploads/ones1.jpg",
      year: "2024",
      rating: 9.2,
      type: "movie",
      genre: ["دراما", "رومانسي"],
      quality: "4K",
      duration: "2:15:00",
      description: "قصة استثنائية عن الحب والتضحية",
      featured: true
    },
    {
      id: "ones2",
      title: "مسلسل الواحد",
      poster: "https://img.downet.net/thumb/270x400/uploads/ones2.jpg",
      year: "2024",
      rating: 9.5,
      type: "series",
      genre: ["دراما", "تشويق"],
      quality: "HD",
      description: "مسلسل درامي مليء بالإثارة والتشويق",
      featured: true
    },
    {
      id: "ones3",
      title: "وثائقي: رحلة الألف ميل",
      poster: "https://img.downet.net/thumb/270x400/uploads/ones3.jpg",
      year: "2023",
      rating: 8.8,
      type: "documentary",
      genre: ["وثائقي", "مغامرات"],
      quality: "4K",
      duration: "1:30:00",
      description: "رحلة استكشافية مذهلة عبر التاريخ والثقافة",
      featured: false
    },
    {
      id: "ones4",
      title: "فيلم الواحد الأوحد",
      poster: "https://img.downet.net/thumb/270x400/uploads/ones4.jpg",
      year: "2024",
      rating: 9.0,
      type: "movie",
      genre: ["أكشن", "دراما"],
      quality: "4K",
      duration: "2:30:00",
      description: "ملحمة سينمائية لا تُنسى",
      featured: true
    }
  ];

  const { data: onesItems = onesData, isLoading } = useQuery({
    queryKey: ['/api/ones'],
    queryFn: () => fetch('/api/ones').then(res => res.json()).catch(() => onesData)
  });

  useEffect(() => {
    document.body.className = 'header-fixed body-main';
    document.title = 'الواحد - يمن فليكس';
    
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
            "@id": "https://yemen-flix.replit.app/ones",
            "name": "الواحد"
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

  const filteredItems = Array.isArray(onesItems) ? onesItems.filter((item: OnesItem) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return item.featured;
    return item.type === filter;
  }) : [];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'movie': return 'فيلم';
      case 'series': return 'مسلسل';
      case 'documentary': return 'وثائقي';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return 'icon-video-camera';
      case 'series': return 'icon-monitor';
      case 'documentary': return 'icon-book';
      default: return 'icon-file';
    }
  };

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-ones">
          <div className="ones-header-section">
            <div className="ones-hero bg-gradient" style={{ 
              background: 'linear-gradient(135deg, #f3951e 0%, #161619 100%)',
              padding: '60px 0'
            }}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="ones-hero-content">
                      <h1 className="ones-title display-4 font-weight-bold text-white mb-3">
                        <i className="icon-star mr-3"></i>
                        الواحد
                      </h1>
                      <p className="ones-subtitle h5 text-light mb-4">
                        مجموعة مختارة من أفضل الأعمال الفنية والسينمائية العربية والعالمية
                      </p>
                      <div className="ones-stats d-flex flex-wrap">
                        <div className="stat-item mr-4 mb-2">
                          <span className="stat-number text-warning h4">{onesItems.length}</span>
                          <span className="stat-label text-light mr-2">عمل مميز</span>
                        </div>
                        <div className="stat-item mr-4 mb-2">
                          <span className="stat-number text-warning h4">
                            {onesItems.filter((item: OnesItem) => item.featured).length}
                          </span>
                          <span className="stat-label text-light mr-2">عمل مُفضل</span>
                        </div>
                        <div className="stat-item mb-2">
                          <span className="stat-number text-warning h4">9.2</span>
                          <span className="stat-label text-light mr-2">متوسط التقييم</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="ones-icon">
                      <i className="icon-award" style={{ fontSize: '120px', color: 'rgba(255,255,255,0.2)' }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mt-4">
            <div className="ones-filters mb-4">
              <div className="filter-tabs d-flex flex-wrap justify-content-center">
                <button 
                  className={`filter-tab btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                  data-testid="filter-all"
                >
                  <i className="icon-grid mr-2"></i>الكل
                </button>
                <button 
                  className={`filter-tab btn ${filter === 'featured' ? 'active' : ''}`}
                  onClick={() => setFilter('featured')}
                  data-testid="filter-featured"
                >
                  <i className="icon-star mr-2"></i>المميز
                </button>
                <button 
                  className={`filter-tab btn ${filter === 'movie' ? 'active' : ''}`}
                  onClick={() => setFilter('movie')}
                  data-testid="filter-movies"
                >
                  <i className="icon-video-camera mr-2"></i>أفلام
                </button>
                <button 
                  className={`filter-tab btn ${filter === 'series' ? 'active' : ''}`}
                  onClick={() => setFilter('series')}
                  data-testid="filter-series"
                >
                  <i className="icon-monitor mr-2"></i>مسلسلات
                </button>
                <button 
                  className={`filter-tab btn ${filter === 'documentary' ? 'active' : ''}`}
                  onClick={() => setFilter('documentary')}
                  data-testid="filter-documentaries"
                >
                  <i className="icon-book mr-2"></i>وثائقيات
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="ones-content">
                <div className="widget widget-style-1 mb-4" data-grid="6">
                  <div className="widget-body">
                    <div className="row" data-testid="ones-results">
                      {filteredItems.map((item) => (
                        <div key={item.id} className="col-6 col-lg-3 col-md-4 col-xl-3 mb-4">
                          <div className={`entry-box entry-box-1 ones-entry ${item.featured ? 'featured' : ''}`}>
                            {item.featured && (
                              <div className="featured-badge">
                                <i className="icon-star"></i>
                                <span>مميز</span>
                              </div>
                            )}
                            
                            <div className="labels d-flex">
                              <span className="label rating">
                                <i className="icon-star mr-2"></i>{item.rating}
                              </span>
                              <span className="label type ml-2">
                                <i className={`${getTypeIcon(item.type)} mr-1`}></i>
                                {getTypeLabel(item.type)}
                              </span>
                              {item.quality && (
                                <span className="label quality ml-2">{item.quality}</span>
                              )}
                              <span className="ml-auto"></span>
                            </div>
                            
                            <a href={`/${item.type}/${item.id}`} data-testid={`ones-link-${item.id}`}>
                              <div className="entry-image">
                                <div 
                                  className="image"
                                  style={{
                                    backgroundImage: `url("${item.poster}")`,
                                    height: '400px',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                  }}
                                ></div>
                                <div className="entry-overlay">
                                  <div className="overlay-content">
                                    <div className="entry-title" data-testid={`ones-title-${item.id}`}>
                                      {item.title}
                                    </div>
                                    <div className="entry-year">{item.year}</div>
                                    <div className="entry-type">{getTypeLabel(item.type)}</div>
                                    {item.duration && (
                                      <div className="entry-duration">{item.duration}</div>
                                    )}
                                    {item.genre && item.genre.length > 0 && (
                                      <div className="entry-genre">{item.genre.join(', ')}</div>
                                    )}
                                    {item.description && (
                                      <div className="entry-description">{item.description}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      ))}
                      
                      {filteredItems.length === 0 && (
                        <div className="col-12 text-center py-5">
                          <i className="icon-search-outline font-size-48 text-muted mb-3"></i>
                          <h3>لا توجد أعمال</h3>
                          <p className="text-muted">لا توجد أعمال مطابقة للتصنيف المحدد</p>
                        </div>
                      )}
                    </div>
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