import { useEffect } from 'react';
import '../assets/css/style.css';
import '../assets/css/home.css';
import '../assets/css/plugins.css';

declare global {
  interface Window {
    Typed: any;
  }
}

export default function Home() {
  useEffect(() => {
    // تحميل مكتبة Typed.js
    const script = document.createElement('script');
    script.src = '/src/assets/js/typed.min.js';
    script.onload = () => {
      if (window.Typed) {
        new window.Typed('.widget-2 .form label[for="widget2SearchInput"] span', {
          stringsElement: ".widget-2 .form .label-text",
          typeSpeed: 30
        });
      }
    };
    document.head.appendChild(script);

    // إضافة الخلفية للـ body
    document.body.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, .55), #000 100%), url(/src/assets/images/home-bg.webp)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    // تنظيف عند إلغاء التحميل
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <div className="site-container">
      <div className="page-home">
        {/* الهيدر */}
        <div className="main-header-top"></div>
        <header className="main-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <h2 className="main-logo m-0">
                  <a href="/" className="d-inline-flex">
                    <img src="/src/assets/images/logo-white.svg" className="img-fluid" alt="Yemen Flix" />
                  </a>
                </h2>
              </div>
              <div className="col-auto menu-toggle-container">
                <a href="javascript:;" className="menu-toggle d-flex align-items-center text-white">
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
              <div className="col-auto recently-container">
                <a href="/recent" className="btn-recently">
                  <i className="icon-plus2 ml-2"></i>
                  <span>أضيف حديثا</span>
                </a>
              </div>
              <div className="col-auto user-profile-container">
                <div className="user-panel">
                  <a className="user-toggle d-block font-size-20" href="/login">
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
              backgroundImage: 'url(/src/assets/images/site-new.webp)',
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

          {/* ويدجت البحث */}
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
                      <p>^800 ابحث هنا في Yemen Flix باسم الفيلم او المسلسل او اي لعبة او برنامج ترغب به</p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-orange">بحث</button>
                  </div>
                </form>

                {/* قائمة الفئات الرئيسية */}
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
      </div>

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
            <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* صندوق البحث */}
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

      {/* الطبقة الشفافة */}
      <span className="site-overlay"></span>

      {/* Footer */}
      <footer className="main-footer py-5">
        <nav className="social d-flex justify-content-center">
          <a href="/" className="home mx-2"><i className="icon-home"></i></a>
          <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
          <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
          <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
        </nav>

        <nav className="links d-flex justify-content-center mt-3">
          <a href="/" className="mx-2">Yemen Flix</a>
          <a href="/contact" className="mx-2">تواصل معنا</a>
        </nav>

        <p className="copyright mb-0 font-size-12 text-center mt-3">
          جميع الحقوق محفوظة لـ Yemen Flix © 2025
        </p>
      </footer>
    </div>
  );
}