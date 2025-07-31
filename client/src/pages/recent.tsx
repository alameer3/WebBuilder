import { useEffect } from "react";
import logoWhite from "@/assets/images/logo-white.svg";

// بيانات المحتوى المضاف حديثاً
const recentContent = [
  {
    id: 1,
    title: "فيلم حديث 2024",
    category: "دراما",
    year: "2024",
    rating: 9.1,
    image: "/assets/images/default.jpg",
    description: "فيلم درامي جديد",
    addedDate: "منذ ساعتين",
    type: "movie"
  },
  {
    id: 2,
    title: "مسلسل جديد - الحلقة 5",
    category: "إثارة",
    year: "2024",
    rating: 8.9,
    image: "/assets/images/default.jpg",
    description: "حلقة جديدة مثيرة",
    addedDate: "منذ 4 ساعات",
    type: "episode"
  },
  {
    id: 3,
    title: "برنامج حواري جديد",
    category: "منوعات",
    year: "2024",
    rating: 8.5,
    image: "/assets/images/default.jpg",
    description: "برنامج حواري مميز",
    addedDate: "منذ 6 ساعات",
    type: "show"
  },
  {
    id: 4,
    title: "وثائقي الطبيعة الحديث",
    category: "وثائقي",
    year: "2024",
    rating: 9.3,
    image: "/assets/images/default.jpg",
    description: "وثائقي مذهل عن الطبيعة",
    addedDate: "منذ 8 ساعات",
    type: "documentary"
  },
  {
    id: 5,
    title: "كوميديا جديدة",
    category: "كوميديا",
    year: "2024",
    rating: 8.7,
    image: "/assets/images/default.jpg",
    description: "فيلم كوميدي مسلي",
    addedDate: "منذ 12 ساعة",
    type: "movie"
  },
  {
    id: 6,
    title: "أكشن مثير جديد",
    category: "أكشن",
    year: "2024",
    rating: 8.8,
    image: "/assets/images/default.jpg",
    description: "فيلم أكشن رائع",
    addedDate: "منذ يوم واحد",
    type: "movie"
  }
];

export default function Recent() {
  useEffect(() => {
    // تغيير body class لتطابق الأصل
    document.body.className = 'header-fixed header-pages pace-done';
    
    // إضافة jQuery script للتفاعلات
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      // التفاعلات المطلوبة مطابقة للأصل
      const $ = (window as any).$;
      if ($) {
        $(document).ready(function(){
          // Menu toggle functions
          const handleMenuToggle = () => {
            $("body").removeClass("search-active").toggleClass("main-menu-active");
          };
          
          const handleSearchToggle = () => {
            $("body").removeClass("main-menu-active").toggleClass("search-active");
          };

          const handleEscape = (e: any) => {
            if (e.keyCode === 27) {
              $("body").removeClass("search-active main-menu-active");
            }
          };

          $(".menu-toggle").on("click", handleMenuToggle);
          $(".search-toggle").on("click", handleSearchToggle);
          $(document).on("keydown", handleEscape);
        });
      }
    };
    document.head.appendChild(jqueryScript);

    // تنظيف عند الخروج
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      {/* Pace Loading Indicator - مطابق للأصل */}
      <div className="pace pace-inactive">
        <div className="pace-progress" data-progress-text="100%" data-progress="99" style={{transform: 'translate3d(100%, 0px, 0px)'}}>
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>

      {/* طبقة التراكب للقائمة */}
      <div className="site-overlay"></div>

      {/* القائمة الجانبية - مطابقة للأصل */}
      <div className="main-menu">
        <div className="d-flex flex-column">
          <div className="my-auto w-100">
            <div className="menu d-flex flex-wrap justify-content-center">
              <a href="/movies" className="item">
                <div className="icn ml-3"><i className="icon-video-camera"></i></div>
                <div className="text">أفلام</div>
              </a>
              <a href="/series" className="item">
                <div className="icn ml-3"><i className="icon-monitor"></i></div>
                <div className="text">مسلسلات</div>
              </a>
              <a href="/shows" className="item">
                <div className="icn ml-3"><i className="icon-tv"></i></div>
                <div className="text">تلفزيون</div>
              </a>
              <a href="/mix" className="item">
                <div className="icn ml-3"><i className="icon-mix"></i></div>
                <div className="text">منوعات</div>
              </a>
            </div>
          </div>
          <nav className="social d-flex justify-content-center">
            <a href="/" className="home mx-2"><i className="icon-home"></i></a>
            <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="#" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contactus" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* مربع البحث */}
      <div className="search-box px-xl-5">
        <div className="container search-container">
          <form className="search-form" method="get">
            <label className="d-flex align-items-center h-100 w-100 m-0">
              <button type="submit" className="px-3 ml-2 font-size-30"><i className="icon-search"></i></button>
              <input type="search" name="q" placeholder="ابحث هنا" />
            </label>
          </form>
        </div>
      </div>

      {/* موقع الحاوية */}
      <div className="site-container">
        {/* الهيدر الكامل - مطابق للأصل */}
        <header className="main-header">
          <div className="container">
            <div className="row align-items-center py-3">
              <div className="col-lg-2 col-md-3 col-6">
                <div className="logo">
                  <a href="/">
                    <img src={logoWhite} alt="يمن فليكس" className="img-fluid" />
                  </a>
                </div>
              </div>
              
              <div className="col-lg-8 col-md-6 d-none d-md-block">
                <nav className="main-nav">
                  <ul className="nav-list d-flex justify-content-center align-items-center">
                    <li className="nav-item">
                      <a href="/movies" className="nav-link">أفلام</a>
                    </li>
                    <li className="nav-item">
                      <a href="/series" className="nav-link">مسلسلات</a>
                    </li>
                    <li className="nav-item">
                      <a href="/shows" className="nav-link">تلفزيون</a>
                    </li>
                    <li className="nav-item">
                      <a href="/mix" className="nav-link">منوعات</a>
                    </li>
                  </ul>
                </nav>
              </div>
              
              <div className="col-lg-2 col-md-3 col-6">
                <div className="header-actions d-flex justify-content-end align-items-center">
                  <button className="search-toggle btn-icon mr-3">
                    <i className="icon-search"></i>
                  </button>
                  <button className="menu-toggle btn-icon d-md-none">
                    <div className="icn">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-header-height"></div>
        
        {/* Hidden inputs مطابقة للأصل */}
        <input type="hidden" id="page_app" value="recent" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />

        {/* صفحة الأرشيف - مطابقة للأصل */}
        <div className="page page-archive">
          <div className="archive-cover mb-4" style={{backgroundImage: "url('/assets/images/site-new.webp')"}}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="archive-title">
                    <h1 className="title">أُضيف حديثاً</h1>
                    <p className="description">آخر الأفلام والمسلسلات والبرامج المضافة حديثاً للموقع</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* فلاتر المحتوى */}
          <div className="container mb-4">
            <div className="page-filters">
              <div className="row">
                <div className="col-12">
                  <div className="filters-wrap">
                    <div className="filters d-flex flex-wrap">
                      <div className="filter-item">
                        <select className="form-control filter-select">
                          <option value="">جميع الأنواع</option>
                          <option value="movie">أفلام</option>
                          <option value="episode">حلقات</option>
                          <option value="show">برامج</option>
                          <option value="documentary">وثائقيات</option>
                        </select>
                      </div>
                      <div className="filter-item">
                        <select className="form-control filter-select">
                          <option value="">الفئة</option>
                          <option value="drama">دراما</option>
                          <option value="action">أكشن</option>
                          <option value="comedy">كوميديا</option>
                          <option value="thriller">إثارة</option>
                        </select>
                      </div>
                      <div className="filter-item">
                        <select className="form-control filter-select">
                          <option value="">الفترة الزمنية</option>
                          <option value="today">اليوم</option>
                          <option value="week">هذا الأسبوع</option>
                          <option value="month">هذا الشهر</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* شبكة المحتوى الحديث */}
          <div className="container">
            <div className="page-content">
              <div className="archive-content">
                <div className="widgets-posts row">
                  {recentContent.map((item) => (
                    <div key={item.id} className="col-lg-2 col-md-3 col-4 mb-4">
                      <div className="widget widget-1">
                        <div className="entry-box">
                          <div className="entry-image">
                            <a href={`/${item.type}/${item.id}`}>
                              <img src={item.image} alt={item.title} className="img-fluid" />
                              <div className="entry-overlay">
                                <div className="overlay-content">
                                  <div className="recent-badge">
                                    <span className="badge-new">جديد</span>
                                  </div>
                                  <div className="rating">
                                    <span className="rating-star">★</span>
                                    <span className="rating-value">{item.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div className="entry-content">
                            <div className="entry-header">
                              <h3 className="entry-title">
                                <a href={`/${item.type}/${item.id}`}>
                                  {item.title}
                                </a>
                              </h3>
                            </div>
                            <div className="entry-meta">
                              <span className="entry-category">{item.category}</span>
                              <span className="entry-year">{item.year}</span>
                              <span className="entry-added">{item.addedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* التنقل بين الصفحات */}
                <div className="pagination-wrap mt-5">
                  <nav className="pagination">
                    <ul className="page-numbers d-flex justify-content-center">
                      <li><a href="javascript:;" className="page-numbers current">1</a></li>
                      <li><a href="/recent?page=2" className="page-numbers">2</a></li>
                      <li><a href="/recent?page=3" className="page-numbers">3</a></li>
                      <li><a href="/recent?page=4" className="page-numbers">4</a></li>
                      <li><a href="/recent?page=5" className="page-numbers">5</a></li>
                      <li><span className="page-numbers dots">…</span></li>
                      <li><a href="/recent?page=30" className="page-numbers">30</a></li>
                      <li><a href="/recent?page=2" className="next page-numbers">التالي ›</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الفوتر الكامل - مطابق للأصل */}
        <footer className="main-footer">
          <div className="container">
            <div className="footer-content">
              <div className="row">
                <div className="col-md-8">
                  <div className="footer-links">
                    <a href="/dmca">DMCA</a>
                    <a href="/ad-policy">سياسة الإعلانات</a>
                    <a href="/contactus">اتصل بنا</a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="footer-social">
                    <a href="#" className="social-link facebook"><i className="icon-facebook"></i></a>
                    <a href="#" className="social-link youtube"><i className="icon-youtube"></i></a>
                    <a href="#" className="social-link app-store"><i className="icon-app-store"></i></a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom mt-3">
                <p className="copyright text-center">
                  جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* عنصر نهاية القائمة للـ JavaScript */}
        <div id="main-categories-list-end"></div>
      </div>
    </>
  );
}