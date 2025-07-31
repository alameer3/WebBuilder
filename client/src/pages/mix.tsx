import { useEffect } from "react";
import logoWhite from "@/assets/images/logo-white.svg";

export default function Mix() {
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
        </div>
      </div>

      {/* مربع البحث */}
      <div className="search-box">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-lg-6 col-md-8 col-10">
              <form className="search-form">
                <div className="input-group">
                  <input type="text" className="form-control search-input" placeholder="ابحث عن فيلم، مسلسل أو برنامج..." />
                  <div className="input-group-append">
                    <button className="btn btn-search" type="submit">
                      <i className="icon-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
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
                      <a href="/mix" className="nav-link active">منوعات</a>
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
        <input type="hidden" id="page_app" value="mix" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />

        {/* صفحة الأرشيف - مطابقة للأصل */}
        <div className="page page-archive">
          <div className="archive-cover mb-4" style={{backgroundImage: "url('https://img.downet.net/uploads/I01d7.jpeg')"}}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-mix ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">منوعات</h1>
                      </div>
                    </div>
                    <div className="col-md">
                      <form id="filter" method="get">
                        <div className="row">
                          <div className="col-lg-3 col-md-6 col-12 offset-lg-9 offset-md-6">
                            <div className="form-group mb-12">
                              <select className="form-control" name="section">
                                <option value="0">الأقسام</option>
                                <option value="40">القران الكريم</option>
                                <option value="41">اسلاميات و اناشيد</option>
                                <option value="35">الكتب و الابحاث</option>
                                <option value="36">رياضة</option>
                                <option value="39">الصور و الخلفيات</option>
                                <option value="44">فيديو كليب</option>
                                <option value="38">موسيقى</option>
                                <option value="52">المسلسلات الاذاعية</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-3 col-6">
                            <div className="form-group mb-12 mb-lg-0">
                              <select className="form-control" name="category">
                                <option value="0">التصنيف</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-3 col-6">
                            <div className="form-group mb-12 mb-lg-0">
                              <select className="form-control" name="year">
                                <option value="0">سنة الإنتاج</option>
                                <option>2023</option>
                                <option>2022</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                                <option>2013</option>
                                <option>2012</option>
                                <option>2010</option>
                                <option>2008</option>
                                <option>2007</option>
                                <option>1990</option>
                                <option>1952</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-3 col-6">
                            <div className="form-group mb-0">
                              <select className="form-control" name="rating">
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
                          <div className="col-lg-3 col-6">
                            <div className="form-group mb-0">
                              <select className="form-control" name="quality">
                                <option value="0">الجودة</option>
                                <option>240p</option>
                                <option>360p</option>
                                <option>480p</option>
                                <option>720p</option>
                                <option>1080p</option>
                                <option>3D</option>
                                <option>4K</option>
                                <option>HD 720p</option>
                                <option>480p</option>
                                <option>360p</option>
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

          <div className="container">
            {/* شبكة المنوعات - مطابقة للأصل */}
            <div className="widget" data-grid="6">
              <div className="widget-body row flex-wrap">
                {Array.from({ length: 30 }).map((_, index) => (
                  <div key={index} className="col-lg-2 col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-1">
                      <div className="labels d-flex">
                        <span className="ml-auto"></span>
                      </div>
                      <div className="entry-image">
                        <a href={`/mix/${index + 1}`} className="box">
                          <picture>
                            <img 
                              src="/src/assets/images/default.jpg" 
                              className="img-fluid w-100 lazy" 
                              alt={`محتوى منوع ${index + 1}`}
                            />
                          </picture>
                        </a>
                      </div>
                      <div className="entry-body px-3 pb-3 text-center">
                        <div className="actions d-flex justify-content-center">
                          <a href={`/mix/${index + 1}`} className="icn play">
                            <i className="icon-play"></i>
                            <div>مشاهدة</div>
                          </a>
                          <a href="#" className="icn add-to-fav mr-4 private hide">
                            <i className="icon-plus"></i>
                            <i className="icon-check font-size-20"></i>
                            <div>قائمتي</div>
                          </a>
                        </div>
                        <div className="line my-3"></div>
                        <h3 className="entry-title font-size-14 m-0">
                          <a href={`/mix/${index + 1}`} className="text-white">
                            {index % 3 === 0 ? `فيديو كليب ${index + 1}` : 
                             index % 3 === 1 ? `موسيقى ${index + 1}` : 
                             `محتوى منوع ${index + 1}`}
                          </a>
                        </h3>
                        <div className="font-size-16 d-flex align-items-center mt-2" style={{height: '14px', overflow: 'hidden'}}>
                          <span className="badge badge-pill badge-secondary ml-1">202{Math.floor(Math.random() * 5)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                    <a className="page-link" href="#">4</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">5</a>
                  </li>
                  <li className="page-item">
                    <span className="page-link">...</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">20</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">التالي</a>
                  </li>
                </ul>
              </nav>
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