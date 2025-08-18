import { useEffect } from 'react';
import AkwamHeader from '../components/AkwamHeader';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

export default function DMCA() {
  useEffect(() => {
    document.body.className = 'header-fixed body-main';
    document.title = 'حقوق الطبع والنشر - يمن فليكس';
    
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-dmca">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page-header mb-4">
                  <h1 className="page-title">حقوق الطبع والنشر - DMCA</h1>
                  <p className="page-subtitle">سياسة حقوق الطبع والنشر وقانون الألفية الرقمية</p>
                </div>
                
                <div className="dmca-content bg-dark p-4 rounded">
                  <div className="section mb-4">
                    <h2 className="section-title mb-3">احترام حقوق الطبع والنشر</h2>
                    <p className="text-light">
                      يمن فليكس يحترم حقوق الملكية الفكرية للآخرين ونتوقع من مستخدمينا القيام بنفس الشيء. 
                      وفقاً لقانون الألفية الرقمية لحقوق الطبع والنشر (DMCA)، سنقوم بالاستجابة للادعاءات الصحيحة 
                      بانتهاك حقوق الطبع والنشر المبلغ عنها لنا.
                    </p>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">إجراء إزالة المحتوى</h2>
                    <p className="text-light">
                      إذا كنت تعتقد أن المحتوى الموجود على موقعنا ينتهك حقوق الطبع والنشر الخاصة بك، 
                      يرجى إرسال إشعار مكتوب يتضمن المعلومات التالية:
                    </p>
                    <ul className="dmca-list text-light">
                      <li>تحديد العمل المحمي بحقوق الطبع والنشر الذي تدعي انتهاكه</li>
                      <li>تحديد المادة المنتهكة للحقوق وموقعها على الموقع</li>
                      <li>معلومات الاتصال الخاصة بك (الاسم، العنوان، الهاتف، البريد الإلكتروني)</li>
                      <li>بيان بأن لديك اعتقاد حسن النية بأن الاستخدام غير مصرح به</li>
                      <li>بيان بأن المعلومات في الإشعار دقيقة</li>
                      <li>توقيعك الإلكتروني أو المادي</li>
                    </ul>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">معلومات الاتصال</h2>
                    <div className="contact-info bg-secondary p-3 rounded">
                      <p className="text-light mb-2">
                        <strong>وكيل حقوق الطبع والنشر:</strong> فريق يمن فليكس القانوني
                      </p>
                      <p className="text-light mb-2">
                        <strong>البريد الإلكتروني:</strong> dmca@yemen-flix.com
                      </p>
                      <p className="text-light mb-0">
                        <strong>العنوان:</strong> Yemen Flix, Legal Department, Yemen
                      </p>
                    </div>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">إجراء الإشعار المضاد</h2>
                    <p className="text-light">
                      إذا كنت تعتقد أن المحتوى الخاص بك تم إزالته أو تعطيله بالخطأ، يمكنك تقديم إشعار مضاد. 
                      يجب أن يتضمن الإشعار المضاد معلومات محددة وفقاً لمتطلبات DMCA.
                    </p>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">سياسة المخالفين المتكررين</h2>
                    <p className="text-light">
                      وفقاً لـ DMCA، سنقوم بإنهاء حسابات المستخدمين الذين تم تحديدهم كمخالفين متكررين لحقوق الطبع والنشر.
                    </p>
                  </div>

                  <div className="section">
                    <h2 className="section-title mb-3">إخلاء المسؤولية</h2>
                    <p className="text-light">
                      يمن فليكس هو مجرد منصة لمشاركة المحتوى ولا يتحمل المسؤولية عن المحتوى الذي يتم تحميله من قبل المستخدمين. 
                      نحن نبذل قصارى جهدنا لضمان أن جميع المحتويات متاحة بشكل قانوني، ونقوم بإزالة أي محتوى ينتهك حقوق الطبع والنشر فور تلقي إشعار صحيح.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}