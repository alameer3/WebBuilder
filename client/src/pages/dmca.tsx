import { useEffect } from "react";
import logoWhite from "../assets/images/logo-white.svg";

declare global {
  interface Window {
    $: any;
  }
}

export default function DMCA() {
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
      <input type="hidden" name="page_app" value="dmca" />
      
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
                  <h1 className="page-title text-center mb-5">سياسة حقوق الطبع والنشر (DMCA)</h1>
                  
                  <div className="content-section">
                    <h2>مقدمة</h2>
                    <p>
                      يمن فليكس يحترم حقوق الملكية الفكرية للآخرين ويتوقع من مستخدميه أن يفعلوا الشيء نفسه. 
                      وفقاً لقانون حقوق الطبع والنشر للألفية الرقمية (DMCA)، نحن ملتزمون بالاستجابة لأي ادعاءات صحيحة 
                      بانتهاك حقوق الطبع والنشر.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2>إجراءات التبليغ عن انتهاك حقوق الطبع والنشر</h2>
                    <p>
                      إذا كنت تعتقد أن المحتوى الموجود على موقعنا ينتهك حقوق الطبع والنشر الخاصة بك، 
                      يرجى إرسال إشعار مكتوب يتضمن المعلومات التالية:
                    </p>
                    <ul>
                      <li>توقيع مالك حقوق الطبع والنشر أو شخص مخول للتصرف نيابة عنه</li>
                      <li>وصف دقيق للعمل المحمي بحقوق الطبع والنشر الذي تدعي انتهاكه</li>
                      <li>وصف المحتوى المنتهك وموقعه على الموقع</li>
                      <li>معلومات الاتصال الخاصة بك (العنوان، رقم الهاتف، البريد الإلكتروني)</li>
                      <li>بيان بأنك تعتقد بحسن نية أن الاستخدام غير مصرح به</li>
                      <li>بيان بأن المعلومات المقدمة دقيقة وأنك مالك حقوق الطبع والنشر</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>معلومات الاتصال للتبليغ</h2>
                    <p>يمكنك إرسال إشعار DMCA إلى:</p>
                    <div className="contact-info">
                      <p><strong>البريد الإلكتروني:</strong> dmca@yemenflix.com</p>
                      <p><strong>العنوان البريدي:</strong> يمن فليكس - قسم حقوق الطبع والنشر</p>
                    </div>
                  </div>

                  <div className="content-section">
                    <h2>إجراءات الإزالة</h2>
                    <p>
                      عند تلقي إشعار DMCA صحيح، سنقوم بما يلي:
                    </p>
                    <ul>
                      <li>مراجعة الإشعار للتأكد من اكتماله</li>
                      <li>إزالة المحتوى المشكوك فيه أو تعطيل الوصول إليه</li>
                      <li>إشعار المستخدم الذي نشر المحتوى</li>
                      <li>توثيق الإجراء المتخذ</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>إشعار الاعتراض (Counter-Notice)</h2>
                    <p>
                      إذا كنت تعتقد أن محتواك تم إزالته خطأً، يمكنك تقديم إشعار اعتراض يتضمن:
                    </p>
                    <ul>
                      <li>توقيعك الإلكتروني أو المادي</li>
                      <li>تحديد المحتوى المزال وموقعه السابق</li>
                      <li>بيان تحت طائلة عقوبة الحنث باليمين أن الإزالة كانت خطأً</li>
                      <li>موافقتك على الخضوع للولاية القضائية المحلية</li>
                    </ul>
                  </div>

                  <div className="content-section">
                    <h2>سياسة المخالفين المتكررين</h2>
                    <p>
                      يمن فليكس يحتفظ بالحق في إنهاء حسابات المستخدمين الذين يتم تحديدهم كمخالفين متكررين 
                      لحقوق الطبع والنشر، وفقاً لتقديرنا الخاص.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2>إخلاء المسؤولية</h2>
                    <p>
                      هذه السياسة لا تشكل استشارة قانونية. إذا كان لديك أسئلة حول حقوق الطبع والنشر 
                      أو قانون DMCA، يرجى استشارة محامٍ مؤهل.
                    </p>
                  </div>

                  <div className="content-section">
                    <h2>تحديث السياسة</h2>
                    <p>
                      نحتفظ بالحق في تحديث هذه السياسة في أي وقت. آخر تحديث: يناير 2025
                    </p>
                  </div>

                  <div className="text-center mt-5">
                    <a href="/contactus" className="btn btn-primary">
                      <i className="icon-email ml-2"></i>
                      اتصل بنا للاستفسارات
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
                <a href="/dmca">سياسة DMCA</a>
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