import { useState, useEffect } from 'react';
import { Link } from 'wouter';

// Import images
import logoWhite from '../assets/images/logo-white.svg';
import defaultAvatar from '../assets/images/default.jpg';

interface HeaderProps {
  className?: string;
}

export default function AkwamHeader({ className = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        document.body.classList.add('header-bg');
      } else {
        setIsScrolled(false);
        document.body.classList.remove('header-bg');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    if (!isMenuOpen) {
      document.body.classList.add('main-menu-active');
      document.body.classList.remove('search-active');
    } else {
      document.body.classList.remove('main-menu-active');
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    if (!isSearchOpen) {
      document.body.classList.add('search-active');
      document.body.classList.remove('main-menu-active');
    } else {
      document.body.classList.remove('search-active');
    }
  };

  return (
    <>
      {/* AKWAM Original Top Header */}
      <div className="main-header-top d-none d-lg-block" style={{ background: '#161619', height: '40px', fontSize: '12px' }}>
        <div className="container">
          <div className="row">
            <div className="col text-center d-flex align-items-center justify-content-center h-100">
              <span style={{ color: '#999', fontSize: '12px' }}>
                مرحباً بكم في موقع يمن فليكس - أفضل موقع لمشاهدة الأفلام والمسلسلات العربية والأجنبية
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AKWAM Main Header */}
      <header className={`main-header main-header-height ${className}`} style={{ height: '70px', background: '#27272c' }}>
        <div className="site-container">
          <div className="container">
            <div className="row align-items-center h-100">
              
              {/* Logo */}
              <div className="col-auto">
                <h2 className="main-logo m-0">
                  <Link href="/" className="d-inline-flex">
                    <img src={logoWhite} className="img-fluid" alt="يمن فليكس" style={{ height: '40px' }} />
                  </Link>
                </h2>
              </div>
          
              {/* Menu Toggle */}
              <div className="col-auto menu-toggle-container">
                <button 
                  onClick={toggleMenu}
                  className="menu-toggle d-flex align-items-center text-white bg-transparent border-0 transition"
                  style={{ fontSize: '18px' }}
                >
                  <span className="icn d-flex flex-column justify-content-between" style={{ width: '20px', height: '15px', position: 'relative' }}>
                    <span style={{ height: '2px', background: isMenuOpen ? '#f3951e' : '#fff', transition: '0.3s' }}></span>
                    <span style={{ height: '2px', background: isMenuOpen ? '#f3951e' : '#fff', transition: '0.3s' }}></span>
                    <span style={{ height: '2px', background: isMenuOpen ? '#f3951e' : '#fff', transition: '0.3s' }}></span>
                  </span>
                  <div className="text mr-3" style={{ color: isMenuOpen ? '#f3951e' : '#fff' }}>الأقسام</div>
                </button>
              </div>

              {/* Spacer */}
              <div className="ml-auto"></div>

              {/* Search Form */}
              <div className="col-md-5 col-lg-6 search-container">
                <div className="search-form position-relative">
                  <form action="/search" method="get" className="position-relative">
                    <input 
                      type="text" 
                      id="headerSearchInput" 
                      name="q" 
                      className="form-control border-0 bg-transparent text-white"
                      style={{ paddingRight: '40px', height: '45px', fontSize: '16px' }}
                    />
                    <label 
                      htmlFor="headerSearchInput" 
                      className="position-absolute text-muted"
                      style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '14px' }}
                    >
                      ابحث عن فيلم او مسلسل ...
                    </label>
                    <button 
                      type="submit"
                      className="position-absolute bg-transparent border-0"
                      style={{ top: '50%', left: '15px', transform: 'translateY(-50%)', color: '#f3951e' }}
                    >
                      <i className="icon-search"></i>
                    </button>
                  </form>
                </div>
              </div>

              {/* Recently Added Button */}
              <div className="col-auto recently-container">
                <Link 
                  href="/recent" 
                  className="btn-recently d-flex align-items-center text-decoration-none text-white transition"
                  style={{ fontSize: '14px' }}
                >
                  <i className="icon-plus2 ml-2"></i>
                  <span>أضيف حديثا</span>
                </Link>
              </div>

              {/* User Panel */}
              <div className="col-auto user-profile-container">
                <div className="user-panel position-relative">
                  
                  {/* Private User (Logged In) - Hidden by default */}
                  <button className="user-toggle d-block bg-transparent border-0 private hide" style={{ fontSize: '20px', color: '#fff' }}>
                    <i className="icon-user"></i>
                  </button>
                  
                  <div className="login-panel private hide position-absolute bg-dark shadow" style={{ top: '100%', right: '0', minWidth: '200px', zIndex: 1000 }}>
                    <div className="user-logged d-flex align-items-center p-3">
                      <div className="col-auto">
                        <img src={defaultAvatar} className="img-fluid rounded-circle" alt="user avatar" style={{ width: '40px', height: '40px' }} />
                      </div>
                      <div className="col pr-2">
                        <div className="username text-white mb-0 text-truncate" style={{ fontSize: '14px' }}>
                          مستخدم
                        </div>
                      </div>
                    </div>
                    <nav className="list">
                      <Link href="/profile" className="d-block px-3 py-2 text-white text-decoration-none">تعديل البروفايل</Link>
                      <Link href="/favorite-movies" className="d-block px-3 py-2 text-white text-decoration-none">قائمتي المفضلة</Link>
                      <hr className="my-2" />
                      <Link href="/logout" className="d-block px-3 py-2 text-white text-decoration-none">تسجيل خروج</Link>
                    </nav>
                  </div>
                  
                  {/* Public User (Not Logged In) */}
                  <Link 
                    href="/login" 
                    className="user-toggle d-block text-decoration-none public transition"
                    style={{ fontSize: '20px', color: '#fff' }}
                  >
                    <i className="icon-user"></i>
                  </Link>
                  
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </>
  );
}