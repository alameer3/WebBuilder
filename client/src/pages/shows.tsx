import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AkwamHeader from '../components/AkwamHeader';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

interface Show {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  episodes: number;
  channel: string;
  genre?: string[];
  quality?: string;
  type: 'talk-show' | 'reality' | 'documentary' | 'sport';
}

export default function Shows() {
  const [filters, setFilters] = useState({
    section: '0',
    category: '0',
    rating: '0', 
    year: '0'
  });

  const showsData: Show[] = [
    {
      id: "113",
      title: "اشرطة الاحساء",
      poster: "https://img.downet.net/thumb/270x400/uploads/show1.jpg",
      year: "2024",
      rating: 7.8,
      episodes: 20,
      channel: "MBC",
      genre: ["توك شو"],
      quality: "HD",
      type: "talk-show"
    },
    {
      id: "127",
      title: "AEW Dynamite",
      poster: "https://img.downet.net/thumb/270x400/uploads/aew.jpg", 
      year: "2020",
      rating: 8.5,
      episodes: 150,
      channel: "TNT",
      genre: ["مصارعة", "رياضة"],
      quality: "HD",
      type: "sport"
    },
    {
      id: "142",
      title: "مسرح الغرب",
      poster: "https://img.downet.net/thumb/270x400/uploads/theater.jpg",
      year: "2023",
      rating: 7.2,
      episodes: 12,
      channel: "العربية",
      genre: ["مسرحية"],
      quality: "HD",
      type: "reality"
    }
  ];

  const { data: shows = showsData, isLoading } = useQuery({
    queryKey: ['/api/shows'],
    queryFn: () => fetch('/api/shows').then(res => res.json()).catch(() => showsData)
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
            "@id": "https://yemen-flix.replit.app/shows",
            "name": "تلفزيون"
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

  const filteredShows = Array.isArray(shows) ? shows.filter((show: Show) => {
    if (filters.year !== '0' && show.year !== filters.year) return false;
    if (filters.rating !== '0' && show.rating < parseInt(filters.rating)) return false;
    return true;
  }) : [];

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-archive">
          <div className="archive-cover mb-4" style={{ backgroundImage: `url('https://img.downet.net/uploads/tv-bg.webp')` }}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-tv ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">تلفزيون</h1>
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
                                <option value="0">النوع</option>
                                <option value="talk-show">توك شو</option>
                                <option value="reality">واقعي</option>
                                <option value="documentary">وثائقي</option>
                                <option value="sport">رياضي</option>
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
                                <option value="0">القناة</option>
                                <option value="mbc">MBC</option>
                                <option value="alarabiya">العربية</option>
                                <option value="aljazeera">الجزيرة</option>
                                <option value="tnt">TNT</option>
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
                                <option value="0">السنة</option>
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
                    {filteredShows.map((show) => (
                      <div key={show.id} className="col-6 col-lg-2 col-md-3 col-xl-2 mb-12">
                        <div className="entry-box entry-box-1">
                          <div className="labels d-flex">
                            <span className="label rating">
                              <i className="icon-star mr-2"></i>{show.rating}
                            </span>
                            {show.quality && (
                              <span className="label quality ml-2">{show.quality}</span>
                            )}
                            <span className="ml-auto"></span>
                          </div>
                          
                          <a href={`/show/${show.id}`}>
                            <div className="entry-image">
                              <div 
                                className="image"
                                style={{
                                  backgroundImage: `url("${show.poster}")`,
                                  height: '300px',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center'
                                }}
                              ></div>
                              <div className="entry-overlay">
                                <div className="overlay-content">
                                  <div className="entry-title">{show.title}</div>
                                  <div className="entry-year">{show.year}</div>
                                  <div className="entry-channel">{show.channel}</div>
                                  <div className="entry-episodes">{show.episodes} حلقة</div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                    
                    {filteredShows.length === 0 && (
                      <div className="col-12 text-center py-5">
                        <p className="text-white">لا توجد برامج تطابق المعايير المحددة</p>
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