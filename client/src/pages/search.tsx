import { useEffect } from 'react';
import { useLocation } from 'wouter';
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/yemen-flix.css';

// استيراد الصور
import logoWhite from '../assets/images/logo-white.svg';
import defaultAvatar from '../assets/images/default.jpg';

export default function Search() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('q') || '';

  useEffect(() => {
    // إضافة الكلاسات المطلوبة للـ body
    document.body.className = 'header-fixed';
    
    // تحميل jQuery للتفاعلات
    const jqueryScript = document.createElement('script');  
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      if (window.$) {
        const $ = window.$;
        
        // التفاعلات الأساسية
        $(document).ready(() => {
          // Header background on scroll
          function handleScroll() {
            if ($(".main-header").length) {
              if ($(window).scrollTop()! <= 50) {
                $("body").removeClass("header-bg");
              } else {
                $("body").addClass("header-bg");
              }
            }
          }
          
          handleScroll();
          $(window).on("scroll", handleScroll);
          
          // Input focus states
          $("input, textarea").on("focusout change submit blur", function(this: HTMLElement){
            if ($(this).val()) {
              $(this).addClass("not-empty");
            } else {
              $(this).removeClass("not-empty");
            }
          });

          // Site overlay
          $(".site-overlay").on("click", function(){
            $("body").removeClass("main-menu-active search-active");
          });

          // Menu toggle  
          $(".menu-toggle").on("click", function(){
            $("body").removeClass("search-active").toggleClass("main-menu-active");
          });

          // Search toggle
          $(".search-toggle").on("click", function(){
            $("body").removeClass("main-menu-active").toggleClass("search-active");
            setTimeout(function(){
              $(".search-box form input").focus();
            }, 200);
          });

          // ESC key
          $(document).on("keydown", function(e: any){
            if (e.keyCode === 27) {
              $("body").removeClass("search-active main-menu-active");
            }
          });
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
      {/* Site overlay */}
      <span className="site-overlay"></span>

      {/* القائمة الجانبية */}
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
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/notifications" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* صندوق البحث */}
      <div className="search-box px-xl-5">
        <div className="container search-container">
          <form action="/search" className="search-form" method="get">
            <label htmlFor="searchBoxInput" className="d-flex align-items-center h-100 w-100 m-0">
              <button type="submit" className="px-3 ml-2 font-size-30"><i className="icon-search"></i></button>
              <input type="search" name="q" id="searchBoxInput" placeholder="ابحث هنا" defaultValue={searchQuery} />
            </label>
          </form>
          <div className="search-toggle"><i className="icon-arrow-back"></i></div>
        </div>
      </div>

      {/* الحاوي الرئيسي */}
      <div className="site-container">
        <div className="page-search">
          <div className="main-header-top"></div>
          
          {/* الهيدر */}
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
                      <input type="text" id="headerSearchInput" name="q" defaultValue={searchQuery} />
                      <label htmlFor="headerSearchInput">ابحث عن فيلم او مسلسل ...</label>
                      <button><i className="icon-search"></i></button>
                    </form>
                  </div>
                </div>
                <div className="col-auto recently-container">
                  <a href="/recent" className="btn-recently">
                    <i className="icon-plus2 ml-2"></i>
                    <span>أضيف حديثا</span>
                  </a>
                </div>
                <div className="col-auto user-profile-container">
                  <div className="user-panel">
                    <a className="user-toggle d-block font-size-20 private hide" href="#" onClick={(e) => e.preventDefault()}>
                      <i className="icon-user"></i>
                    </a>
                    <div className="login-panel private hide">
                      <div className="user-logged d-flex align-items-center no-gutters p-3">
                        <div className="col-auto">
                          <img src={defaultAvatar} className="img-fluid rounded-circle" alt="user avatar" />
                        </div>
                        <div className="col pr-2">
                          <div className="username font-size-14 font-weight-normal text-truncate text-white mb-0 mr-1" style={{width: '120px', height: '22px'}}>
                            مستخدم
                          </div>
                        </div>
                      </div>
                      <nav className="list">
                        <a href="/profile">تعديل البروفايل</a>
                        <a href="/favorite/movies">قائمتي المفضلة</a>
                        <span className="line"></span>
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

          <div className="main-header-height"></div>
          
          {/* المحتوى الرئيسي */}
          <div className="container py-5">
            <div className="row">
              <div className="col-12">
                <h1 className="text-white mb-4">
                  {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'صفحة البحث'}
                </h1>
                
                {searchQuery ? (
                  <div className="search-results">
                    <p className="text-white-50 mb-4">جاري البحث في قاعدة البيانات...</p>
                    {/* هنا ستكون النتائج */}
                    <div className="alert alert-info text-center">
                      <h4>قريباً</h4>
                      <p>وظيفة البحث تحت التطوير</p>
                    </div>
                  </div>
                ) : (
                  <div className="search-help">
                    <div className="widget-2 widget mb-4">
                      <div className="widget-body">
                        <form className="form d-flex no-gutters" action="/search" method="get">
                          <div className="col pl-12">
                            <input type="text" className="form-control" id="mainSearchInput" name="q" />
                            <label htmlFor="mainSearchInput" className="m-0">
                              <span className="label">ابحث عن فيلم او مسلسل او لعبة او برنامج</span>
                            </label>
                          </div>
                          <div className="col-auto">
                            <button type="submit" className="btn btn-orange">بحث</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="main-footer py-5">
          <nav className="social d-flex justify-content-center">
            <a href="/" className="home mx-2"><i className="icon-home"></i></a>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/notifications" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
          </nav>

          <nav className="links d-flex justify-content-center mt-3">
            <a href="/" className="mx-2">يمن فليكس</a>
            <a href="/old" target="_blank" className="mx-2">الموقع القديم</a>
            <a href="/dmca" className="mx-2">DMCA</a>
            <a href="/ad-policy" className="mx-2">AD-P</a>
            <a href="/news" target="_blank" className="mx-2">يمن فليكس نيوز</a>
            <a href="/network" target="_blank" className="mx-2">شبكة يمن فليكس</a>
          </nav>

          <p className="copyright mb-0 font-size-12 text-center mt-3">
            جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
          </p>
        </footer>
      </div>
    </>
  );
}