import { useEffect } from "react";
import logoWhite from "@/assets/images/logo-white.svg";

export default function Login() {
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
            <a href="#" className="mx-2"><i className="icon-facebook"></i></a>
            <a href="#" className="mx-2"><i className="icon-twitter"></i></a>
            <a href="#" className="mx-2"><i className="icon-instagram"></i></a>
          </nav>
        </div>
      </div>

      {/* site-container مطابق للأصل */}
      <div className="site-container">
        <div className="main-header-top"></div>
        
        {/* الهيدر الرئيسي - مطابق للأصل تماماً */}
        <header className="main-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <h2 className="main-logo m-0">
                <a href="/main" className="d-inline-flex">
                  <img src={logoWhite} className="img-fluid" alt="يمن فليكس" />
                </a>
              </h2>
            </div>
            <div className="col-auto menu-toggle-container">
              <a href="#" onClick={(e) => e.preventDefault()} className="menu-toggle d-flex align-items-center text-white">
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
                  <input type="text" id="headerSearchInput" name="q" />
                  <label htmlFor="headerSearchInput">ابحث عن فيلم او مسلسل ...</label>
                  <button type="submit"><i className="icon-search"></i></button>
                </form>
              </div>
            </div>
            <div className="col-auto mr-xl-3">
              <div className="main-categories list-inline-item m-0 d-none d-xl-block">
                <a href="/recent" className="modern-category">الأحدث</a>
                <a href="/mix" className="modern-category">منوعات</a>
                <a href="/shows" className="modern-category">تلفزيون</a>
                <a href="/series" className="modern-category">مسلسلات</a>
                <a href="/movies" className="modern-category">أفلام</a>
              </div>
            </div>
            <div className="col-auto">
              <div className="list-inline-item m-0">
                <div className="user-account">
                  <a href="/profile">
                    <i className="icon-account_circle font-size-30"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </header>

        {/* محتوى الصفحة */}
        <div className="main-content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                {/* شعار الموقع */}
                <div className="login-logo text-center mb-5">
                  <img src={logoWhite} alt="يمن فليكس" className="img-fluid mb-3" style={{maxWidth: '200px'}} />
                  <h2>الموقع اليمني الأول للأفلام والمسلسلات</h2>
                </div>

                {/* نموذج تسجيل الدخول */}
                <div className="login-form-container">
                  <div className="form-tabs text-center mb-4">
                    <button className="tab-btn active" data-tab="login">تسجيل الدخول</button>
                    <button className="tab-btn" data-tab="register">حساب جديد</button>
                  </div>

                  {/* تسجيل الدخول */}
                  <div className="tab-content active" id="login-tab">
                    <form className="login-form">
                      <div className="form-group">
                        <label>البريد الإلكتروني أو اسم المستخدم</label>
                        <input type="text" className="form-control" placeholder="أدخل بريدك الإلكتروني" />
                      </div>
                      <div className="form-group">
                        <label>كلمة المرور</label>
                        <input type="password" className="form-control" placeholder="أدخل كلمة المرور" />
                      </div>
                      <div className="form-options">
                        <label className="remember-me">
                          <input type="checkbox" /> تذكرني
                        </label>
                        <a href="/forgot-password" className="forgot-password">نسيت كلمة المرور؟</a>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">
                        تسجيل الدخول
                      </button>
                    </form>
                  </div>

                  {/* إنشاء حساب جديد */}
                  <div className="tab-content" id="register-tab">
                    <form className="register-form">
                      <div className="form-group">
                        <label>اسم المستخدم</label>
                        <input type="text" className="form-control" placeholder="اختر اسم مستخدم" />
                      </div>
                      <div className="form-group">
                        <label>البريد الإلكتروني</label>
                        <input type="email" className="form-control" placeholder="أدخل بريدك الإلكتروني" />
                      </div>
                      <div className="form-group">
                        <label>كلمة المرور</label>
                        <input type="password" className="form-control" placeholder="اختر كلمة مرور قوية" />
                      </div>
                      <div className="form-group">
                        <label>تأكيد كلمة المرور</label>
                        <input type="password" className="form-control" placeholder="أعد كتابة كلمة المرور" />
                      </div>
                      <div className="form-options">
                        <label className="terms-agree">
                          <input type="checkbox" /> أوافق على شروط الاستخدام وسياسة الخصوصية
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary btn-block">
                        إنشاء حساب
                      </button>
                    </form>
                  </div>

                  {/* روابط التواصل الاجتماعي */}
                  <div className="social-login text-center mt-4">
                    <p>أو سجل الدخول باستخدام</p>
                    <div className="social-buttons">
                      <button className="btn btn-facebook">
                        <i className="icon-facebook"></i> فيسبوك
                      </button>
                      <button className="btn btn-google">
                        <i className="icon-google"></i> جوجل
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الفوتر */}
        <footer className="main-footer">
          <div className="container">
            <div className="footer-content">
              <div className="row">
                <div className="col-md-6">
                  <div className="footer-links">
                    <a href="/about">حول الموقع</a>
                    <a href="/contact">اتصل بنا</a>
                    <a href="/privacy">سياسة الخصوصية</a>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="social-links">
                    <a href="#" className="social-link"><i className="icon-facebook"></i></a>
                    <a href="#" className="social-link"><i className="icon-twitter"></i></a>
                    <a href="#" className="social-link"><i className="icon-instagram"></i></a>
                    <a href="#" className="social-link"><i className="icon-youtube"></i></a>
                  </div>
                </div>
              </div>
              <div className="copyright text-center mt-3">
                <p>&copy; 2025 يمن فليكس. جميع الحقوق محفوظة.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}