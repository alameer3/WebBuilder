import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AkwamHeader from '../components/AkwamHeader';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

interface MixContent {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  type: 'video' | 'audio' | 'image' | 'document';
  duration?: string;
  size?: string;
  genre?: string[];
  quality?: string;
}

export default function Mix() {
  const [filters, setFilters] = useState({
    section: '0',
    category: '0',
    rating: '0',
    year: '0'
  });

  const mixData: MixContent[] = [
    {
      id: "508",
      title: "تغريدات الإعداد",
      poster: "https://img.downet.net/thumb/270x400/uploads/mix1.jpg",
      year: "2024",
      rating: 7.5,
      type: "video",
      duration: "15:30",
      genre: ["توك شو"],
      quality: "HD"
    },
    {
      id: "764",
      title: "أغنية من شارع بجاي الياس",
      poster: "https://img.downet.net/thumb/270x400/uploads/mix2.jpg",
      year: "2023",
      rating: 8.0,
      type: "audio",
      duration: "04:25",
      genre: ["موسيقى"],
      quality: "HD"
    },
    {
      id: "781",
      title: "إسراء الإذاعة أب الواد",
      poster: "https://img.downet.net/thumb/270x400/uploads/mix3.jpg",
      year: "2024",
      rating: 6.8,
      type: "video",
      duration: "25:15",
      genre: ["إذاعة"],
      quality: "HD"
    }
  ];

  const { data: mixContent = mixData, isLoading } = useQuery({
    queryKey: ['/api/mix'],
    queryFn: () => fetch('/api/mix').then(res => res.json()).catch(() => mixData)
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
            "@id": "https://yemen-flix.replit.app/mix",
            "name": "منوعات"
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

  const filteredMix = Array.isArray(mixContent) ? mixContent.filter((item: MixContent) => {
    if (filters.year !== '0' && item.year !== filters.year) return false;
    if (filters.rating !== '0' && item.rating < parseInt(filters.rating)) return false;
    return true;
  }) : [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return 'icon-play';
      case 'audio': return 'icon-music';
      case 'image': return 'icon-image';
      case 'document': return 'icon-file';
      default: return 'icon-file';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'فيديو';
      case 'audio': return 'صوت';
      case 'image': return 'صورة';
      case 'document': return 'ملف';
      default: return 'محتوى';
    }
  };

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-archive">
          <div className="archive-cover mb-4" style={{ backgroundImage: `url('https://img.downet.net/uploads/mix-bg.webp')` }}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-mix ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">منوعات</h1>
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
                                <option value="video">فيديو</option>
                                <option value="audio">صوت</option>
                                <option value="image">صورة</option>
                                <option value="document">ملف</option>
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
                                <option value="music">موسيقى</option>
                                <option value="talk">توك شو</option>
                                <option value="radio">إذاعة</option>
                                <option value="comedy">كوميدي</option>
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
                    {filteredMix.map((item) => (
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
                            <span className="ml-auto"></span>
                          </div>
                          
                          <a href={`/mix/${item.id}`}>
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
                                  {item.duration && (
                                    <div className="entry-duration">{item.duration}</div>
                                  )}
                                  <div className="entry-type">{getTypeLabel(item.type)}</div>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                    
                    {filteredMix.length === 0 && (
                      <div className="col-12 text-center py-5">
                        <p className="text-white">لا توجد منوعات تطابق المعايير المحددة</p>
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