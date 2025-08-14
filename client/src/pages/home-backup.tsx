import { useEffect } from 'react';
import logoWhite from '../assets/images/logo-white.svg';
import siteNewBg from '../assets/images/site-new.webp';
import homeBg from '../assets/images/home-bg.webp';

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
    // تطبيق كلاسات body الأصلية
    document.body.className = 'header-fixed body-home';

    // إضافة BreadcrumbList JSON-LD Schema
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
        }, 300);
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
      {/* Site Overlay */}
      <div className="site-overlay">
        <div className="close"></div>
      </div>

      {/* Search Box */}
      <div className="search-box px-xl-5">
        <div className="container search-container">
          <form action="/search" className="search-form" method="get">
            <label htmlFor="searchBoxInput" className="d-flex align-items-center h-100 w-100 m-0">
              <button type="submit" className="px-3 ml-2 font-size-30">
                <i className="icon-search"></i>
              </button>
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

        {/* Main Header */}
        <header className="main-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <h2 className="main-logo m-0">
                  <a href="/main" className="d-inline-flex">
                    <img src={logoWhite} className="img-fluid" alt="YEMEN_FLIX" />
                  </a>
                </h2>
              </div>
              <div className="col-auto menu-toggle-container">
                <button type="button" onClick={() => {}} className="menu-toggle d-flex align-items-center text-white">
                  <span className="icn"></span>
                  <div className="text font-size-18 mr-3">الأقسام</div>
                </button>
              </div>
              <div className="col search-container">
                <div className="search-toggle">
                  <i className="icon-search font-size-20"></i>
                </div>
              </div>
              <div className="col-auto">
                <div className="user-panel">
                  <div className="login-panel shadow">
                    <nav className="list-unstyled mb-0">
                      <a href="/login">تسجيل دخول</a>
                      <a href="/register">انشاء حساب</a>
                      <a href="/logout">تسجيل خروج</a>
                    </nav>
                  </div>
                  <a className="user-toggle d-block font-size-20 public" href="/login">
                    <i className="icon-user"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Header Height */}
        <div className="main-header-height"></div>

        {/* SVG Filter for blur effects */}
        <svg style={{opacity: 0, visibility: 'hidden', position: 'absolute', top: '-999px', right: '-999px'}}>
          <filter id="blur-effect-1">
            <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          </filter>
        </svg>

        {/* Main Menu */}
        <div className="main-menu">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-12 d-flex flex-column">
                <nav className="menu flex-grow-1 d-flex flex-column justify-content-center">
                  <a href="/" className="item py-3">
                    <div className="icn"><i className="icon-home"></i></div>
                    <div className="text">الرئيسية</div>
                  </a>
                  <a href="/movies" className="item py-3">
                    <div className="icn"><i className="icon-video-camera"></i></div>
                    <div className="text">أفلام</div>
                  </a>
                  <a href="/series" className="item py-3">
                    <div className="icn"><i className="icon-monitor"></i></div>
                    <div className="text">مسلسلات</div>
                  </a>
                  <a href="/shows" className="item py-3">
                    <div className="icn"><i className="icon-tv"></i></div>
                    <div className="text">تلفزيون</div>
                  </a>
                  <a href="/mix" className="item py-3">
                    <div className="icn"><i className="icon-mix"></i></div>
                    <div className="text">منوعات</div>
                  </a>
                </nav>
                <nav className="social d-flex justify-content-center">
                  <a href="#" className="home mx-2"><i className="icon-home"></i></a>
                  <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
                  <a href="#" className="twitter mx-2"><i className="icon-twitter"></i></a>
                  <a href="#" className="app-store mx-2"><i className="icon-app-store"></i></a>
                  <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
                  <a href="#" className="telegram mx-2"><i className="icon-telegram"></i></a>
                  <a href="#" className="email mx-2"><i className="icon-email"></i></a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Home Content */}
        <div style={{marginBottom: "90px"}}></div>

        <div className="container">
          {/* Home Site Button - اللوجو الدائري */}
          <div className="home-site-btn-container mt-5">
            <h1>
              <a href="/" className="link" style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                zIndex: 10
              }}></a>
            </h1>
            <div className="home-site-btn" style={{
              backgroundImage: `url('${siteNewBg}')`,
              transition: 'background-position 5s'
            }}>
              <span className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="87px" height="80px">
                  <path fillRule="evenodd" fill="rgb(255, 255, 255)" 
                        d="M68.479,46.753 L55.101,55.064 L59.686,64.395 L26.302,64.395 L43.500,33.248 L48.558,41.524 L61.642,34.285 L43.500,-0.001 L0.000,80.001 L87.000,80.001 L68.479,46.753 Z" />
                </svg>
              </span>
              <span className="text font-size-20 font-weight-medium text-white">الصفحة الرئيسية</span>
            </div>
          </div>

          {/* Widget 2 - Search */}
          <div className="widget-2 widget mb-4">
            <div className="widget-body row">
              <div className="col-lg-8 mx-auto">
                <form className="form d-flex no-gutters mb-20" action="/search" method="get">
                  <div className="col pl-12">
                    <input type="text" className="form-control" id="widget2SearchInput" name="q" />
                    <label htmlFor="widget2SearchInput" className="m-0">
                      <span className="label"></span>
                    </label>
                    <div className="label-text d-none">
                      <p>ابحث عن فيلم او مسلسل او لعبة او برنامج ...</p>
                      <p>^200 مثال: الجزيرة</p>
                      <p>^400 مثال آخر: اسم مؤقت</p>
                      <p>^600 مثال: FIFA</p>
                      <p>^800 ابحث هنا في YEMEN_FLIX باسم الفيلم او المسلسل او اي لعبة او برنامج ترغب به</p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-orange">بحث</button>
                  </div>
                </form>

                {/* Main Categories List */}
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
              </div>
            </div>
          </div>
          <div className="main-categories-list-end"></div>
        </div>

        {/* Footer */}
        <footer className="main-footer py-5">
          <nav className="social d-flex justify-content-center">
            <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="twitter mx-2"><i className="icon-twitter"></i></a>
            <a href="#" className="instagram mx-2"><i className="icon-instagram"></i></a>
            <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="#" className="telegram mx-2"><i className="icon-telegram"></i></a>
          </nav>

          <nav className="links d-flex justify-content-center mt-3">
            <a href="/" className="mx-2">يمن فليكس</a>
            <a href="/dmca" className="mx-2">DMCA</a>
            <a href="/ad-policy" className="mx-2">AD-P</a>
            <a href="/contactus" className="mx-2">اتصل بنا</a>
          </nav>

          <p className="copyright mb-0 font-size-12 text-center mt-3">
            جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
          </p>
        </footer>
      </div>
    </>
  );
}