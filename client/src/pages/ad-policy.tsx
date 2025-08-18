import { useEffect } from 'react';
import AkwamHeader from '../components/AkwamHeader';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

export default function AdPolicy() {
  useEffect(() => {
    document.body.className = 'header-fixed body-main';
    document.title = 'سياسة الإعلانات - يمن فليكس';
    
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

        <div className="page page-ad-policy">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page-header mb-4">
                  <h1 className="page-title">سياسة الإعلانات</h1>
                  <p className="page-subtitle">معايير وقواعد الإعلانات على منصة يمن فليكس</p>
                </div>
                
                <div className="ad-policy-content bg-dark p-4 rounded">
                  <div className="section mb-4">
                    <h2 className="section-title mb-3">مقدمة</h2>
                    <p className="text-light">
                      تهدف هذه السياسة إلى توضيح المعايير والقواعد المتعلقة بالإعلانات على منصة يمن فليكس. 
                      نحن ملتزمون بتوفير تجربة مشاهدة آمنة وممتعة لجميع المستخدمين، مع ضمان جودة المحتوى الإعلاني المعروض.
                    </p>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">أنواع الإعلانات المسموحة</h2>
                    <ul className="policy-list text-light">
                      <li><strong>الإعلانات التجارية المشروعة:</strong> إعلانات المنتجات والخدمات القانونية</li>
                      <li><strong>الإعلانات الترفيهية:</strong> إعلانات الأفلام والمسلسلات والألعاب</li>
                      <li><strong>الإعلانات التعليمية:</strong> إعلانات الكورسات والبرامج التعليمية</li>
                      <li><strong>الإعلانات الثقافية:</strong> إعلانات الفعاليات والأنشطة الثقافية</li>
                    </ul>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">الإعلانات المحظورة</h2>
                    <div className="prohibited-ads bg-danger p-3 rounded mb-3">
                      <h4 className="text-light mb-3">نحظر بشكل قاطع الإعلانات التالية:</h4>
                      <ul className="text-light">
                        <li>المحتوى غير المناسب أو المسيء</li>
                        <li>المواد الإباحية أو الجنسية الصريحة</li>
                        <li>العنف المفرط أو المحتوى الدموي</li>
                        <li>الترويج للمخدرات أو المواد المحظورة</li>
                        <li>القمار والمراهنات</li>
                        <li>الاحتيال والخداع</li>
                        <li>خطاب الكراهية أو التمييز</li>
                        <li>المحتوى السياسي المثير للجدل</li>
                      </ul>
                    </div>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">معايير الجودة</h2>
                    <div className="quality-standards bg-secondary p-3 rounded">
                      <h4 className="text-light mb-3">يجب أن تلتزم جميع الإعلانات بالمعايير التالية:</h4>
                      <ul className="text-light">
                        <li><strong>الوضوح:</strong> يجب أن تكون الإعلانات واضحة ومفهومة</li>
                        <li><strong>الصدق:</strong> لا يُسمح بالإعلانات المضللة أو الكاذبة</li>
                        <li><strong>الجودة التقنية:</strong> دقة عالية ووضوح في الصورة والصوت</li>
                        <li><strong>اللغة المناسبة:</strong> استخدام لغة محترمة ومهذبة</li>
                        <li><strong>احترام الثقافة المحلية:</strong> مراعاة القيم والتقاليد</li>
                      </ul>
                    </div>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">أماكن عرض الإعلانات</h2>
                    <p className="text-light mb-3">يتم عرض الإعلانات في الأماكن التالية:</p>
                    <ul className="text-light">
                      <li>قبل بداية مقاطع الفيديو (Pre-roll)</li>
                      <li>أثناء مقاطع الفيديو (Mid-roll)</li>
                      <li>بعد انتهاء مقاطع الفيديو (Post-roll)</li>
                      <li>الأشرطة الجانبية على الصفحات</li>
                      <li>البانر العلوي والسفلي</li>
                    </ul>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">حقوق المستخدمين</h2>
                    <div className="user-rights bg-info p-3 rounded">
                      <h4 className="text-light mb-3">حقوق المستخدم فيما يتعلق بالإعلانات:</h4>
                      <ul className="text-light">
                        <li>الحق في تخطي الإعلانات بعد مدة معينة</li>
                        <li>الحق في الإبلاغ عن الإعلانات غير المناسبة</li>
                        <li>الحق في معرفة سبب عرض إعلان معين</li>
                        <li>الحق في التحكم في تفضيلات الإعلانات</li>
                      </ul>
                    </div>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">إجراءات المراقبة والمراجعة</h2>
                    <p className="text-light">
                      يتم مراجعة جميع الإعلانات من قبل فريق متخصص قبل عرضها على المنصة. 
                      نستخدم أيضاً تقنيات الذكاء الاصطناعي لمراقبة المحتوى الإعلاني والتأكد من التزامه بسياساتنا.
                    </p>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">الإبلاغ عن مخالفات</h2>
                    <div className="reporting bg-warning p-3 rounded">
                      <h4 className="text-dark mb-3">كيفية الإبلاغ عن إعلان مخالف:</h4>
                      <ol className="text-dark">
                        <li>انقر على زر "الإبلاغ عن هذا الإعلان"</li>
                        <li>اختر نوع المخالفة من القائمة</li>
                        <li>أضف تفاصيل إضافية إذا لزم الأمر</li>
                        <li>اضغط على "إرسال البلاغ"</li>
                      </ol>
                      <p className="text-dark mb-0">
                        <strong>البريد الإلكتروني للشكاوى:</strong> ads-report@yemen-flix.com
                      </p>
                    </div>
                  </div>

                  <div className="section mb-4">
                    <h2 className="section-title mb-3">العواقب والجزاءات</h2>
                    <p className="text-light">
                      في حالة مخالفة هذه السياسة، قد نتخذ الإجراءات التالية:
                    </p>
                    <ul className="text-light">
                      <li>إزالة الإعلان المخالف فوراً</li>
                      <li>تحذير المعلن</li>
                      <li>تعليق حساب المعلن مؤقتاً</li>
                      <li>إنهاء الشراكة الإعلانية نهائياً في الحالات الخطيرة</li>
                    </ul>
                  </div>

                  <div className="section">
                    <h2 className="section-title mb-3">تحديثات السياسة</h2>
                    <p className="text-light">
                      قد نقوم بتحديث هذه السياسة من وقت لآخر. سيتم إشعار المستخدمين والمعلنين بأي تغييرات جوهرية. 
                      آخر تحديث: يناير 2025
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