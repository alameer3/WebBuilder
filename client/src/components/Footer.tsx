// Footer Component - مطابق للأصل
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="site-footer bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">يمن فليكس</h5>
            <p className="text-muted">
              موقع يمن فليكس لمشاهدة الأفلام والمسلسلات العربية والأجنبية بجودة عالية
            </p>
            <div className="social-links">
              <a href="#" className="text-white me-3" target="_blank">
                <i className="icon-facebook"></i>
              </a>
              <a href="#" className="text-white me-3" target="_blank">
                <i className="icon-youtube"></i>
              </a>
              <a href="#" className="text-white" target="_blank">
                <i className="icon-twitter"></i>
              </a>
            </div>
          </div>
          
          <div className="col-md-2 mb-4">
            <h6 className="mb-3">الأقسام</h6>
            <ul className="list-unstyled">
              <li><Link href="/movies"><a className="text-muted">أفلام</a></Link></li>
              <li><Link href="/series"><a className="text-muted">مسلسلات</a></Link></li>
              <li><Link href="/shows"><a className="text-muted">تلفزيون</a></Link></li>
              <li><Link href="/mix"><a className="text-muted">منوعات</a></Link></li>
            </ul>
          </div>
          
          <div className="col-md-2 mb-4">
            <h6 className="mb-3">روابط مفيدة</h6>
            <ul className="list-unstyled">
              <li><Link href="/recent"><a className="text-muted">أضيف حديثا</a></Link></li>
              <li><Link href="/favorites"><a className="text-muted">المفضلة</a></Link></li>
              <li><Link href="/profile"><a className="text-muted">البروفايل</a></Link></li>
            </ul>
          </div>
          
          <div className="col-md-2 mb-4">
            <h6 className="mb-3">المساعدة</h6>
            <ul className="list-unstyled">
              <li><Link href="/contactus"><a className="text-muted">اتصل بنا</a></Link></li>
              <li><Link href="/dmca"><a className="text-muted">DMCA</a></Link></li>
              <li><Link href="/ad-policy"><a className="text-muted">سياسة الإعلانات</a></Link></li>
            </ul>
          </div>
          
          <div className="col-md-2 mb-4">
            <h6 className="mb-3">حسابي</h6>
            <ul className="list-unstyled">
              <li><Link href="/login"><a className="text-muted">تسجيل دخول</a></Link></li>
              <li><Link href="/profile"><a className="text-muted">إنشاء حساب</a></Link></li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-muted">
              &copy; 2024 يمن فليكس. جميع الحقوق محفوظة.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0 text-muted">
              Made with ❤️ in Yemen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}