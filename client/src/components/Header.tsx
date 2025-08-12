import { useState, useEffect } from 'react';
import { Link } from 'wouter';

// Import images
import logoWhite from '../assets/images/yemen-flix-logo-white.svg';
import defaultAvatar from '../assets/images/default.jpg';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
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
    <header className={`main-header ${className}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <h2 className="main-logo m-0">
                <Link href="/" className="d-inline-flex">
                  <img src={logoWhite} className="img-fluid" alt="يمن فليكس" />
                </Link>
              </h2>
            </div>
          
          <div className="col-auto menu-toggle-container">
            <button 
              onClick={toggleMenu}
              className="menu-toggle d-flex align-items-center text-white bg-transparent border-0"
            >
              <span className="icn">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <div className="text font-size-18 mr-3">الأقسام</div>
            </button>
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
            <Link href="/recent" className="btn-recently">
              <i className="icon-plus2 ml-2"></i>
              <span>أضيف حديثا</span>
            </Link>
          </div>

          <div className="col-auto user-profile-container">
            <div className="user-panel">
              <button className="user-toggle d-block font-size-20 private hide bg-transparent border-0">
                <i className="icon-user"></i>
              </button>
              <div className="login-panel private hide">
                <div className="user-logged d-flex align-items-center no-gutters p-3">
                  <div className="col-auto">
                    <img src={defaultAvatar} className="img-fluid rounded-circle" alt="user avatar" />
                  </div>
                  <div className="col pr-2">
                    <div className="username font-size-14 font-weight-normal text-truncate text-white mb-0 mr-1" 
                         style={{width: '120px', height: '22px'}}>
                      مستخدم
                    </div>
                  </div>
                </div>
                <nav className="list">
                  <Link href="/profile">تعديل البروفايل</Link>
                  <Link href="/favorite-movies">قائمتي المفضلة</Link>
                  <span className="line"></span>
                  <Link href="/logout">تسجيل خروج</Link>
                </nav>
              </div>
              <Link href="/login" className="user-toggle d-block font-size-20 public">
                <i className="icon-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}