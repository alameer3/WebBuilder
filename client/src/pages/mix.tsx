// Mix/Various Content Page - مطابق للأصل
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Breadcrumb from '../components/Breadcrumb';

interface MixContent {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  type: 'game' | 'software' | 'other';
  size?: string;
  platform?: string;
  description?: string;
}

export default function Mix() {
  const [filters, setFilters] = useState({
    type: '0',
    platform: '0'
  });

  // بيانات تجريبية للمحتوى المنوع
  const mixData: MixContent[] = [
    {
      id: "508",
      title: "تطبيقات الأعداد",
      poster: "https://img.downet.net/thumb/270x400/uploads/apps.jpg",
      year: "2024",
      rating: 8.5,
      type: 'software',
      size: "250 MB",
      platform: "Android"
    },
    {
      id: "764",
      title: "أغنية - يا شار بجاي ياس",
      poster: "https://img.downet.net/thumb/270x400/uploads/music.jpg",
      year: "2024",
      rating: 9.0,
      type: 'other',
      size: "15 MB",
      platform: "Audio"
    },
    {
      id: "781",
      title: "الأسس إذاع اب الواد",
      poster: "https://img.downet.net/thumb/270x400/uploads/radio.jpg",
      year: "2024",
      rating: 7.8,
      type: 'other',
      size: "100 MB",
      platform: "Audio"
    },
    {
      id: "782",
      title: "الأسس إذاعة الواة",
      poster: "https://img.downet.net/thumb/270x400/uploads/broadcast.jpg",
      year: "2024",
      rating: 8.2,
      type: 'other',
      size: "80 MB",
      platform: "Audio"
    }
  ];

  useEffect(() => {
    document.title = "منوعات - يمن فليكس";
    document.body.className = 'page-archive archive-mix header-fixed';
    
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
    { name: "منوعات" }
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'game': return 'icon-game';
      case 'software': return 'icon-mobile';
      case 'other': return 'icon-mix';
      default: return 'icon-mix';
    }
  };

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
      <input type="hidden" id="page_app" value="mix" className="not-empty" />
      <input type="hidden" id="page_id" value="0" className="not-empty" />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Content */}
      <div className="page page-archive">
        {/* Archive Cover */}
        <div className="archive-cover mb-4" style={{ backgroundImage: 'url("https://img.downet.net/uploads/mix-bg.webp")' }}>
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
                              className="form-control select2" 
                              name="type" 
                              value={filters.type} 
                              onChange={(e) => setFilters({...filters, type: e.target.value})}
                            >
                              <option value="0">النوع</option>
                              <option value="game">ألعاب</option>
                              <option value="software">برمجيات</option>
                              <option value="music">موسيقى</option>
                              <option value="book">كتب</option>
                              <option value="other">أخرى</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12">
                            <select 
                              className="form-control select2" 
                              name="platform" 
                              value={filters.platform} 
                              onChange={(e) => setFilters({...filters, platform: e.target.value})}
                            >
                              <option value="0">المنصة</option>
                              <option value="pc">حاسوب</option>
                              <option value="android">أندرويد</option>
                              <option value="ios">آيفون</option>
                              <option value="ps">بلايستيشن</option>
                              <option value="xbox">إكس بوكس</option>
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

        {/* Mix Content Grid */}
        <div className="container">
          <div className="archive-entries">
            <div className="row">
              {mixData.map((item) => (
                <div key={item.id} className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                  <div className="entry-box entry-box-2">
                    <div className="entry-image">
                      <Link href={`/mix/${item.id}`}>
                        <a className="box">
                          <picture>
                            <img src={item.poster} alt={item.title} />
                          </picture>
                          <div className="entry-overlay">
                            <div className="entry-actions">
                              <div className="entry-play">
                                <i className="icon-download"></i>
                              </div>
                              <div className="entry-rating">
                                <i className="icon-star"></i>
                                <span>{item.rating}</span>
                              </div>
                            </div>
                            {item.size && (
                              <div className="entry-size">{item.size}</div>
                            )}
                            <div className="entry-type">
                              <i className={getTypeIcon(item.type)}></i>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="entry-body px-3 pb-3 text-center">
                      <h2 className="entry-title font-size-14 font-weight-bold mb-1">
                        <Link href={`/mix/${item.id}`}>
                          <a>{item.title}</a>
                        </Link>
                      </h2>
                      <div className="entry-meta font-size-12 text-muted">
                        <span>{item.year}</span>
                        {item.platform && (
                          <span> • {item.platform}</span>
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
                <a className="page-link" href="/mix?page=2">2</a>
              </li>
              <li className="page-item mx-1">
                <a className="page-link" href="/mix?page=3">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/mix?page=2" rel="next" aria-label="التالي »">›</a>
              </li>
            </ul>
          </div>
          
          <div id="main-categories-list-end"></div>
        </div>
      </div>
    </>
  );
}