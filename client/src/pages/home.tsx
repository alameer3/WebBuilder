import { useState, useEffect, useRef } from "react";
import defaultImage from "@/assets/images/default.jpg";
import logoWhite from "@/assets/images/logo-white.svg";

declare global {
  interface Window {
    Typed: any;
    $: any;
  }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const typedElementRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  useEffect(() => {
    // Add body class for homepage styling
    document.body.classList.add('body-home', 'page-home');
    
    let typedInstance: any = null;

    // Initialize typing animation for search placeholder
    const initTypedAnimation = () => {
      if (typeof window.Typed !== 'undefined') {
        // Target the label span inside the search widget
        const targetElement = document.querySelector('.widget-2 .form label[for="widget2SearchInput"] span.label');
        if (targetElement) {
          typedInstance = new window.Typed('.widget-2 .form label[for="widget2SearchInput"] span.label', {
            stringsElement: '.widget-2 .form .label-text',
            typeSpeed: 30,
            loop: true,
            backDelay: 2000,
            startDelay: 500,
            showCursor: false
          });
        }
      }
    };

    // Initialize menu interactions
    const initMenuInteractions = () => {
      // Menu toggle functionality
      const menuToggle = document.querySelector('.menu-toggle');
      const siteOverlay = document.querySelector('.site-overlay');
      const searchToggle = document.querySelector('.search-toggle');
      
      if (menuToggle) {
        menuToggle.addEventListener('click', () => {
          document.body.classList.remove('search-active');
          document.body.classList.toggle('main-menu-active');
        });
      }

      if (siteOverlay) {
        siteOverlay.addEventListener('click', () => {
          document.body.classList.remove('main-menu-active', 'search-active');
        });
      }

      if (searchToggle) {
        searchToggle.addEventListener('click', () => {
          document.body.classList.remove('main-menu-active');
          document.body.classList.toggle('search-active');
          setTimeout(() => {
            const searchInput = document.querySelector('.search-box form input') as HTMLInputElement;
            if (searchInput) searchInput.focus();
          }, 200);
        });
      }

      // Escape key handling
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) { // ESC key
          document.body.classList.remove('search-active', 'main-menu-active');
        }
      });

      // Input handling for styling
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        const handleInputChange = () => {
          if ((input as HTMLInputElement).value) {
            input.classList.add('not-empty');
          } else {
            input.classList.remove('not-empty');
          }
        };

        input.addEventListener('focusout', handleInputChange);
        input.addEventListener('change', handleInputChange);
        input.addEventListener('submit', handleInputChange);
        input.addEventListener('blur', handleInputChange);
      });

      // Header background on scroll
      const updateHeaderBackground = () => {
        const mainHeader = document.querySelector('.main-header');
        const categoriesListEnd = document.querySelector('.main-categories-list-end');
        
        if (mainHeader) {
          if (window.scrollY <= 50) {
            document.body.classList.remove('header-bg');
          } else {
            document.body.classList.add('header-bg');
          }

          if (categoriesListEnd) {
            const endOffset = categoriesListEnd.getBoundingClientRect().top + window.scrollY;
            if (window.scrollY <= endOffset) {
              document.body.classList.remove('header-menu');
            } else {
              document.body.classList.add('header-menu');
            }
          }
        }
      };

      updateHeaderBackground();
      window.addEventListener('scroll', updateHeaderBackground);
    };

    // Check if scripts are loaded and initialize
    let retryCount = 0;
    const maxRetries = 50;
    
    const checkScripts = () => {
      if (typeof window.$ !== 'undefined' && typeof window.Typed !== 'undefined') {
        initTypedAnimation();
        initMenuInteractions();
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(checkScripts, 100);
      }
    };

    setTimeout(checkScripts, 100);

    return () => {
      // Clean up body classes when component unmounts
      document.body.classList.remove('body-home', 'page-home');
      
      if (typedInstance) {
        typedInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="header-fixed body-home page-home">
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
            <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/contactus" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* Search Box */}
      <div className="search-box px-xl-5">
        <div className="container search-container">
          <form onSubmit={handleSearch} className="search-form">
            <label htmlFor="searchBoxInput" className="d-flex align-items-center h-100 w-100 m-0">
              <button type="submit" className="px-3 ml-2 font-size-30"><i className="icon-search"></i></button>
              <input 
                type="search" 
                name="q" 
                id="searchBoxInput" 
                placeholder="ابحث هنا"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </form>
          <div className="search-toggle"><i className="icon-arrow-back"></i></div>
        </div>
      </div>

      {/* Site Container */}
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
                  <button type="button" className="menu-toggle d-flex align-items-center text-white" style={{background: 'none', border: 'none'}}>
                    <span className="icn"></span>
                    <div className="text font-size-18 mr-3">الأقسام</div>
                  </button>
                </div>
                <div className="ml-auto"></div>
                <div className="col-md-5 col-lg-6 search-container">
                  <div className="search-form">
                    <form onSubmit={handleSearch}>
                      <input 
                        type="text" 
                        id="headerSearchInput" 
                        name="q"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <label htmlFor="headerSearchInput">ابحث عن فيلم او مسلسل ...</label>
                      <button type="submit"><i className="icon-search"></i></button>
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
                    <a className="user-toggle d-block font-size-20 public" href="/login">
                      <i className="icon-user"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <div className="main-header-height"></div>
          
          {/* Main Content */}
          <div className="container py-5 my-5">
            {/* Home Site Button - Central Circle */}
            <div className="home-site-btn-container mt-5">
              <h1>
                <a href="/" className="link" style={{position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', zIndex: 10}}></a>
              </h1>
              <div className="home-site-btn" style={{backgroundImage: `url(${defaultImage})`, transition: 'background-position 5s'}}>
                <span className="logo">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="87px" height="80px">
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
                  <form className="form d-flex no-gutters mb-20" onSubmit={handleSearch}>
                    <div className="col pl-12">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="widget2SearchInput" 
                        name="q"
                        ref={typedElementRef}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <label htmlFor="widget2SearchInput" className="m-0">
                        <span className="label">ابحث عن فيلم او مسلسل</span>
                        <span className="typed-cursor">|</span>
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
                </div>
              </div>
            </div>
            <div className="main-categories-list-end"></div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="main-footer py-5">
          <nav className="social d-flex justify-content-center">
            <a href="/" className="home mx-2"><i className="icon-home"></i></a>
            <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/contactus" className="email mx-2"><i className="icon-email"></i></a>
          </nav>

          <nav className="links d-flex justify-content-center mt-3">
            <a href="/" className="mx-2">يمن فليكس</a>
            <a href="/dmca" className="mx-2">DMCA</a>
            <a href="/ad-policy" className="mx-2">AD-P</a>
            <a href="/contactus" className="mx-2">شبكة يمن فليكس</a>
          </nav>

          <p className="copyright mb-0 font-size-12 text-center mt-3">جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025</p>
        </footer>
      </div>
    </div>
  );
}