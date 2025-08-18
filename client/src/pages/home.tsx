import { useEffect } from 'react';
import logoWhite from '../assets/images/logo-white.svg';
import siteNewBg from '../assets/images/site-new.webp';

// تحميل ملفات CSS الأصلية
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

declare global {
  interface Window {
    Typed: any;
    $: any;
    jQuery: any;
  }
}

export default function Home() {
  useEffect(() => {
    // تطبيق كلاسات body الأصلية مطابقة للموقع الأصلي
    document.body.className = 'header-fixed body-home';
    
    // إضافة الخلفية الصحيحة للصفحة الرئيسية مطابقة للموقع الأصلي
    const homeStyle = document.createElement('style');
    homeStyle.textContent = `
      body { 
        background: linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(/src/assets/images/home-bg.webp) !important;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
      }
    `;
    document.head.appendChild(homeStyle);

    // إضافة BreadcrumbList JSON-LD Schema مطابقة للموقع الأصلي
    const breadcrumbSchema = {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://yemen-flix.replit.app/",
            "name": "يمن فليكس | موقع المشاهدة العربي الاول"
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptTag);
    
    // تحميل jQuery أولاً
    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      // تحميل Typed.js
      const typedScript = document.createElement('script');
      typedScript.src = '/src/assets/js/typed.min.js';
      typedScript.onload = () => {
        setTimeout(() => {
          if (window.Typed && window.$) {
            const $ = window.$;
            window.jQuery = $;

            // تطبيق JavaScript الأصلي بالضبط
            const handleScroll = () => {
              if ($(".main-header").length) {
                if ($(window).scrollTop()! <= 50) {
                  $("body").removeClass("header-bg");
                } else {
                  $("body").addClass("header-bg");
                }
                
                if ($(".main-categories-list-end").length) {
                  if ($(window).scrollTop()! <= $(".main-categories-list-end").offset()!.top) {
                    $("body").removeClass("header-menu");
                  } else {
                    $("body").addClass("header-menu");
                  }
                }
              }
            };

            // تفعيل Typed.js الأصلي
            if ($('.widget-2').length) {
              new window.Typed('.widget-2 .form label[for="widget2SearchInput"] span', {
                stringsElement: ".widget-2 .form .label-text",
                typeSpeed: 30
              });
            }

            $(document).ready(() => {
              handleScroll();
              $(window).on("scroll", handleScroll);

              // وظائف الأزرار والتفاعل الأصلية
              $("input, textarea").on("focusout change submit blur", function(this: HTMLElement){
                if ($(this).val()) {
                  $(this).addClass("not-empty");
                } else {
                  $(this).removeClass("not-empty");
                }
              });

              $('button[type="reset"]').on("click", function(this: HTMLElement){
                $(this).parents("form").find("input, textarea").removeClass("not-empty");
              });

              $(".menu-toggle").on("click", function(){
                $("body").removeClass("search-active").toggleClass("main-menu-active");
              });

              $(".search-toggle").on("click", function(){
                $("body").removeClass("main-menu-active").toggleClass("search-active");
                setTimeout(function(){
                  $(".search-box form input").focus();
                }, 200);
              });

              $(".site-overlay").on("click", function(){
                $("body").removeClass("main-menu-active search-active");
              });

              $(document).on("keydown", function(e: any){
                if (e.keyCode === 27) {
                  $("body").removeClass("search-active main-menu-active");
                }
              });
            });
          }
        }, 1000);
      };
      document.head.appendChild(typedScript);
    };
    document.head.appendChild(jqueryScript);

    return () => {
      document.body.className = '';
    };
  }, []);

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

      {/* Main Menu */}
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
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* Search Box */}
      <div className="search-box px-xl-5">
        <div className="container search-container">
          <form action="/search" className="search-form" method="get">
            <label htmlFor="searchBoxInput" className="d-flex align-items-center h-100 w-100 m-0">
              <button type="submit" className="px-3 ml-2 font-size-30"><i className="icon-search"></i></button>
              <input type="search" name="q" id="searchBoxInput" placeholder="ابحث هنا" />
            </label>
          </form>
          <div className="search-toggle"><i className="icon-arrow-back"></i></div>
        </div>
      </div>

      <div className="site-container">
        <div className="page-home">
          <div className="main-header-top"></div>
          
          {/* Header */}
          <header className="main-header">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-auto">
                  <h2 className="main-logo m-0">
                    <a href="/" className="d-inline-flex">
                      <img src={logoWhite} className="img-fluid" alt="يمن فليكس" />
                    </a>
                  </h2>
                </div>
                <div className="col-auto menu-toggle-container">
                  <a href="#" className="menu-toggle d-flex align-items-center text-white">
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
                      <label htmlFor="headerSearchInput">ابحث عن فيلم او مسلسل ...</label>
                      <button><i className="icon-search"></i></button>
                    </form>
                  </div>
                </div>
                <div className="col-auto recently-container">
                  <a href="/recent" className="btn-recently">
                    <i className="icon-plus2 ml-2"></i><span>أضيف حديثا</span>
                  </a>
                </div>
                <div className="col-auto user-profile-container">
                  <div className="user-panel">
                    <a className="user-toggle d-block font-size-20 public" href="/login"><i className="icon-user"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="main-header-height"></div>
          
          {/* Home Content */}
          <div className="container py-5 my-5">
            {/* Central Logo Button */}
            <div className="home-site-btn-container mt-5">
              <h1>
                <a href="/" className="link" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', zIndex: 10 }}></a>
              </h1>
              <div 
                className="home-site-btn" 
                style={{ 
                  backgroundImage: `url(${siteNewBg})`,
                  transition: 'background-position 5s'
                }}
              >
                <span className="logo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="87px" height="80px">
                    <path fillRule="evenodd" fill="rgb(255, 255, 255)" d="M68.479,46.753 L55.101,55.064 L59.686,64.395 L26.302,64.395 L43.500,33.248 L48.558,41.524 L61.642,34.285 L43.500,-0.001 L0.000,80.001 L87.000,80.001 L68.479,46.753 Z"></path>
                  </svg>
                </span>
                <span className="text font-size-20 font-weight-medium text-white">الصفحة الرئيسية</span>
              </div>
            </div>

            {/* Search Widget */}
            <div className="widget-2 widget mb-4">
              <div className="widget-body row">
                <div className="col-lg-8 mx-auto">
                  <form className="form d-flex no-gutters mb-20" action="/search" method="get">
                    <div className="col pl-12">
                      <input type="text" className="form-control" id="widget2SearchInput" name="q" />
                      <label htmlFor="widget2SearchInput" className="m-0">
                        <span className="label">ابحث عن فيلم او مسلس</span>
                        <span className="typed-cursor" style={{ animationIterationCount: 0 }}>|</span>
                      </label>
                      <div className="label-text d-none" style={{ display: 'none' }}>
                        <p>ابحث عن فيلم او مسلسل او لعبة او برنامج ...</p>
                        <p>^200 مثال: الجزيرة</p>
                        <p>^400 مثال آخر: اسم مؤقت</p>
                        <p>^600 مثال: FIFA</p>
                        <p>^800 ابحث هنا في يمن فليكس باسم الفيلم او المسلسل او اي لعبة او برنامج ترغب به</p>
                      </div>
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-orange">بحث</button>
                    </div>
                  </form>

                  {/* Main Categories */}
                  <div className="main-categories-list">
                    <div className="row">
                      <div className="col-lg col-4">
                        <a href="/movies" className="item d-block text-center text-white py-3 h-100">
                          <div className="icn"><i className="icon-video-camera"></i></div>
                          <div className="font-size-16">أفلام</div>
                        </a>
                      </div>
                      <div className="col-lg col-4">
                        <a href="/series" className="item d-block text-center text-white py-3 h-100">
                          <div className="icn"><i className="icon-monitor"></i></div>
                          <div className="font-size-16">مسلسلات</div>
                        </a>
                      </div>
                      <div className="col-lg col-4">
                        <a href="/shows" className="item d-block text-center text-white py-3 h-100">
                          <div className="icn"><i className="icon-tv"></i></div>
                          <div className="font-size-16">تلفزيون</div>
                        </a>
                      </div>
                      <div className="col-lg col-4">
                        <a href="/mix" className="item d-block text-center text-white py-3 h-100">
                          <div className="icn"><i className="icon-mix"></i></div>
                          <div className="font-size-16">منوعات</div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="main-categories-list-end"></div>
                </div>
              </div>
            </div>

            {/* Recently Added Widget */}
            <div className="widget widget-style-1 mb-4" data-grid="6">
              <header className="widget-header mb-4 d-flex align-items-center">
                <h2 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">أضيف حديثا</span>
                </h2>
                <img src="/style/assets/images/icn-w-header.png" className="header-img" alt="icn-w-header" />
              </header>
              <div className="widget-body">
                <div className="row">
                  {/* Recent Movies Grid */}
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="col-6 col-lg-2 col-md-4 mb-12">
                      <div className="entry-box entry-box-1">
                        <div className="labels d-flex">
                          <span className="label rating"><i className="icon-star mr-2"></i>8.{item}</span>
                          <span className="ml-auto"></span>
                        </div>
                        <a href={`/movie/${item}`}>
                          <div className="entry-image">
                            <div className="image" style={{ backgroundImage: 'url("https://img.downet.net/thumb/178x260/uploads/default.jpg")' }}></div>
                            <div className="entry-overlay">
                              <div className="overlay-content">
                                <div className="entry-title">فيلم {item}</div>
                                <div className="entry-year">2025</div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="main-footer py-5">
          <nav className="social d-flex justify-content-center">
            <a href="/" target="" className="home mx-2"><i className="icon-home"></i></a>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contact" target="" className="email mx-2"><i className="icon-email"></i></a>
          </nav>

          <nav className="links d-flex justify-content-center mt-3">
            <a href="/" target="" className="mx-2">يمن فليكس</a>
            <a href="/old" target="_blank" className="mx-2">الموقع القديم</a>
            <a href="/dmca" target="" className="mx-2">DMCA</a>
            <a href="/ad-policy" target="" className="mx-2">AD-P</a>
            <a href="#" target="_blank" className="mx-2">يمن فليكس نيوز</a>
            <a href="#" target="_blank" className="mx-2">شبكة يمن فليكس</a>
          </nav>

          <p className="copyright mb-0 font-size-12 text-center mt-3">
            جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
          </p>
        </footer>
      </div>
    </>
  );
}