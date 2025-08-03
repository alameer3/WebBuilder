import { Link } from 'wouter';

export default function MainMenu() {
  const closeMenu = () => {
    document.body.classList.remove('main-menu-active');
  };

  return (
    <div className="main-menu">
      <div className="d-flex flex-column">
        <div className="my-auto w-100">
          <div className="menu d-flex flex-wrap justify-content-center">
            <Link href="/movies" className="item" onClick={closeMenu}>
              <div className="icn ml-3"><i className="icon-video-camera"></i></div>
              <div className="text">أفلام</div>
            </Link>
            <Link href="/series" className="item" onClick={closeMenu}>
              <div className="icn ml-3"><i className="icon-monitor"></i></div>
              <div className="text">مسلسلات</div>
            </Link>
            <Link href="/shows" className="item" onClick={closeMenu}>
              <div className="icn ml-3"><i className="icon-tv"></i></div>
              <div className="text">تلفزيون</div>
            </Link>
            <Link href="/mix" className="item" onClick={closeMenu}>
              <div className="icn ml-3"><i className="icon-mix"></i></div>
              <div className="text">منوعات</div>
            </Link>
          </div>
        </div>
        <nav className="social d-flex justify-content-center">
          <Link href="/" className="home mx-2" onClick={closeMenu}>
            <i className="icon-home"></i>
          </Link>
          <a href="#" target="_blank" className="facebook mx-2">
            <i className="icon-facebook"></i>
          </a>
          <a href="#" target="_blank" className="facebook mx-2">
            <i className="icon-facebook"></i>
          </a>
          <a href="#" target="_blank" className="app-store mx-2">
            <i className="icon-app-store"></i>
          </a>
          <a href="#" target="_blank" className="youtube mx-2">
            <i className="icon-youtube"></i>
          </a>
          <Link href="/notifications" className="app-store mx-2" onClick={closeMenu}>
            <i className="icon-app-store"></i>
          </Link>
          <Link href="/contactus" className="email mx-2" onClick={closeMenu}>
            <i className="icon-email"></i>
          </Link>
        </nav>
      </div>
    </div>
  );
}