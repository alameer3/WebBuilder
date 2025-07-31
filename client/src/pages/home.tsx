import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import Carousel from "../components/Carousel";
// ملفات CSS متضمنة في index.css

// استيراد الصور
import logoWhite from '../assets/images/yemen-flix-logo-white.svg';
import siteNewBg from '../assets/images/site-new.webp';
import homeBg from '../assets/images/home-bg.webp';
import defaultAvatar from '../assets/images/default.jpg';

declare global {
  interface Window {
    Typed: any;
    $: any;
  }
}

export default function Home() {
  useEffect(() => {
    // إضافة الكلاسات والخلفية للـ body
    document.body.className = 'header-fixed body-home';
    document.body.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(${homeBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    // تحميل jQuery أولاً من الملف المحدث
    const jqueryScript = document.createElement('script');  
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      // ثم تحميل Typed.js
      const typedScript = document.createElement('script');
      typedScript.src = '/src/assets/js/typed.min.js';
      typedScript.onload = () => {
        // انتظار قليل للتأكد من تحميل الـ DOM
        setTimeout(() => {
          if (window.Typed && window.$) {
            const $ = window.$;
            
            // تطبيق Typed.js بالطريقة الأصلية
            if ($('.widget-2').length) {
              new window.Typed('.widget-2 .form label[for="widget2SearchInput"] span', {
                stringsElement: ".widget-2 .form .label-text",
                typeSpeed: 30
              });
            }

            // تفعيل وظائف jQuery الأساسية (مطابق للأصل)
            $(document).ready(() => {
              // Header background on scroll
              function handleScroll() {
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
              
              // Reset button functionality
              $('button[type="reset"]').on("click", function(this: HTMLElement){
                $(this).parents("form").find("input, textarea").removeClass("not-empty");
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

              // Site overlay
              $(".site-overlay").on("click", function(){
                $("body").removeClass("main-menu-active search-active");
              });

              // ESC key
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

    // تنظيف عند الخروج
    return () => {
      document.body.className = '';
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <>
      {/* Site overlay - مطابق للأصل */}
      <span className="site-overlay"></span>

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
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/notifications" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* صندوق البحث - مطابق للأصل */}
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

      {/* الحاوي الرئيسي - مطابق للأصل */}
      <div className="site-container">
        <div className="page-home">
          <div className="main-header-top"></div>
          
          {/* الهيدر - مطابق للأصل تماماً */}
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
                      <input type="text" id="headerSearchInput" name="q" />
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
          <div className="container py-5 my-5">
            {/* الدائرة المركزية */}
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
                backgroundImage: `url(${siteNewBg})`,
                transition: 'background-position 5s'
              }}>
                <span className="logo">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="87px" height="80px">
                    <path fillRule="evenodd" fill="rgb(255, 255, 255)" 
                      d="M68.479,46.753 L55.101,55.064 L59.686,64.395 L26.302,64.395 L43.500,33.248 L48.558,41.524 L61.642,34.285 L43.500,-0.001 L0.000,80.001 L87.000,80.001 L68.479,46.753 Z" />
                  </svg>
                </span>
                <span className="text font-size-20 font-weight-medium text-white">الصفحة الرئيسية</span>
              </div>
            </div>

            {/* ويدجت البحث الرئيسي */}
            <div className="widget-2 widget mb-4">
              <div className="widget-body row">
                <div className="col-lg-8 mx-auto">
                  <form className="form d-flex no-gutters mb-20" action="/search" method="get">
                    <div className="col pl-12">
                      <input type="text" className="form-control" id="widget2SearchInput" name="q" />
                      <label htmlFor="widget2SearchInput" className="m-0">
                        <span className="label">ابحث عن فيلم او مسلس</span>
                        <span className="typed-cursor" style={{animationIterationCount: 0}}>|</span>
                      </label>
                      <div className="label-text d-none" style={{display: 'none'}}>
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
                  
                  {/* قائمة الأقسام الرئيسية - بالترتيب الصحيح من الأصل */}
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
    </>
  );
}