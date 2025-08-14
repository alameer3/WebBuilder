// Pace Loader Component - مطابق للأصل
import { useEffect } from 'react';

export default function PaceLoader() {
  useEffect(() => {
    // محاكاة إعداد Pace.js
    const paceElement = document.querySelector('.pace');
    if (paceElement) {
      // إخفاء لودر بعد تحميل الصفحة
      setTimeout(() => {
        paceElement.classList.add('pace-inactive');
      }, 1000);
    }
  }, []);

  return (
    <div className="pace pace-inactive">
      <div 
        className="pace-progress" 
        data-progress-text="100%" 
        data-progress="99" 
        style={{ transform: 'translate3d(100%, 0px, 0px)' }}
      >
        <div className="pace-progress-inner"></div>
      </div>
      <div className="pace-activity"></div>
    </div>
  );
}