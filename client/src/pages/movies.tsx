import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useEffect } from "react";

// استيراد الصور والأصول المطلوبة
import logoWhite from "../assets/images/logo-white.svg";
import defaultAvatar from "../assets/images/default.jpg";

interface Movie {
  id: number;
  title: string;
  description: string;
  poster?: string;
  year?: number;
  genre?: string;
  rating?: number;
  category?: string;
}

export default function Movies() {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ['/api/movies'],
  });

  useEffect(() => {
    // تطبيق JavaScript للتفاعلات
    const handleMenuToggle = () => {
      document.body.classList.toggle('main-menu-open');
    };

    const handleSearchToggle = () => {
      document.body.classList.toggle('search-box-open');
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.body.classList.remove('main-menu-open', 'search-box-open');
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
    <div className="page page-archive" style={{direction: 'rtl', fontFamily: 'akoam'}}>
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
          <nav className="bottom-links text-center py-4">
            <a href="/main" className="text-white-50 mx-2">الرئيسية</a>
            <a href="/contactus" className="text-white-50 mx-2">اتصل بنا</a>
            <a href="/favorite/movies" className="text-white-50 mx-2">قائمتي المفضلة</a>
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

      {/* الحاوي الرئيسي - مطابق للأصل */}
      <div className="site-container">
        <div className="page-archive">
          <div className="main-header-top"></div>
          
          {/* الهيدر - مطابق للأصل تماماً */}
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
                      <button><i className="icon-search"></i></button>
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

          {/* غطاء صفحة الأرشيف - مطابق للأصل */}
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
                                <option value="18">اكشن</option>
                                <option value="20">كوميدي</option>
                                <option value="23">دراما</option>
                                <option value="22">رعب</option>
                                <option value="27">رومانسي</option>
                                <option value="24">خيال علمي</option>
                                <option value="35">اثارة</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 col-12 offset-lg-3">
                            <div className="form-group mb-0">
                              <select className="form-control select2" name="rating">
                                <option value="0">التقييم</option>
                                <option value="1">+1</option>
                                <option value="5">+5</option>
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

          {/* محتوى الأفلام - مطابق للأصل */}
          <div className="container">
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-white" role="status">
                  <span className="sr-only">جاري التحميل...</span>
                </div>
              </div>
            ) : (
              <div className="row">
                {movies && movies.length > 0 ? (
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
                          <span className="label quality">HD</span>
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
                            <a href="javascript:;" className="icn add-to-fav mr-4" data-type="movie" data-id={movie.id}>
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
                            {movie.genre && (
                              <span className="badge badge-pill badge-light ml-1">{movie.genre}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <p className="text-white">لا توجد أفلام حالياً</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* التنقل بين الصفحات - مطابق للأصل */}
          <div className="container mt-4">
            <nav aria-label="تنقل بين الصفحات">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="السابق">‹</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="التالي">›</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* الفوتر - مطابق للأصل */}
      <footer className="main-footer py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white-50 mb-0">جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025</p>
            </div>
            <div className="col-md-6 text-md-right">
              <div className="social-links">
                <a href="#" className="text-white-50 mx-2"><i className="icon-facebook"></i></a>
                <a href="#" className="text-white-50 mx-2"><i className="icon-twitter"></i></a>
                <a href="#" className="text-white-50 mx-2"><i className="icon-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}