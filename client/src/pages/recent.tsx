import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AkwamHeader from '../components/AkwamHeader';
import MovieCard from '../components/MovieCard';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

interface RecentItem {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  type: 'movie' | 'series' | 'show' | 'mix';
  addedDate: string;
  genre?: string[];
  quality?: string;
  episodes?: number;
  seasons?: number;
}

export default function Recent() {
  const [filter, setFilter] = useState('all');

  const recentData: RecentItem[] = [
    {
      id: "latest1",
      title: "فيلم الأزرق 5",
      poster: "https://img.downet.net/thumb/270x400/uploads/latest1.jpg",
      year: "2025",
      rating: 8.8,
      type: "movie",
      addedDate: "2025-01-18",
      genre: ["اكشن", "مغامرات"],
      quality: "4K"
    },
    {
      id: "latest2",
      title: "مسلسل حب للإيجار الموسم 2",
      poster: "https://img.downet.net/thumb/270x400/uploads/latest2.jpg",
      year: "2025",
      rating: 8.5,
      type: "series",
      addedDate: "2025-01-17",
      genre: ["رومانسي", "دراما"],
      quality: "HD",
      episodes: 25,
      seasons: 2
    },
    {
      id: "latest3",
      title: "برنامج رامز في الشلال",
      poster: "https://img.downet.net/thumb/270x400/uploads/latest3.jpg",
      year: "2025",
      rating: 7.8,
      type: "show",
      addedDate: "2025-01-16",
      genre: ["كوميدي", "مقالب"],
      quality: "HD",
      episodes: 30
    },
    {
      id: "latest4",
      title: "مقطع كوميدي - أحمد حلمي",
      poster: "https://img.downet.net/thumb/270x400/uploads/latest4.jpg",
      year: "2025",
      rating: 7.2,
      type: "mix",
      addedDate: "2025-01-15",
      genre: ["كوميدي"],
      quality: "HD"
    },
    {
      id: "latest5",
      title: "فيلم Spider-Man: No Way Home",
      poster: "https://img.downet.net/thumb/270x400/uploads/latest5.jpg",
      year: "2021",
      rating: 9.0,
      type: "movie",
      addedDate: "2025-01-14",
      genre: ["اكشن", "مغامرات", "خيال علمي"],
      quality: "4K"
    },
    {
      id: "latest6",
      title: "مسلسل ليه لأ الموسم 3",
      poster: "https://img.downet.net/thumb/270x400/uploads/latest6.jpg",
      year: "2024",
      rating: 8.0,
      type: "series",
      addedDate: "2025-01-13",
      genre: ["كوميدي", "عائلي"],
      quality: "HD",
      episodes: 30,
      seasons: 3
    }
  ];

  const { data: recentItems = recentData, isLoading } = useQuery({
    queryKey: ['/api/recent'],
    queryFn: () => fetch('/api/recent').then(res => res.json()).catch(() => recentData)
  });

  useEffect(() => {
    document.body.className = 'header-fixed body-main';
    
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
            "@id": "https://yemen-flix.replit.app/recent",
            "name": "أضيف حديثاً"
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

  const filteredItems = Array.isArray(recentItems) ? recentItems.filter((item: RecentItem) => {
    if (filter === 'all') return true;
    return item.type === filter;
  }) : [];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'movie': return 'فيلم';
      case 'series': return 'مسلسل';
      case 'show': return 'برنامج';
      case 'mix': return 'منوعات';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return 'icon-video-camera';
      case 'series': return 'icon-monitor';
      case 'show': return 'icon-tv';
      case 'mix': return 'icon-mix';
      default: return 'icon-file';
    }
  };

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-archive">
          <div className="archive-cover mb-4" style={{ backgroundImage: `url('https://img.downet.net/uploads/recent-bg.webp')` }}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-plus2 ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">أضيف حديثاً</h1>
                      </div>
                    </div>
                    
                    <div className="col-md">
                      <div className="filter-tabs d-flex flex-wrap justify-content-center">
                        <button 
                          className={`filter-tab btn ${filter === 'all' ? 'active' : ''}`}
                          onClick={() => setFilter('all')}
                        >
                          الكل
                        </button>
                        <button 
                          className={`filter-tab btn ${filter === 'movie' ? 'active' : ''}`}
                          onClick={() => setFilter('movie')}
                        >
                          أفلام
                        </button>
                        <button 
                          className={`filter-tab btn ${filter === 'series' ? 'active' : ''}`}
                          onClick={() => setFilter('series')}
                        >
                          مسلسلات
                        </button>
                        <button 
                          className={`filter-tab btn ${filter === 'show' ? 'active' : ''}`}
                          onClick={() => setFilter('show')}
                        >
                          برامج
                        </button>
                        <button 
                          className={`filter-tab btn ${filter === 'mix' ? 'active' : ''}`}
                          onClick={() => setFilter('mix')}
                        >
                          منوعات
                        </button>
                      </div>
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
            ) : (
              <div className="widget widget-style-1 mb-4" data-grid="6">
                <div className="widget-body">
                  <div className="row">
                    {filteredItems.map((item) => (
                      <div key={item.id} className="col-6 col-lg-2 col-md-3 col-xl-2 mb-12">
                        <div className="entry-box entry-box-1">
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
                          
                          <a href={`/${item.type}/${item.id}`}>
                            <div className="entry-image">
                              <div 
                                className="image"
                                style={{
                                  backgroundImage: `url("${item.poster}")`,
                                  height: '300px',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              ></div>
                              <div className="entry-overlay">
                                <div className="overlay-content">
                                  <div className="entry-title">{item.title}</div>
                                  <div className="entry-year">{item.year}</div>
                                  <div className="entry-type">{getTypeLabel(item.type)}</div>
                                  {item.type === 'series' && item.episodes && (
                                    <div className="entry-episodes">
                                      {item.seasons} موسم • {item.episodes} حلقة
                                    </div>
                                  )}
                                  {item.type === 'show' && item.episodes && (
                                    <div className="entry-episodes">{item.episodes} حلقة</div>
                                  )}
                                  <div className="entry-date">
                                    أضيف في {new Date(item.addedDate).toLocaleDateString('ar-EG')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                    
                    {filteredItems.length === 0 && (
                      <div className="col-12 text-center py-5">
                        <p className="text-white">لا توجد عناصر حديثة في هذا التصنيف</p>
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