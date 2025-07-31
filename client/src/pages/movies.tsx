import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useEffect } from "react";

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

export default function Movies() {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ['/api/movies'],
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
              <a href="/mix" className="item">
                <div className="icn ml-3"><i className="icon-mix"></i></div>
                <div className="text">منوعات</div>
              </a>
              <a href="/shows" className="item">
                <div className="icn ml-3"><i className="icon-tv"></i></div>
                <div className="text">تلفزيون</div>
              </a>
              <a href="/series" className="item">
                <div className="icn ml-3"><i className="icon-monitor"></i></div>
                <div className="text">مسلسلات</div>
              </a>
              <a href="/movies" className="item">
                <div className="icn ml-3"><i className="icon-video-camera"></i></div>
                <div className="text">أفلام</div>
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

      {/* صندوق البحث - مطابق للأصل */}
      <div className="search-box px-xl-5">
        <div className="container search-container">
          <form action="/search" className="search-form" method="get">
            <label htmlFor="searchBoxInput" className="d-flex align-items-center h-100 w-100 m-0">
              <button type="submit" className="px-3 ml-2 font-size-30"><i className="icon-search"></i></button>
              <input type="search" name="q" id="searchBoxInput" placeholder="ابحث هنا" />
            </label>
          </form>
          <div className="search-toggle"><i className="icon-arrow-back"></i></div>
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
      <input type="hidden" id="page_app" value="movies" className="not-empty" />
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
                      <i className="icn icon-video-camera ml-4"></i>
                      <h1 className="name font-size-34 font-weight-bold mb-0">أفلام</h1>
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
                              <option value="30">انمي</option>
                              <option value="18">اكشن</option>
                              <option value="71">مدبلج</option>
                              <option value="72">NETFLIX</option>
                              <option value="20">كوميدي</option>
                              <option value="35">اثارة</option>
                              <option value="34">غموض</option>
                              <option value="33">عائلي</option>
                              <option value="88">اطفال</option>
                              <option value="25">حربي</option>
                              <option value="32">رياضي</option>
                              <option value="89">قصير</option>
                              <option value="43">فانتازيا</option>
                              <option value="24">خيال علمي</option>
                              <option value="31">موسيقى</option>
                              <option value="29">سيرة ذاتية</option>
                              <option value="28">وثائقي</option>
                              <option value="27">رومانسي</option>
                              <option value="26">تاريخي</option>
                              <option value="23">دراما</option>
                              <option value="22">رعب</option>
                              <option value="21">جريمة</option>
                              <option value="19">مغامرة</option>
                              <option value="91">غربي</option>
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

        {/* محتوى الأفلام */}
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
                // شبكة الأفلام - مطابقة للأصل تماماً
                movies && movies.length > 0 ? (
                  movies.map((movie) => (
                    <div key={movie.id} className="col-lg-auto col-md-4 col-6 mb-12">
                      <div className="entry-box entry-box-1">
                        <div className="labels d-flex">
                          {movie.rating && (
                            <span className="label rating">
                              <i className="icon-star mr-2"></i>{movie.rating}
                            </span>
                          )}
                          <span className="ml-auto"></span>
                          <span className="label quality">{movie.quality || 'WEB-DL'}</span>
                        </div>
                        <div className="entry-image">
                          <Link href={`/movie/${movie.id}`} className="box">
                            <picture>
                              <img 
                                src={movie.poster || defaultAvatar} 
                                className="img-fluid w-100 lazy" 
                                alt={movie.title}
                              />
                            </picture>
                          </Link>
                        </div>
                        <div className="entry-body px-3 pb-3 text-center">
                          <div className="actions d-flex justify-content-center">
                            <Link href={`/movie/${movie.id}`} className="icn play">
                              <i className="icon-play"></i>
                              <div>مشاهدة</div>
                            </Link>
                            <a href="#" onClick={(e) => e.preventDefault()} className="icn add-to-fav mr-4 private hide" data-type="movie" data-id={movie.id}>
                              <i className="icon-plus"></i>
                              <i className="icon-check font-size-20"></i>
                              <div>قائمتي</div>
                            </a>
                          </div>
                          <div className="line my-3"></div>
                          <h3 className="entry-title font-size-14 m-0">
                            <Link href={`/movie/${movie.id}`} className="text-white">{movie.title}</Link>
                          </h3>
                          <div className="font-size-16 d-flex align-items-center mt-2" style={{height: '14px', overflow: 'hidden'}}>
                            {movie.year && (
                              <span className="badge badge-pill badge-secondary ml-1">{movie.year}</span>
                            )}
                            {Array.isArray(movie.genre) ? 
                              movie.genre.slice(0, 2).map((g, index) => (
                                <span key={index} className="badge badge-pill badge-light ml-1">{g}</span>
                              )) :
                              movie.genre && (
                                <span className="badge badge-pill badge-light ml-1">{movie.genre}</span>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-white font-size-18">لا توجد أفلام حالياً</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* التنقل بين الصفحات - مطابق للأصل تماماً */}
          <div className="d-none d-sm-block">
            <nav aria-label="Page navigation" className="mt-5">
              <ul className="pagination justify-content-center" role="navigation">
                <li className="page-item mx-1 disabled" aria-disabled="true" aria-label="« السابق">
                  <span className="page-link" aria-hidden="true">‹</span>
                </li>
                <li className="page-item mx-1 active" aria-current="page"><span className="page-link">1</span></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=2">2</a></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=3">3</a></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=4">4</a></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=5">5</a></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=6">6</a></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=7">7</a></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=8">8</a></li>
                <li className="page-item mx-1 disabled" aria-disabled="true"><span className="page-link">...</span></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=316">316</a></li>
                <li className="page-item mx-1"><a className="page-link" href="/movies?page=317">317</a></li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=2" rel="next" aria-label="التالي »">›</a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* التنقل للهواتف المحمولة */}
          <div className="d-block d-lg-none mt-5">
            <ul className="pagination d-flex justify-content-center" role="navigation">
              <li className="page-item disabled mx-2" aria-disabled="true">
                <span className="page-link">« السابق</span>
              </li>
              <li className="page-item mx-2">
                <a className="page-link" href="/movies?page=2" rel="next">التالي »</a>
              </li>
            </ul>
          </div>

          {/* العنصر المطلوب للـ JavaScript */}
          <div className="main-categories-list-end"></div>
          
          <div className="mt-5" style={{borderTop: '1px solid #27272c'}}></div>
        </div>
      </div>

      {/* الفوتر - مطابق للأصل تماماً */}
      <footer className="main-footer py-5">
        <nav className="social d-flex justify-content-center">
          <a href="/" target="" className="home mx-2"><i className="icon-home"></i></a>
          <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
          <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
          <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
          <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
          <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
          <a href="/contact" target="" className="email mx-2"><i className="icon-email"></i></a>
        </nav>

        <nav className="links d-flex justify-content-center mt-3">
          <a href="/" target="" className="mx-2">يمن فليكس</a>
          <a href="#" target="_blank" className="mx-2">الموقع القديم</a>
          <a href="#" target="" className="mx-2">DMCA</a>
          <a href="#" target="" className="mx-2">AD-P</a>
          <a href="#" target="_blank" className="mx-2">يمن فليكس نيوز</a>
          <a href="#" target="_blank" className="mx-2">شبكة يمن فليكس</a>
        </nav>

        <p className="copyright mb-0 font-size-12 text-center mt-3">جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025</p>
      </footer>
      
      </div> {/* إغلاق site-container */}
    </>
  );
}