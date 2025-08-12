// Recent Content Page - مطابق للأصل
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Breadcrumb from '../components/Breadcrumb';

interface RecentItem {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  type: 'movie' | 'series' | 'show' | 'mix';
  genre?: string[];
  quality?: string;
  addedDate: string;
  description?: string;
}

export default function Recent() {
  const [filter, setFilter] = useState('all');

  // بيانات المحتوى المضاف حديثاً
  const recentData: RecentItem[] = [
    {
      id: "9995",
      title: "28 Years Later",
      poster: "https://img.downet.net/thumb/270x400/uploads/Gn5bw.webp",
      year: "2024",
      rating: 8.9,
      type: 'movie',
      genre: ["رعب", "اثارة"],
      quality: "HD",
      addedDate: "2025-02-12"
    },
    {
      id: "4960",
      title: "حرب الجبالي",
      poster: "https://img.downet.net/thumb/270x400/uploads/KrvOM.jpg",
      year: "2024",
      rating: 8.5,
      type: 'series',
      genre: ["دراما", "حرب"],
      quality: "HD",
      addedDate: "2025-02-11"
    },
    {
      id: "9994",
      title: "The Life of Chuck",
      poster: "https://img.downet.net/thumb/270x400/uploads/chuck.jpg",
      year: "2024",
      rating: 7.8,
      type: 'movie',
      genre: ["دراما", "فانتازيا"],
      quality: "HD",
      addedDate: "2025-02-10"
    },
    {
      id: "4994",
      title: "Dexter Resurrection",
      poster: "https://img.downet.net/thumb/270x400/uploads/dexter.jpg",
      year: "2024",
      rating: 9.1,
      type: 'series',
      genre: ["جريمة", "دراما"],
      quality: "HD",
      addedDate: "2025-02-09"
    },
    {
      id: "9993",
      title: "The Dogs",
      poster: "https://img.downet.net/thumb/270x400/uploads/dogs.jpg",
      year: "2024",
      rating: 8.2,
      type: 'movie',
      genre: ["اكشن", "جريمة"],
      quality: "HD",
      addedDate: "2025-02-08"
    }
  ];

  useEffect(() => {
    document.title = "أضيف حديثاً - يمن فليكس";
    document.body.className = 'page-archive archive-recent header-fixed';
    
    // تنظيف الخلفية
    document.body.style.background = '';
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundAttachment = '';

    return () => {
      document.body.className = "";
    };
  }, []);

  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "أضيف حديثاً" }
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'movie': return 'icon-video-camera';
      case 'series': return 'icon-monitor';
      case 'show': return 'icon-tv';
      case 'mix': return 'icon-mix';
      default: return 'icon-video-camera';
    }
  };

  const getTypeText = (type: string) => {
    switch(type) {
      case 'movie': return 'فيلم';
      case 'series': return 'مسلسل';
      case 'show': return 'برنامج';
      case 'mix': return 'منوعات';
      default: return 'مجهول';
    }
  };

  const filteredData = filter === 'all' ? recentData : recentData.filter(item => item.type === filter);

  return (
    <>
      {/* Pace Loading Indicator */}
      <div className="pace pace-inactive">
        <div className="pace-progress" data-progress-text="100%" data-progress="99" style={{ transform: 'translate3d(100%, 0px, 0px)' }}>
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>

      {/* Site Overlay */}
      <span className="site-overlay"></span>

      {/* Hidden Inputs */}
      <input type="hidden" id="page_app" value="recent" className="not-empty" />
      <input type="hidden" id="page_id" value="0" className="not-empty" />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Content */}
      <div className="page page-archive">
        {/* Archive Cover */}
        <div className="archive-cover mb-4" style={{ backgroundImage: 'url("https://img.downet.net/uploads/recent-bg.webp")' }}>
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
                    <div className="filter-tabs">
                      <div className="row">
                        <div className="col-12">
                          <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <button 
                              type="button" 
                              className={`btn btn-outline-orange ${filter === 'all' ? 'active' : ''}`}
                              onClick={() => setFilter('all')}
                            >
                              الكل
                            </button>
                            <button 
                              type="button" 
                              className={`btn btn-outline-orange ${filter === 'movie' ? 'active' : ''}`}
                              onClick={() => setFilter('movie')}
                            >
                              أفلام
                            </button>
                            <button 
                              type="button" 
                              className={`btn btn-outline-orange ${filter === 'series' ? 'active' : ''}`}
                              onClick={() => setFilter('series')}
                            >
                              مسلسلات
                            </button>
                            <button 
                              type="button" 
                              className={`btn btn-outline-orange ${filter === 'show' ? 'active' : ''}`}
                              onClick={() => setFilter('show')}
                            >
                              تلفزيون
                            </button>
                            <button 
                              type="button" 
                              className={`btn btn-outline-orange ${filter === 'mix' ? 'active' : ''}`}
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
            </div>
          </div>
        </div>

        {/* Recent Content Grid */}
        <div className="container">
          <div className="archive-entries">
            <div className="row">
              {filteredData.map((item) => (
                <div key={item.id} className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                  <div className="entry-box entry-box-2">
                    <div className="entry-image">
                      <Link href={`/${item.type}/${item.id}`}>
                        <a className="box">
                          <picture>
                            <img src={item.poster} alt={item.title} />
                          </picture>
                          <div className="entry-overlay">
                            <div className="entry-actions">
                              <div className="entry-play">
                                <i className="icon-play"></i>
                              </div>
                              <div className="entry-rating">
                                <i className="icon-star"></i>
                                <span>{item.rating}</span>
                              </div>
                            </div>
                            {item.quality && (
                              <div className="entry-quality">{item.quality}</div>
                            )}
                            <div className="entry-type">
                              <i className={getTypeIcon(item.type)}></i>
                              <span>{getTypeText(item.type)}</span>
                            </div>
                            <div className="entry-date">{item.addedDate}</div>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="entry-body px-3 pb-3 text-center">
                      <h2 className="entry-title font-size-14 font-weight-bold mb-1">
                        <Link href={`/${item.type}/${item.id}`}>
                          <a>{item.title}</a>
                        </Link>
                      </h2>
                      <div className="entry-meta font-size-12 text-muted">
                        <span>{item.year}</span>
                        <span> • {getTypeText(item.type)}</span>
                        {item.genre && Array.isArray(item.genre) && (
                          <span> • {item.genre.join(', ')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="widget-pagination">
            <ul className="pagination justify-content-center" role="navigation">
              <li className="page-item disabled" aria-disabled="true">
                <span className="page-link" aria-hidden="true">‹</span>
              </li>
              <li className="page-item mx-1 active" aria-current="page">
                <span className="page-link">1</span>
              </li>
              <li className="page-item mx-1">
                <a className="page-link" href="/recent?page=2">2</a>
              </li>
              <li className="page-item mx-1">
                <a className="page-link" href="/recent?page=3">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/recent?page=2" rel="next" aria-label="التالي »">›</a>
              </li>
            </ul>
          </div>
          
          <div id="main-categories-list-end"></div>
        </div>
      </div>
    </>
  );
}