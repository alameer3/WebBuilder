// TV Shows Page - مطابق للأصل
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import Breadcrumb from '../components/Breadcrumb';

interface Show {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  genre?: string[];
  quality?: string;
  episodes?: number;
  description?: string;
}

export default function Shows() {
  const [filters, setFilters] = useState({
    category: '0',
    year: '0'
  });

  // بيانات تجريبية للبرامج التلفزيونية
  const showsData: Show[] = [
    {
      id: "113",
      title: "الشرطة الأحساء",
      poster: "https://img.downet.net/thumb/270x400/uploads/police.jpg",
      year: "2024",
      rating: 8.0,
      genre: ["واقعي", "جريمة"],
      quality: "HD",
      episodes: 20
    },
    {
      id: "127",
      title: "AEW Dynamite",
      poster: "https://img.downet.net/thumb/270x400/uploads/aew.jpg",
      year: "2024",
      rating: 9.2,
      genre: ["رياضي", "مصارعة"],
      quality: "HD",
      episodes: 52
    },
    {
      id: "129",
      title: "أنت الآن تشاهد أحداثة",
      poster: "https://img.downet.net/thumb/270x400/uploads/events.jpg",
      year: "2024",
      rating: 7.5,
      genre: ["إخباري", "حالي"],
      quality: "HD",
      episodes: 100
    },
    {
      id: "13",
      title: "حفل جوائز إيمي 71",
      poster: "https://img.downet.net/thumb/270x400/uploads/emmy.jpg",
      year: "2024",
      rating: 8.8,
      genre: ["حفلات", "جوائز"],
      quality: "HD",
      episodes: 1
    }
  ];

  useEffect(() => {
    document.title = "برامج تلفزيونية - يمن فليكس";
    document.body.className = 'page-archive archive-shows header-fixed';
    
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
    { name: "تلفزيون" }
  ];

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
      <input type="hidden" id="page_app" value="shows" className="not-empty" />
      <input type="hidden" id="page_id" value="0" className="not-empty" />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Page Content */}
      <div className="page page-archive">
        {/* Archive Cover */}
        <div className="archive-cover mb-4" style={{ backgroundImage: 'url("https://img.downet.net/uploads/shows-bg.webp")' }}>
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
                              className="form-control select2" 
                              name="category" 
                              value={filters.category} 
                              onChange={(e) => setFilters({...filters, category: e.target.value})}
                            >
                              <option value="0">التصنيف</option>
                              <option value="sports">رياضي</option>
                              <option value="news">إخباري</option>
                              <option value="entertainment">ترفيهي</option>
                              <option value="educational">تعليمي</option>
                              <option value="documentary">وثائقي</option>
                              <option value="reality">واقعي</option>
                              <option value="cooking">طبخ</option>
                              <option value="talk">حواري</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12">
                            <select 
                              className="form-control select2" 
                              name="year" 
                              value={filters.year} 
                              onChange={(e) => setFilters({...filters, year: e.target.value})}
                            >
                              <option value="0">سنة الإنتاج</option>
                              <option value="2024">2024</option>
                              <option value="2023">2023</option>
                              <option value="2022">2022</option>
                              <option value="2021">2021</option>
                              <option value="2020">2020</option>
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

        {/* Shows Grid */}
        <div className="container">
          <div className="archive-entries">
            <div className="row">
              {showsData.map((show) => (
                <div key={show.id} className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                  <div className="entry-box entry-box-2">
                    <div className="entry-image">
                      <Link href={`/show/${show.id}`}>
                        <a className="box">
                          <picture>
                            <img src={show.poster} alt={show.title} />
                          </picture>
                          <div className="entry-overlay">
                            <div className="entry-actions">
                              <div className="entry-play">
                                <i className="icon-play"></i>
                              </div>
                              <div className="entry-rating">
                                <i className="icon-star"></i>
                                <span>{show.rating}</span>
                              </div>
                            </div>
                            {show.quality && (
                              <div className="entry-quality">{show.quality}</div>
                            )}
                            {show.episodes && (
                              <div className="entry-episodes">{show.episodes} حلقة</div>
                            )}
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="entry-body px-3 pb-3 text-center">
                      <h2 className="entry-title font-size-14 font-weight-bold mb-1">
                        <Link href={`/show/${show.id}`}>
                          <a>{show.title}</a>
                        </Link>
                      </h2>
                      <div className="entry-meta font-size-12 text-muted">
                        <span>{show.year}</span>
                        {show.genre && Array.isArray(show.genre) && (
                          <span> • {show.genre.join(', ')}</span>
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
                <a className="page-link" href="/shows?page=2">2</a>
              </li>
              <li className="page-item mx-1">
                <a className="page-link" href="/shows?page=3">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="/shows?page=2" rel="next" aria-label="التالي »">›</a>
              </li>
            </ul>
          </div>
          
          <div id="main-categories-list-end"></div>
        </div>
      </div>
    </>
  );
}