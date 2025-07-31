import { useEffect } from "react";
import logoWhite from "@/assets/images/logo-white.svg";

export default function Mix() {
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
            <a href="#" className="mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="mx-2"><i className="icon-twitter"></i></a>
            <a href="#" className="mx-2"><i className="icon-instagram"></i></a>
          </nav>
        </div>
      </div>

      {/* site-container مطابق للأصل */}
      <div className="site-container">
        <div className="main-header-top"></div>
        
        {/* الهيدر الرئيسي - مطابق للأصل تماماً */}
        <header className="main-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <h2 className="main-logo m-0">
                <a href="/main" className="d-inline-flex">
                  <img src={logoWhite} className="img-fluid" alt="يمن فليكس" />
                </a>
              </h2>
            </div>
            <div className="col-auto menu-toggle-container">
              <a href="#" onClick={(e) => e.preventDefault()} className="menu-toggle d-flex align-items-center text-white">
                <span className="icn"></span>
                <div className="text font-size-18 mr-3">الأقسام</div>
              </a>
            </div>
            <div className="ml-auto"></div>
            <div className="col-md-5 col-lg-6 search-container">
              <div className="search-form">
                <form action="/search" method="get">
                  <input type="text" id="headerSearchInput" name="q" />
                  <label htmlFor="headerSearchInput">ابحث عن فيلم او مسلسل ...</label>
                  <button type="submit"><i className="icon-search"></i></button>
                </form>
              </div>
            </div>
            <div className="col-auto mr-xl-3">
              <div className="main-categories list-inline-item m-0 d-none d-xl-block">
                <a href="/recent" className="modern-category">الأحدث</a>
                <a href="/mix" className="modern-category active">منوعات</a>
                <a href="/shows" className="modern-category">تلفزيون</a>
                <a href="/series" className="modern-category">مسلسلات</a>
                <a href="/movies" className="modern-category">أفلام</a>
              </div>
            </div>
            <div className="col-auto">
              <div className="list-inline-item m-0">
                <div className="user-account">
                  <a href="/profile">
                    <i className="icon-account_circle font-size-30"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </header>

        {/* محتوى الصفحة */}
        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* عنوان الصفحة */}
                <div className="page-title">
                  <h1>منوعات</h1>
                  <p>مجموعة متنوعة من الأفلام والمسلسلات والبرامج</p>
                </div>

                {/* شبكة المحتوى المتنوع */}
                <div className="widget">
                  <div className="widget-body row flex-wrap">
                    {/* مثال على المحتوى المتنوع */}
                    {Array.from({ length: 30 }).map((_, index) => (
                      <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                        <div className="entry-box-1 text-center">
                          <div className="entry-image position-relative">
                            <a href={`/item/${index + 1}`}>
                              <img 
                                src="/src/assets/images/default.jpg" 
                                alt={`محتوى ${index + 1}`}
                                className="img-fluid rounded"
                              />
                            </a>
                            <div className="entry-rating">
                              <span>7.{index % 10}</span>
                            </div>
                            <div className="entry-type">
                              <span>{index % 3 === 0 ? 'فيلم' : index % 3 === 1 ? 'مسلسل' : 'برنامج'}</span>
                            </div>
                          </div>
                          <div className="entry-body px-3 pb-3 text-center">
                            <h5 className="entry-title mb-1">
                              <a href={`/item/${index + 1}`}>
                                {index % 3 === 0 ? `فيلم منوع ${index + 1}` : 
                                 index % 3 === 1 ? `مسلسل منوع ${index + 1}` : 
                                 `برنامج منوع ${index + 1}`}
                              </a>
                            </h5>
                            <div className="entry-meta text-muted small">
                              <span>2024</span> • <span>عربي</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* التنقل بين الصفحات */}
                <div className="pagination-container text-center mt-4">
                  <div className="pagination">
                    <a href="/mix?page=1" className="page-link active">1</a>
                    <a href="/mix?page=2" className="page-link">2</a>
                    <a href="/mix?page=3" className="page-link">3</a>
                    <a href="/mix?page=4" className="page-link">4</a>
                    <a href="/mix?page=5" className="page-link">5</a>
                    <span className="page-dots">...</span>
                    <a href="/mix?page=20" className="page-link">20</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الفوتر */}
        <footer className="main-footer">
          <div className="container">
            <div className="footer-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-links">
                    <a href="/about">حول الموقع</a>
                    <a href="/contact">اتصل بنا</a>
                    <a href="/privacy">سياسة الخصوصية</a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="social-links">
                    <a href="#" className="social-link"><i className="icon-facebook"></i></a>
                    <a href="#" className="social-link"><i className="icon-twitter"></i></a>
                    <a href="#" className="social-link"><i className="icon-instagram"></i></a>
                    <a href="#" className="social-link"><i className="icon-youtube"></i></a>
                  </div>
                </div>
              </div>
              <div className="copyright text-center mt-3">
                <p>&copy; 2025 يمن فليكس. جميع الحقوق محفوظة.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}