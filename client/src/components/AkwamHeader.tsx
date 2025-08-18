import { Link } from 'wouter';
import logoWhite from '../assets/images/logo-white.svg';

export default function AkwamHeader() {
  return (
    <>
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

      {/* Main Menu */}
      <div className="main-menu">
        <div className="d-flex flex-column">
          <div className="my-auto w-100">
            <div className="menu d-flex flex-wrap justify-content-center">
              <Link href="/movies" className="item">
                <div className="icn ml-3"><i className="icon-video-camera"></i></div>
                <div className="text">أفلام</div>
              </Link>
              <Link href="/series" className="item">
                <div className="icn ml-3"><i className="icon-monitor"></i></div>
                <div className="text">مسلسلات</div>
              </Link>
              <Link href="/shows" className="item">
                <div className="icn ml-3"><i className="icon-tv"></i></div>
                <div className="text">تلفزيون</div>
              </Link>
              <Link href="/mix" className="item">
                <div className="icn ml-3"><i className="icon-mix"></i></div>
                <div className="text">منوعات</div>
              </Link>
            </div>
          </div>
          <nav className="social d-flex justify-content-center">
            <Link href="/" className="home mx-2"><i className="icon-home"></i></Link>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <Link href="/contact" className="email mx-2"><i className="icon-email"></i></Link>
          </nav>
        </div>
      </div>

      {/* Site Overlay */}
      <span className="site-overlay"></span>

      {/* Header */}
      <header className="main-header" data-testid="main-header">
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
                  <input type="text" id="headerSearchInput" name="q" data-testid="header-search-input" />
                  <label htmlFor="headerSearchInput">ابحث عن فيلم او مسلسل ...</label>
                  <button data-testid="header-search-button"><i className="icon-search"></i></button>
                </form>
              </div>
            </div>
            
            <div className="col-auto recently-container">
              <Link href="/recent" className="btn-recently" data-testid="recent-link">
                <i className="icon-plus2 ml-2"></i><span>أضيف حديثا</span>
              </Link>
            </div>
            
            <div className="col-auto user-profile-container">
              <div className="user-panel">
                <Link className="user-toggle d-block font-size-20 public" href="/login" data-testid="login-link">
                  <i className="icon-user"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}