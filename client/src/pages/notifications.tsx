import { useEffect } from "react";
import logoWhite from "@/assets/images/logo-white.svg";

// بيانات الإشعارات النموذجية
const notifications = [
  {
    id: 1,
    title: "فيلم جديد أُضيف",
    message: "تم إضافة فيلم 'الأكشن الجديد' إلى مجموعة الأفلام الحديثة",
    type: "new_content",
    date: "منذ ساعتين",
    read: false
  },
  {
    id: 2,
    title: "حلقة جديدة متاحة",
    message: "الحلقة 15 من مسلسل 'الدراما المشوقة' متاحة الآن للمشاهدة",
    type: "episode",
    date: "منذ 4 ساعات",
    read: false
  },
  {
    id: 3,
    title: "تحديث الموقع",
    message: "تم تحديث واجهة الموقع لتحسين تجربة المشاهدة",
    type: "update",
    date: "أمس",
    read: true
  },
  {
    id: 4,
    title: "عرض خاص",
    message: "عرض خاص على الأفلام الكلاسيكية - شاهد الآن مجاناً",
    type: "promotion",
    date: "منذ يومين",
    read: true
  },
  {
    id: 5,
    title: "صيانة مجدولة",
    message: "سيكون الموقع تحت الصيانة غداً من الساعة 2:00 إلى 4:00 صباحاً",
    type: "maintenance",
    date: "منذ 3 أيام",
    read: true
  }
];

export default function Notifications() {
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_content': return 'icon-video-camera';
      case 'episode': return 'icon-monitor';
      case 'update': return 'icon-refresh';
      case 'promotion': return 'icon-tag';
      case 'maintenance': return 'icon-tools';
      default: return 'icon-bell';
    }
  };

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
        <input type="hidden" id="page_app" value="notifications" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />

        {/* صفحة الإشعارات */}
        <div className="page page-notifications">
          <div className="notifications-cover mb-4" style={{backgroundImage: "url('/assets/images/site-new.webp')"}}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="notifications-header">
                    <h1 className="title">الإشعارات</h1>
                    <p className="description">آخر الأخبار والتحديثات من يمن فليكس</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="notifications-content">
              {/* أزرار التحكم */}
              <div className="notifications-controls mb-4">
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-primary">تحديد الكل كمقروء</button>
                  </div>
                  <div className="col-md-6 text-right">
                    <div className="notifications-filter">
                      <select className="form-control">
                        <option value="">جميع الإشعارات</option>
                        <option value="unread">غير المقروءة</option>
                        <option value="new_content">محتوى جديد</option>
                        <option value="updates">التحديثات</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* قائمة الإشعارات */}
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
                    <div className="notification-icon">
                      <i className={getNotificationIcon(notification.type)}></i>
                    </div>
                    <div className="notification-content">
                      <div className="notification-header">
                        <h4 className="notification-title">{notification.title}</h4>
                        <span className="notification-date">{notification.date}</span>
                      </div>
                      <p className="notification-message">{notification.message}</p>
                    </div>
                    <div className="notification-actions">
                      {!notification.read && (
                        <button className="btn btn-sm btn-outline">تحديد كمقروء</button>
                      )}
                      <button className="btn btn-sm btn-text">حذف</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* التنقل بين الصفحات */}
              <div className="pagination-wrap mt-5">
                <nav className="pagination">
                  <ul className="page-numbers d-flex justify-content-center">
                    <li><button type="button" className="page-numbers current btn-unstyled" onClick={() => console.log('Page 1')}>1</button></li>
                    <li><a href="/notifications?page=2" className="page-numbers">2</a></li>
                    <li><a href="/notifications?page=3" className="page-numbers">3</a></li>
                    <li><span className="page-numbers dots">…</span></li>
                    <li><a href="/notifications?page=10" className="page-numbers">10</a></li>
                    <li><a href="/notifications?page=2" className="next page-numbers">التالي ›</a></li>
                  </ul>
                </nav>
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