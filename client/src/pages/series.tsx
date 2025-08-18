import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AkwamHeader from '../components/AkwamHeader';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

interface Series {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  seasons: number;
  episodes: number;
  genre?: string[];
  quality?: string;
  status: 'ongoing' | 'completed';
}

export default function Series() {
  const [filters, setFilters] = useState({
    section: '0',
    category: '0',
    rating: '0',
    year: '0'
  });

  const seriesData: Series[] = [
    {
      id: "4948",
      title: "بنات الأم",
      poster: "https://img.downet.net/thumb/270x400/uploads/series1.jpg",
      year: "2024",
      rating: 8.7,
      seasons: 1,
      episodes: 30,
      genre: ["دراما", "عائلي"],
      quality: "HD",
      status: "completed"
    },
    {
      id: "4949", 
      title: "إسعاد بنات",
      poster: "https://img.downet.net/thumb/270x400/uploads/series2.jpg",
      year: "2024",
      rating: 8.2,
      seasons: 1,
      episodes: 30,
      genre: ["كوميدي", "عائلي"],
      quality: "HD",
      status: "completed"
    }
  ];

  const { data: series = seriesData, isLoading } = useQuery({
    queryKey: ['/api/series'],
    queryFn: () => fetch('/api/series').then(res => res.json()).catch(() => seriesData)
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
            "@id": "https://yemen-flix.replit.app/series",
            "name": "مسلسلات"
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

  const filteredSeries = Array.isArray(series) ? series.filter((item: Series) => {
    if (filters.year !== '0' && item.year !== filters.year) return false;
    if (filters.rating !== '0' && item.rating < parseInt(filters.rating)) return false;
    return true;
  }) : [];

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-archive">
          <div className="archive-cover mb-4" style={{ backgroundImage: `url('https://img.downet.net/uploads/series-bg.webp')` }}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-monitor ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">مسلسلات</h1>
                      </div>
                    </div>
                    
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
                              >
                                <option value="0">القسم</option>
                                <option value="29">عربي</option>
                                <option value="30">اجنبي</option>
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
                              >
                                <option value="0">التصنيف</option>
                                <option value="23">دراما</option>
                                <option value="20">كوميدي</option>
                                <option value="27">رومانسي</option>
                                <option value="33">عائلي</option>
                                <option value="22">رعب</option>
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
                              >
                                <option value="0">سنة الإنتاج</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
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
                    {filteredSeries.map((item) => (
                      <div key={item.id} className="col-6 col-lg-2 col-md-3 col-xl-2 mb-12">
                        <div className="entry-box entry-box-1">
                          <div className="labels d-flex">
                            <span className="label rating">
                              <i className="icon-star mr-2"></i>{item.rating}
                            </span>
                            {item.quality && (
                              <span className="label quality ml-2">{item.quality}</span>
                            )}
                            <span className="ml-auto"></span>
                          </div>
                          
                          <a href={`/series/${item.id}`}>
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
                                  <div className="entry-episodes">
                                    {item.seasons} موسم • {item.episodes} حلقة
                                  </div>
                                  <div className="entry-status">
                                    {item.status === 'ongoing' ? 'مستمر' : 'مكتمل'}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                    
                    {filteredSeries.length === 0 && (
                      <div className="col-12 text-center py-5">
                        <p className="text-white">لا توجد مسلسلات تطابق المعايير المحددة</p>
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