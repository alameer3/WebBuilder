// Series Page - مطابق للأصل تماماً
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Breadcrumb from '../components/Breadcrumb';

interface Series {
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

export default function Series() {
  const [filters, setFilters] = useState({
    section: '0',
    category: '0', 
    rating: '0',
    year: '0'
  });

  // بيانات تجريبية للمسلسلات (سيتم استبدالها ببيانات حقيقية)
  const seriesData: Series[] = [
    {
      id: "4960",
      title: "حرب الجبالي",
      poster: "https://img.downet.net/thumb/270x400/uploads/KrvOM.jpg",
      year: "2024",
      rating: 8.5,
      genre: ["دراما", "حرب"],
      quality: "HD",
      episodes: 30,
      description: "مسلسل درامي يحكي قصة..."
    },
    {
      id: "4994", 
      title: "Dexter Resurrection",
      poster: "https://img.downet.net/thumb/270x400/uploads/dexter.jpg",
      year: "2024",
      rating: 9.1,
      genre: ["جريمة", "دراما"],
      quality: "HD",
      episodes: 10
    },
    {
      id: "4948",
      title: "بات مان",
      poster: "https://img.downet.net/thumb/270x400/uploads/batman.jpg", 
      year: "2023",
      rating: 7.8,
      genre: ["اكشن", "مغامرة"],
      quality: "HD",
      episodes: 20
    },
    {
      id: "4949",
      title: "أسد بات",
      poster: "https://img.downet.net/thumb/270x400/uploads/asad.jpg",
      year: "2023", 
      rating: 8.2,
      genre: ["دراما", "تاريخي"],
      quality: "HD",
      episodes: 25
    }
  ];

  useEffect(() => {
    // إعداد الصفحة
    document.title = "مسلسلات - يمن فليكس";
    document.body.className = 'page-archive archive-series header-fixed';
    
    // تنظيف الخلفية من الصفحة الرئيسية
    document.body.style.background = '';
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundAttachment = '';

    // إعداد وظائف التفاعل
    const handleMenuToggle = () => {
      document.body.classList.toggle('main-menu-active');
    };

    const handleSearchToggle = () => {
      document.body.classList.toggle('search-active');
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.body.classList.remove('main-menu-active', 'search-active');
      }
    };

    // إضافة مستمعي الأحداث
    const menuToggle = document.querySelector('.menu-toggle');
    const searchToggle = document.querySelector('.search-toggle');
    
    menuToggle?.addEventListener('click', handleMenuToggle);
    searchToggle?.addEventListener('click', handleSearchToggle);
    document.addEventListener('keydown', handleEscape);

    return () => {
      menuToggle?.removeEventListener('click', handleMenuToggle);
      searchToggle?.removeEventListener('click', handleSearchToggle);
      document.removeEventListener('keydown', handleEscape);
      document.body.className = "";
    };
  }, []);

  // إعداد Breadcrumb
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "مسلسلات" }
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

      {/* Main Menu - مطابق للأصل */}
      <div className="main-menu">
        <div className="d-flex flex-column">
          <div className="my-auto w-100">
            <div className="menu d-flex flex-wrap justify-content-center">
              <Link href="/movies">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-video-camera"></i></div>
                  <div className="text">أفلام</div>
                </a>
              </Link>
              <Link href="/series">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-monitor"></i></div>
                  <div className="text">مسلسلات</div>
                </a>
              </Link>
              <Link href="/shows">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-tv"></i></div>
                  <div className="text">تلفزيون</div>
                </a>
              </Link>
              <Link href="/mix">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-mix"></i></div>
                  <div className="text">منوعات</div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="search">
        <div className="search-box">
          <form action="/search" method="get">
            <label>
              <input type="search" name="q" id="searchBoxInput" placeholder="ابحث هنا" />
            </label>
          </form>
          <div className="search-toggle"><i className="icon-arrow-back"></i></div>
        </div>
      </div>

      {/* Site Container */}
      <div className="site-container">
        {/* Main Header Top */}
        <div className="main-header-top"></div>
        
        {/* Header */}
        <header className="main-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <h2 className="main-logo m-0">
                  <Link href="/">
                    <a className="d-inline-flex">
                      <img src="/src/assets/images/logo-white.svg" className="img-fluid" alt="يمن فليكس" />
                    </a>
                  </Link>
                </h2>
              </div>
              <div className="col-auto menu-toggle-container">
                <a href="#" onClick={(e) => e.preventDefault()} className="menu-toggle d-flex align-items-center text-white">
                  <span className="icn">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <div className="text font-size-18 mr-3">الأقسام</div>
                </a>
              </div>
              <div className="ml-auto"></div>
              <div className="col-md-5 col-lg-6 search-container">
                <div className="search-form">
                  <form action="/search" method="get">
                    <input type="text" id="headerSearchInput" name="q" />
                    <label htmlFor="headerSearchInput">ابحث عن مسلسل ...</label>
                    <button><i className="icon-search"></i></button>
                  </form>
                </div>
              </div>
              <div className="col-auto recently-container">
                <Link href="/recent">
                  <a className="btn-recently">
                    <i className="icon-plus2 ml-2"></i>
                    <span>أضيف حديثا</span>
                  </a>
                </Link>
              </div>
              <div className="col-auto user-profile-container">
                <div className="user-panel">
                  <div className="login-panel private hide">
                    <nav className="list">
                      <a href="/profile">تعديل البروفايل</a>
                      <a href="/favorite/series">قائمتي المفضلة</a>
                      <a href="/logout">تسجيل خروج</a>
                    </nav>
                  </div>
                  <Link href="/login">
                    <a className="user-toggle d-block font-size-20 public">
                      <i className="icon-user"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-header-height"></div>
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        {/* Hidden Inputs */}
        <input type="hidden" id="page_app" value="series" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />

        {/* Page Content */}
        <div className="page page-archive">
          {/* Archive Cover */}
          <div className="archive-cover mb-4" style={{ backgroundImage: 'url("https://img.downet.net/uploads/series-bg.webp")' }}>
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
                              <select className="form-control select2" name="section" value={filters.section} onChange={(e) => setFilters({...filters, section: e.target.value})}>
                                <option value="0">القسم</option>
                                <option value="29">عربي</option>
                                <option value="30">اجنبي</option>
                                <option value="31">تركي</option>
                                <option value="32">هندي</option>
                                <option value="33">اسيوي</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12 mb-lg-0">
                              <select className="form-control select2" name="category" value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                                <option value="0">التصنيف</option>
                                <option value="18">اكشن</option>
                                <option value="20">كوميدي</option>
                                <option value="21">جريمة</option>
                                <option value="22">رعب</option>
                                <option value="23">دراما</option>
                                <option value="24">خيال علمي</option>
                                <option value="25">حربي</option>
                                <option value="26">تاريخي</option>
                                <option value="27">رومانسي</option>
                                <option value="28">وثائقي</option>
                                <option value="29">سيرة ذاتية</option>
                                <option value="30">انمي</option>
                                <option value="31">موسيقى</option>
                                <option value="32">رياضي</option>
                                <option value="33">عائلي</option>
                                <option value="34">غموض</option>
                                <option value="35">اثارة</option>
                                <option value="43">فانتازيا</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 col-12 offset-lg-3">
                            <div className="form-group mb-0">
                              <select className="form-control select2" name="rating" value={filters.rating} onChange={(e) => setFilters({...filters, rating: e.target.value})}>
                                <option value="0">التقييم</option>
                                <option value="1">+1</option>
                                <option value="2">+2</option>
                                <option value="3">+3</option>
                                <option value="4">+4</option>
                                <option value="5">+5</option>
                                <option value="6">+6</option>
                                <option value="7">+7</option>
                                <option value="8">+8</option>
                                <option value="9">+9</option>
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

          {/* Series Grid */}
          <div className="container">
            <div className="archive-entries">
              <div className="row">
                {seriesData.map((series) => (
                  <div key={series.id} className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                    <div className="entry-box entry-box-2">
                      <div className="entry-image">
                        <Link href={`/series/${series.id}`}>
                          <a className="box">
                            <picture>
                              <img src={series.poster} alt={series.title} />
                            </picture>
                            <div className="entry-overlay">
                              <div className="entry-actions">
                                <div className="entry-play">
                                  <i className="icon-play"></i>
                                </div>
                                <div className="entry-rating">
                                  <i className="icon-star"></i>
                                  <span>{series.rating}</span>
                                </div>
                              </div>
                              {series.quality && (
                                <div className="entry-quality">{series.quality}</div>
                              )}
                              {series.episodes && (
                                <div className="entry-episodes">{series.episodes} حلقة</div>
                              )}
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div className="entry-body px-3 pb-3 text-center">
                        <h2 className="entry-title font-size-14 font-weight-bold mb-1">
                          <Link href={`/series/${series.id}`}>
                            <a>{series.title}</a>
                          </Link>
                        </h2>
                        <div className="entry-meta font-size-12 text-muted">
                          <span>{series.year}</span>
                          {series.genre && Array.isArray(series.genre) && (
                            <span> • {series.genre.join(', ')}</span>
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
                  <a className="page-link" href="/series?page=2">2</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/series?page=3">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/series?page=2" rel="next" aria-label="التالي »">›</a>
                </li>
              </ul>
            </div>
            
            <div id="main-categories-list-end"></div>
          </div>
        </div>

        {/* Footer */}
        <footer className="main-footer">
          <div className="container">
            <div className="widget-footer text-center border-top pt-4 mt-5">
              <nav className="footer-social d-flex justify-content-center mb-4">
                <Link href="/"><a className="home mx-2" title="الرئيسية"><i className="icon-home"></i></a></Link>
                <a href="https://www.facebook.com/yemenflix" target="_blank" className="facebook mx-2" title="فيسبوك"><i className="icon-facebook"></i></a>
                <a href="https://www.youtube.com/c/yemenflix" target="_blank" className="youtube mx-2" title="يوتيوب"><i className="icon-youtube"></i></a>
                <Link href="/contactus"><a className="email mx-2" title="اتصل بنا"><i className="icon-email"></i></a></Link>
              </nav>
              <div className="footer-links d-flex justify-content-center flex-wrap mb-3">
                <Link href="/movies"><a className="mx-2">أفلام</a></Link>
                <Link href="/series"><a className="mx-2">مسلسلات</a></Link>
                <Link href="/shows"><a className="mx-2">تلفزيون</a></Link>
                <Link href="/mix"><a className="mx-2">منوعات</a></Link>
              </div>
              <p className="copyright mb-0 font-size-12 text-center mt-3">
                جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}