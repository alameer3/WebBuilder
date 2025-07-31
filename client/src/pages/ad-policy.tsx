import { useEffect } from "react";
import logoWhite from "../assets/images/logo-white.svg";

declare global {
  interface Window {
    $: any;
  }
}

export default function AdPolicy() {
  useEffect(() => {
    document.body.className = 'header-fixed header-pages pace-done';

    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      setTimeout(() => {
        if (window.$) {
          const $ = window.$;
          
          $(".menu-toggle").on("click", function(){
            $("body").removeClass("search-active").toggleClass("main-menu-active");
          });
          
          $(".site-overlay").on("click", function(){
            $("body").removeClass("main-menu-active search-active");
          });

          $(document).on("keydown", function(e: any){
            if (e.keyCode === 27) {
              $("body").removeClass("search-active main-menu-active");
            }
          });
        }
      }, 100);
    };
    document.head.appendChild(jqueryScript);

    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="site-container">
      <input type="hidden" name="page_app" value="ad-policy" />
      
      {/* Site Overlay */}
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
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="/contactus" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

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
              <a href="javascript:;" className="menu-toggle d-flex align-items-center text-white">
                <span className="icn">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <div className="text font-size-18 mr-3">الأقسام</div>
              </a>
            </div>
            <div className="ml-auto"></div>
            <div className="col-auto recently-container">
              <a href="/recent" className="btn-recently">
                <i className="icon-plus2 ml-2"></i>
                <span>أضيف حديثا</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="py-5">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="page-content">
                  <h1 className="page-title text-center mb-5">سياسة الإعلانات</h1>
                  
                  <div className="content-section">
                    <h2>مقدمة</h2>
                    <p>
                      في يمن فليكس، نسعى لتوفير تجربة مشاهدة ممتعة ومريحة لجميع مستخدمينا. 
                      هذه السياسة توضح كيفية تعاملنا مع الإعلانات على منصتنا وما يمكن أن تتوقعه كمستخدم.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2>أنواع الإعلانات</h2>
                    <h3>1. الإعلانات التجارية</h3>
                    <ul>
                      <li>إعلانات المنتجات والخدمات من شركاء موثوقين</li>
                      <li>إعلانات التطبيقات والألعاب</li>
                      <li>إعلانات العلامات التجارية المحلية والعالمية</li>
                    </ul>

                    <h3>2. الإعلانات الترويجية</h3>
                    <ul>
                      <li>ترويج المحتوى الجديد على المنصة</li>
                      <li>إعلانات الأفلام والمسلسلات القادمة</li>
                      <li>عروض وخصومات خاصة</li>
                    </ul>

                    <h3>3. الإعلانات التفاعلية</h3>
                    <ul>
                      <li>إعلانات يمكن التفاعل معها</li>
                      <li>استطلاعات رأي</li>
                      <li>مسابقات وجوائز</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>مواضع الإعلانات</h2>
                    <p>نحرص على وضع الإعلانات بطريقة لا تعطل تجربة المشاهدة:</p>
                    <ul>
                      <li><strong>قبل المحتوى:</strong> إعلانات قصيرة قبل بدء الفيلم أو الحلقة</li>
                      <li><strong>أثناء المحتوى:</strong> فواصل إعلانية في المحتوى الطويل</li>
                      <li><strong>الشريط الجانبي:</strong> إعلانات صغيرة على جانب الصفحة</li>
                      <li><strong>بين المحتوى:</strong> إعلانات بين قوائم الأفلام والمسلسلات</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>معايير الإعلانات</h2>
                    <p>نحن ملتزمون بعرض إعلانات عالية الجودة ومناسبة لجمهورنا:</p>
                    <ul>
                      <li>جميع الإعلانات تخضع للمراجعة قبل النشر</li>
                      <li>لا نعرض محتوى إعلاني مسيء أو غير مناسب</li>
                      <li>نرفض الإعلانات المضللة أو الاحتيالية</li>
                      <li>نضمن أن الإعلانات لا تحتوي على فيروسات أو برمجيات ضارة</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>حقوق المستخدم</h2>
                    <h3>يحق لك كمستخدم:</h3>
                    <ul>
                      <li>تخطي الإعلانات القابلة للتخطي بعد المدة المحددة</li>
                      <li>الإبلاغ عن الإعلانات غير المناسبة</li>
                      <li>طلب معلومات حول سبب عرض إعلان معين</li>
                      <li>تعديل تفضيلات الإعلانات (عند توفر هذه الميزة)</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>الإعلانات الشخصية</h2>
                    <p>
                      قد نستخدم معلومات عامة حول اهتماماتك لعرض إعلانات أكثر صلة بك، 
                      مع احترام كامل لخصوصيتك وعدم مشاركة معلوماتك الشخصية مع المعلنين.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2>شركاء الإعلانات</h2>
                    <p>نتعامل مع شبكات إعلانية موثوقة مثل:</p>
                    <ul>
                      <li>Google AdSense</li>
                      <li>شبكات إعلانية إقليمية</li>
                      <li>معلنين مباشرين بعد فحص دقيق</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>الإبلاغ عن المشاكل</h2>
                    <p>إذا واجهت أي مشكلة مع الإعلانات، يرجى الاتصال بنا وتضمين:</p>
                    <ul>
                      <li>وصف مفصل للمشكلة</li>
                      <li>لقطة شاشة للإعلان إن أمكن</li>
                      <li>نوع الجهاز والمتصفح المستخدم</li>
                      <li>وقت وتاريخ ظهور الإعلان</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>تحديثات السياسة</h2>
                    <p>
                      قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إشعار المستخدمين بأي تغييرات 
                      مهمة عبر الموقع أو البريد الإلكتروني.
                    </p>
                    <p><strong>آخر تحديث:</strong> يناير 2025</p>
                  </div>

                  <div className="text-center mt-5">
                    <a href="/contactus" className="btn btn-primary">
                      <i className="icon-email ml-2"></i>
                      أبلغ عن إعلان غير مناسب
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-logo">
                <img src={logoWhite} alt="يمن فليكس" className="footer-logo-img" />
              </div>
              <p className="footer-description">
                يمن فليكس - أفضل موقع لمشاهدة الأفلام والمسلسلات العربية والأجنبية
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-links">
                <a href="/movies">الأفلام</a>
                <a href="/series">المسلسلات</a>
                <a href="/shows">التلفزيون</a>
                <a href="/contactus">اتصل بنا</a>
                <a href="/ad-policy">سياسة الإعلانات</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 يمن فليكس. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}