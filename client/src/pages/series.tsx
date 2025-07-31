import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useEffect } from "react";

// استيراد ملفات CSS المطلوبة
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/yemen-flix.css';

// استيراد الصور والأصول المطلوبة
import logoWhite from "../assets/images/logo-white.svg";
import defaultAvatar from "../assets/images/default.jpg";

interface Movie {
  id: string;
  title: string;
  description: string;
  poster?: string;
  year?: number;
  genre?: string | string[];
  rating?: number;
  category?: string;
  quality?: string;
}

export default function Series() {
  const { data: series, isLoading } = useQuery<Movie[]>({
    queryKey: ['/api/movies'],
    // فلترة المسلسلات فقط
    select: (data) => data?.filter(item => item.category === 'series') || []
  });

  useEffect(() => {
    // إضافة classes للجسم مطابقة للأصل
    document.body.className = "header-fixed header-pages pace-done";
    
    // تطبيق JavaScript للتفاعلات
    const handleMenuToggle = () => {
      document.body.classList.toggle('main-menu-active');
    };

    const handleSearchToggle = () => {
      document.body.classList.toggle('search-active');
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.body.classList.remove('main-menu-active', 'search-active');
      }
    };

    // إضافة مستمعي الأحداث
    const menuToggle = document.querySelector('.menu-toggle');
    const searchToggle = document.querySelector('.search-toggle');
    
    menuToggle?.addEventListener('click', handleMenuToggle);
    searchToggle?.addEventListener('click', handleSearchToggle);
    document.addEventListener('keydown', handleEscape);

    return () => {
      menuToggle?.removeEventListener('click', handleMenuToggle);
      searchToggle?.removeEventListener('click', handleSearchToggle);
      document.removeEventListener('keydown', handleEscape);
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
                <span className="icn"></span>
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
            <div className="col-auto recently-container">
              <a href="/recent" className="btn-recently">
                <i className="icon-plus2 ml-2"></i>
                <span>أضيف حديثا</span>
              </a>
            </div>
            <div className="col-auto user-profile-container">
              <div className="user-panel">
                <a className="user-toggle d-block font-size-20 public" href="/login">
                  <i className="icon-user"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-header-height"></div>
      
      {/* Hidden inputs مطابقة للأصل */}
      <input type="hidden" id="page_app" value="series" className="not-empty" />
      <input type="hidden" id="page_id" value="0" className="not-empty" />

      {/* صفحة الأرشيف - مطابقة للأصل */}
      <div className="page page-archive">
        {/* غطاء صفحة الأرشيف مع الخلفية */}
        <div className="archive-cover mb-4" style={{backgroundImage: "url('/client/src/assets/images/home-bg.webp')"}}>
          <div className="container">
            <div className="row pb-3">
              <div className="col-12 mt-auto">
                <div className="row">
                  <div className="col-md-auto col-12 mb-12 mb-md-0">
                    <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                      <i className="icn icon-monitor ml-4"></i>
                      <h1 className="name font-size-34 font-weight-bold mb-0">مسلسلات</h1>
                    </div>
                  </div>
                  <div className="col-md">
                    <form id="filter" method="get">
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12">
                            <select className="form-control select2" name="section">
                              <option value="0">القسم</option>
                              <option value="29">عربي</option>
                              <option value="30">اجنبي</option>
                              <option value="31">هندي</option>
                              <option value="32">تركي</option>
                              <option value="33">اسيوي</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12 mb-lg-0">
                            <select className="form-control select2" name="category">
                              <option value="0">التصنيف</option>
                              <option value="87">رمضان</option>
                              <option value="18">اكشن</option>
                              <option value="71">مدبلج</option>
                              <option value="72">NETFLIX</option>
                              <option value="20">كوميدي</option>
                              <option value="35">اثارة</option>
                              <option value="34">غموض</option>
                              <option value="33">عائلي</option>
                              <option value="27">رومانسي</option>
                              <option value="23">دراما</option>
                              <option value="22">رعب</option>
                              <option value="21">جريمة</option>
                              <option value="19">مغامرة</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12 offset-lg-3">
                          <div className="form-group mb-0">
                            <select className="form-control select2" name="rating">
                              <option value="0">التقييم</option>
                              <option value="1">+1</option>
                              <option value="2">+2</option>
                              <option value="3">+3</option>
                              <option value="4">+4</option>
                              <option value="5">+5</option>
                              <option value="6">+6</option>
                              <option value="7">+7</option>
                              <option value="8">+8</option>
                              <option value="9">+9</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12 mb-lg-0">
                            <select className="form-control select2" name="year">
                              <option value="0">سنة الإنتاج</option>
                              <option>2045</option>
                              <option>2025</option>
                              <option>2024</option>
                              <option>2023</option>
                              <option>2022</option>
                              <option>2021</option>
                              <option>2020</option>
                              <option>2019</option>
                              <option>2018</option>
                              <option>2017</option>
                              <option>2016</option>
                              <option>2015</option>
                              <option>2014</option>
                              <option>2013</option>
                              <option>2012</option>
                              <option>2011</option>
                              <option>2010</option>
                              <option>2009</option>
                              <option>2008</option>
                              <option>2007</option>
                              <option>2006</option>
                              <option>2005</option>
                              <option>2004</option>
                              <option>2003</option>
                              <option>2002</option>
                              <option>2001</option>
                              <option>2000</option>
                              <option>1999</option>
                              <option>1998</option>
                              <option>1997</option>
                              <option>1996</option>
                              <option>1995</option>
                              <option>1994</option>
                              <option>1993</option>
                              <option>1992</option>
                              <option>1991</option>
                              <option>1990</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12 mb-lg-0">
                            <select className="form-control select2" name="language">
                              <option value="0">اللغة</option>
                              <option value="1">العربية</option>
                              <option value="2">الإنجليزية</option>
                              <option value="3">الهندية</option>
                              <option value="4">التركية</option>
                              <option value="5">الكورية</option>
                              <option value="6">اليابانية</option>
                              <option value="7">الصينية</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* محتوى المسلسلات */}
        <div className="container">
          <div className="widget" data-grid="6">
            <div className="widget-body row flex-wrap">
              {isLoading ? (
                // مؤشر التحميل
                <div className="col-12 text-center py-5">
                  <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                // شبكة المسلسلات - مطابقة للأصل تماماً
                series && series.length > 0 ? (
                  series.map((item) => (
                    <div key={item.id} className="col-lg-2 col-md-4 col-6 mb-12">
                      <div className="entry-box entry-box-1">
                        <div className="labels d-flex">
                          {item.rating && (
                            <span className="label rating">
                              <i className="icon-star mr-2"></i>{item.rating}
                            </span>
                          )}
                          <span className="ml-auto"></span>
                          <span className="label quality">{item.quality || 'WEB-DL'}</span>
                        </div>
                        <div className="entry-image">
                          <Link href={`/series/${item.id}`} className="box">
                            <picture>
                              <img 
                                src={item.poster || defaultAvatar} 
                                className="img-fluid w-100 lazy" 
                                alt={item.title}
                              />
                            </picture>
                          </Link>
                        </div>
                        <div className="entry-body px-3 pb-3 text-center">
                          <div className="actions d-flex justify-content-center">
                            <Link href={`/series/${item.id}`} className="icn play">
                              <i className="icon-play"></i>
                              <div>مشاهدة</div>
                            </Link>
                            <a href="#" onClick={(e) => e.preventDefault()} className="icn add-to-fav mr-4 private hide" data-type="movie" data-id={item.id}>
                              <i className="icon-plus"></i>
                              <i className="icon-check font-size-20"></i>
                              <div>قائمتي</div>
                            </a>
                          </div>
                          <div className="line my-3"></div>
                          <h3 className="entry-title font-size-14 m-0">
                            <Link href={`/movie/${item.id}`} className="text-white">{item.title}</Link>
                          </h3>
                          <div className="font-size-16 d-flex align-items-center mt-2" style={{height: '14px', overflow: 'hidden'}}>
                            {item.year && (
                              <span className="badge badge-pill badge-secondary ml-1">{item.year}</span>
                            )}
                            {Array.isArray(item.genre) ? 
                              item.genre.slice(0, 2).map((g, index) => (
                                <span key={index} className="badge badge-pill badge-light ml-1">{g}</span>
                              )) :
                              item.genre && (
                                <span className="badge badge-pill badge-light ml-1">{item.genre}</span>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-white font-size-18">لا توجد مسلسلات حالياً</p>
                  </div>
                )
              )}
            </div>
            
            {/* التنقل بين الصفحات - مطابق للأصل */}
            <div className="pagination-container mt-4">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <span className="page-link">السابق</span>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">1</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">2</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">التالي</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer py-5">
        <nav className="social d-flex justify-content-center">
          <a href="/" className="home mx-2"><i className="icon-home"></i></a>
          <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
          <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
          <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
          <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
        </nav>

        <nav className="links d-flex justify-content-center mt-3">
          <a href="/" className="mx-2">يمن فليكس</a>
          <a href="/old" target="_blank" className="mx-2">الموقع القديم</a>
          <a href="/dmca" className="mx-2">DMCA</a>
          <a href="/ad-policy" className="mx-2">AD-P</a>
        </nav>

        <p className="copyright mb-0 font-size-12 text-center mt-3">
          جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
        </p>
      </footer>
      </div>
    </>
  );
}