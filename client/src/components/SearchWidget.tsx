// Search Widget Component - مطابق للأصل
import { useEffect, useRef } from 'react';

export default function SearchWidget() {
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // تحميل Typed.js للبحث المتحرك
    const script = document.createElement('script');
    script.src = '/src/assets/js/typed.min.js';
    script.onload = () => {
      if (window.Typed && labelRef.current) {
        new window.Typed(labelRef.current, {
          strings: [
            'ابحث عن فيلم او مسلسل او لعبة او برنامج ...',
            'مثال: الجزيرة',
            'مثال آخر: اسم مؤقت',
            'مثال: FIFA',
            'ابحث هنا في يمن فليكس باسم الفيلم او المسلسل او اي لعبة او برنامج ترغب به'
          ],
          typeSpeed: 30,
          backSpeed: 20,
          backDelay: 2000,
          startDelay: 500,
          loop: true
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="widget-2 widget mb-4">
      <div className="widget-body row">
        <div className="col-lg-8 mx-auto">
          <form className="form d-flex no-gutters mb-20" action="/search" method="get">
            <div className="col pl-12">
              <input type="text" className="form-control" id="widget2SearchInput" name="q" />
              <label htmlFor="widget2SearchInput" className="m-0">
                <span className="label" ref={labelRef}></span>
              </label>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-orange">بحث</button>
            </div>
          </form>
          
          <div className="main-categories-list">
            <div className="row">
              <div className="col-lg col-4">
                <a href="/movies" className="item d-block text-center text-white py-3 h-100">
                  <div className="icn"><i className="icon-video-camera"></i></div>
                  <div className="font-size-16">أفلام</div>
                </a>
              </div>
              <div className="col-lg col-4">
                <a href="/series" className="item d-block text-center text-white py-3 h-100">
                  <div className="icn"><i className="icon-monitor"></i></div>
                  <div className="font-size-16">مسلسلات</div>
                </a>
              </div>
              <div className="col-lg col-4">
                <a href="/shows" className="item d-block text-center text-white py-3 h-100">
                  <div className="icn"><i className="icon-tv"></i></div>
                  <div className="font-size-16">تلفزيون</div>
                </a>
              </div>
              <div className="col-lg col-4">
                <a href="/mix" className="item d-block text-center text-white py-3 h-100">
                  <div className="icn"><i className="icon-mix"></i></div>
                  <div className="font-size-16">منوعات</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}