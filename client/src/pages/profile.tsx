import { useEffect } from "react";
import logoWhite from "@/assets/images/logo-white.svg";

// بيانات المستخدم النموذجية
const userData = {
  name: "أحمد محمد",
  email: "ahmed@example.com",
  joinDate: "2023-10-15",
  favoriteMovies: 45,
  watchHistory: 128,
  recentActivity: [
    { id: 1, title: "فيلم الأكشن الجديد", type: "movie", date: "منذ ساعتين" },
    { id: 2, title: "مسلسل الدراما - الحلقة 12", type: "episode", date: "منذ 4 ساعات" },
    { id: 3, title: "برنامج كوميدي", type: "show", date: "أمس" },
  ]
};

export default function Profile() {
  useEffect(() => {
    // تغيير body class لتطابق الأصل
    document.body.className = 'header-fixed header-pages pace-done';
    
    // إضافة jQuery script للتفاعلات
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      // التفاعلات المطلوبة مطابقة للأصل
      const $ = (window as any).$;
      if ($) {
        $(document).ready(function(){
          // Menu toggle functions
          const handleMenuToggle = () => {
            $("body").removeClass("search-active").toggleClass("main-menu-active");
          };
          
          const handleSearchToggle = () => {
            $("body").removeClass("main-menu-active").toggleClass("search-active");
          };

          const handleEscape = (e: any) => {
            if (e.keyCode === 27) {
              $("body").removeClass("search-active main-menu-active");
            }
          };

          $(".menu-toggle").on("click", handleMenuToggle);
          $(".search-toggle").on("click", handleSearchToggle);
          $(document).on("keydown", handleEscape);
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
      {/* Pace Loading Indicator - مطابق للأصل */}
      <div className="pace pace-inactive">
        <div className="pace-progress" data-progress-text="100%" data-progress="99" style={{transform: 'translate3d(100%, 0px, 0px)'}}>
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>

      {/* طبقة التراكب للقائمة */}
      <div className="site-overlay"></div>

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
            <a href="#" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="#" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contactus" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* مربع البحث */}
      <div className="search-box px-xl-5">
        <div className="container search-container">
          <form className="search-form" method="get">
            <label className="d-flex align-items-center h-100 w-100 m-0">
              <button type="submit" className="px-3 ml-2 font-size-30"><i className="icon-search"></i></button>
              <input type="search" name="q" placeholder="ابحث هنا" />
            </label>
          </form>
        </div>
      </div>

      {/* موقع الحاوية */}
      <div className="site-container">
        {/* الهيدر الكامل - مطابق للأصل */}
        <header className="main-header">
          <div className="container">
            <div className="row align-items-center py-3">
              <div className="col-lg-2 col-md-3 col-6">
                <div className="logo">
                  <a href="/">
                    <img src={logoWhite} alt="يمن فليكس" className="img-fluid" />
                  </a>
                </div>
              </div>
              
              <div className="col-lg-8 col-md-6 d-none d-md-block">
                <nav className="main-nav">
                  <ul className="nav-list d-flex justify-content-center align-items-center">
                    <li className="nav-item">
                      <a href="/movies" className="nav-link">أفلام</a>
                    </li>
                    <li className="nav-item">
                      <a href="/series" className="nav-link">مسلسلات</a>
                    </li>
                    <li className="nav-item">
                      <a href="/shows" className="nav-link">تلفزيون</a>
                    </li>
                    <li className="nav-item">
                      <a href="/mix" className="nav-link">منوعات</a>
                    </li>
                  </ul>
                </nav>
              </div>
              
              <div className="col-lg-2 col-md-3 col-6">
                <div className="header-actions d-flex justify-content-end align-items-center">
                  <button className="search-toggle btn-icon mr-3">
                    <i className="icon-search"></i>
                  </button>
                  <button className="menu-toggle btn-icon d-md-none">
                    <div className="icn">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-header-height"></div>
        
        {/* Hidden inputs مطابقة للأصل */}
        <input type="hidden" id="page_app" value="profile" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />

        {/* صفحة الملف الشخصي */}
        <div className="page page-profile">
          <div className="profile-cover mb-4" style={{backgroundImage: "url('/assets/images/site-new.webp')"}}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      <img src="/assets/images/default.jpg" alt="الصورة الشخصية" className="avatar-image" />
                    </div>
                    <div className="profile-info">
                      <h1 className="profile-name">{userData.name}</h1>
                      <p className="profile-email">{userData.email}</p>
                      <p className="profile-join-date">عضو منذ {userData.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="profile-content">
              <div className="row">
                {/* إحصائيات المستخدم */}
                <div className="col-lg-4 mb-4">
                  <div className="profile-stats">
                    <h3 className="stats-title">الإحصائيات</h3>
                    <div className="stats-items">
                      <div className="stat-item">
                        <div className="stat-number">{userData.favoriteMovies}</div>
                        <div className="stat-label">فيلم في المفضلة</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-number">{userData.watchHistory}</div>
                        <div className="stat-label">عمل تمت مشاهدته</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* النشاط الأخير */}
                <div className="col-lg-8 mb-4">
                  <div className="profile-activity">
                    <h3 className="activity-title">النشاط الأخير</h3>
                    <div className="activity-list">
                      {userData.recentActivity.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-icon">
                            <i className={`icon-${activity.type === 'movie' ? 'video-camera' : activity.type === 'episode' ? 'monitor' : 'tv'}`}></i>
                          </div>
                          <div className="activity-content">
                            <h4 className="activity-title">{activity.title}</h4>
                            <p className="activity-date">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* إعدادات الحساب */}
              <div className="row mt-4">
                <div className="col-12">
                  <div className="profile-settings">
                    <h3 className="settings-title">إعدادات الحساب</h3>
                    <div className="settings-actions">
                      <a href="/favorite-movies" className="btn btn-primary">أفلامي المفضلة</a>
                      <a href="/recent" className="btn btn-secondary">المشاهدة الأخيرة</a>
                      <a href="/logout" className="btn btn-outline">تسجيل الخروج</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الفوتر الكامل - مطابق للأصل */}
        <footer className="main-footer">
          <div className="container">
            <div className="footer-content">
              <div className="row">
                <div className="col-md-8">
                  <div className="footer-links">
                    <a href="/dmca">DMCA</a>
                    <a href="/ad-policy">سياسة الإعلانات</a>
                    <a href="/contactus">اتصل بنا</a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="footer-social">
                    <a href="#" className="social-link facebook"><i className="icon-facebook"></i></a>
                    <a href="#" className="social-link youtube"><i className="icon-youtube"></i></a>
                    <a href="#" className="social-link app-store"><i className="icon-app-store"></i></a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom mt-3">
                <p className="copyright text-center">
                  جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* عنصر نهاية القائمة للـ JavaScript */}
        <div id="main-categories-list-end"></div>
      </div>
    </>
  );
}