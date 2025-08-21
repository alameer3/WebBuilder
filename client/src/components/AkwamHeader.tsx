import { Link } from 'wouter';
import logoWhite from '../assets/images/logo-white.svg';

export default function AkwamHeader() {
  const handleMenuToggle = () => {
    document.body.classList.toggle('main-menu-active');
  };

  const handleSearchToggle = () => {
    document.body.classList.toggle('search-active');
  };

  return (
    <>
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
              <button onClick={handleMenuToggle} className="menu-toggle d-flex align-items-center text-white bg-transparent border-0">
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
                  <input type="text" id="headerSearchInput" name="q" data-testid="header-search-input" />
                  <label htmlFor="headerSearchInput">ابحث عن فيلم او مسلسل ...</label>
                  <button type="submit" data-testid="header-search-button"><i className="icon-search"></i></button>
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