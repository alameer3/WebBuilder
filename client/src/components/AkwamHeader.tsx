// Akwam Header Component - مطابق للأصل
import { Link } from 'wouter';
import logoWhite from '../assets/images/logo-white.svg';
import defaultAvatar from '../assets/images/default.jpg';

export default function AkwamHeader() {
  return (
    <header className="main-header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <h2 className="main-logo m-0">
              <Link href="/">
                <a className="d-inline-flex">
                  <img src={logoWhite} className="img-fluid" alt="يمن فليكس" />
                </a>
              </Link>
            </h2>
          </div>
          
          <div className="col-auto menu-toggle-container">
            <a 
              href="#" 
              className="menu-toggle d-flex align-items-center text-white"
              onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('main-menu-active');
                document.body.classList.remove('search-active');
              }}
            >
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
            <Link href="/recent">
              <a className="btn-recently">
                <i className="icon-plus2 ml-2"></i>
                <span>أضيف حديثا</span>
              </a>
            </Link>
          </div>
          
          <div className="col-auto user-profile-container">
            <div className="user-panel">
              <a 
                className="user-toggle d-block font-size-20 private hide" 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  const parent = e.currentTarget.parentElement;
                  parent?.classList.toggle('active');
                }}
              >
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
                  <Link href="/profile"><a>تعديل البروفايل</a></Link>
                  <Link href="/favorites"><a>قائمتي المفضلة</a></Link>
                  <span className="line"></span>
                  <Link href="/logout"><a>تسجيل خروج</a></Link>
                </nav>
              </div>
              
              <Link href="/login">
                <a className="user-toggle d-block font-size-20 public">
                  <i className="icon-user"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}