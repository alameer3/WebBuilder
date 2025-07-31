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

// بيانات الأفلام التجريبية
const sampleMovies: Movie[] = [
  {
    id: "1",
    title: "28 Years Later",
    description: "فيلم إثارة ورعب من إنتاج 2025",
    poster: "https://img.downet.net/thumb/178x260/uploads/Gn5bw.webp",
    year: 2025,
    genre: ["إثارة", "رعب"],
    rating: 7.1,
    quality: "WEB-DL"
  },
  {
    id: "2", 
    title: "The Life of Chuck",
    description: "فيلم فانتازيا ودراما من إنتاج 2025",
    poster: "https://img.downet.net/thumb/178x260/uploads/BV1RS.webp",
    year: 2025,
    genre: ["فانتازيا", "دراما"],
    rating: 7.7,
    quality: "WEB-DL"
  }
];

export default function Movies() {
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

      {/* طبقة التراكب للموقع */}
      <span className="site-overlay"></span>

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
            <a href="/" className="home mx-2"><i className="icon-home"></i></a>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/notifications" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
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

      {/* الحاوي الرئيسي للموقع */}
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
                  <a className="user-toggle d-block font-size-20 private hide" href="#" onClick={(e) => e.preventDefault()}>
                    <i className="icon-user"></i>
                  </a>
                  <div className="login-panel private hide">
                    <div className="user-logged d-flex align-items-center no-gutters p-3">
                      <div className="col-auto">
                        <img src={defaultAvatar} className="img-fluid rounded-circle" alt="user avatar" />
                      </div>
                      <div className="col pr-2">
                        <div className="username font-size-14 font-weight-normal text-truncate text-white mb-0 mr-1" style={{width: '120px', height: '22px'}}>
                          مستخدم
                        </div>
                      </div>
                    </div>
                    <nav className="list">
                      <a href="/profile">تعديل البروفايل</a>
                      <a href="/favorites">قائمتي المفضلة</a>
                      <span className="line"></span>
                      <a href="/logout">تسجيل خروج</a>
                    </nav>
                  </div>
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
          <div className="archive-cover mb-4" style={{backgroundImage: "url('https://img.downet.net/uploads/xVeQg.webp')"}}>
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
                              <select className="form-control" name="section">
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
                              <select className="form-control" name="category">
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
                          <div className="col-lg-3 col-md-6 col-12">
                            <div className="form-group mb-12 mb-lg-0">
                              <select className="form-control" name="year">
                                <option value="0">سنة الإنتاج</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                                <option value="2012">2012</option>
                                <option value="2011">2011</option>
                                <option value="2010">2010</option>
                                <option value="2009">2009</option>
                                <option value="2008">2008</option>
                                <option value="2007">2007</option>
                                <option value="2006">2006</option>
                                <option value="2005">2005</option>
                                <option value="2004">2004</option>
                                <option value="2003">2003</option>
                                <option value="2002">2002</option>
                                <option value="2001">2001</option>
                                <option value="2000">2000</option>
                                <option value="1999">1999</option>
                                <option value="1998">1998</option>
                                <option value="1997">1997</option>
                                <option value="1996">1996</option>
                                <option value="1995">1995</option>
                                <option value="1994">1994</option>
                                <option value="1993">1993</option>
                                <option value="1992">1992</option>
                                <option value="1991">1991</option>
                                <option value="1990">1990</option>
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
            {/* شبكة الأفلام */}
            <div className="widget" data-grid="6">
              <div className="widget-body row flex-wrap">
                {sampleMovies.map((movie) => (
                  <div key={movie.id} className="col-lg-2 col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-1">
                      <div className="labels d-flex">
                        <span className="label rating">
                          <i className="icon-star mr-2"></i>
                          {movie.rating}
                        </span>
                        <span className="ml-auto"></span>
                        <span className="label quality">{movie.quality}</span>
                      </div>
                      <div className="entry-image">
                        <a href={`/movie/${movie.id}`} className="box">
                          <picture>
                            <img 
                              src={movie.poster} 
                              className="img-fluid w-100 lazy" 
                              alt={movie.title}
                            />
                          </picture>
                        </a>
                      </div>
                      <div className="entry-body px-3 pb-3 text-center">
                        <div className="actions d-flex justify-content-center">
                          <a href={`/movie/${movie.id}`} className="icn play">
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
                          <a href={`/movie/${movie.id}`} className="text-white">
                            {movie.title}
                          </a>
                        </h3>
                        <div className="font-size-16 d-flex align-items-center mt-2" style={{height: '14px', overflow:'hidden'}}>
                          <span className="badge badge-pill badge-secondary ml-1">{movie.year}</span>
                          {Array.isArray(movie.genre) ? movie.genre.map((g, index) => (
                            <span key={index} className="badge badge-pill badge-light ml-1">{g}</span>
                          )) : (
                            <span className="badge badge-pill badge-light ml-1">{movie.genre}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* تكرار البطاقات لملء الشبكة */}
                {Array.from({length: 28}, (_, i) => (
                  <div key={`extra-${i}`} className="col-lg-auto col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-1">
                      <div className="labels d-flex">
                        <span className="label rating">
                          <i className="icon-star mr-2"></i>
                          {(Math.random() * 3 + 5).toFixed(1)}
                        </span>
                        <span className="ml-auto"></span>
                        <span className="label quality">HD</span>
                      </div>
                      <div className="entry-image">
                        <a href={`/movie/sample-${i + 3}`} className="box">
                          <picture>
                            <img 
                              src="/src/assets/images/default.jpg" 
                              className="img-fluid w-100 lazy" 
                              alt={`فيلم ${i + 3}`}
                            />
                          </picture>
                        </a>
                      </div>
                      <div className="entry-body px-3 pb-3 text-center">
                        <div className="actions d-flex justify-content-center">
                          <a href={`/movie/sample-${i + 3}`} className="icn play">
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
                          <a href={`/movie/sample-${i + 3}`} className="text-white">
                            فيلم تجريبي {i + 3}
                          </a>
                        </h3>
                        <div className="font-size-16 d-flex align-items-center mt-2" style={{height: '14px', overflow:'hidden'}}>
                          <span className="badge badge-pill badge-secondary ml-1">2024</span>
                          <span className="badge badge-pill badge-light ml-1">دراما</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* التنقل بين الصفحات - مطابق للأصل */}
            <nav className="archive-navigation mt-4">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <a href="?page=1" className="pagination-link">1</a>
                  <a href="?page=2" className="pagination-link">2</a>
                  <a href="?page=3" className="pagination-link">3</a>
                  <a href="?page=4" className="pagination-link">4</a>
                  <a href="?page=5" className="pagination-link">5</a>
                  <a href="?page=6" className="pagination-link">6</a>
                  <a href="?page=7" className="pagination-link">7</a>
                  <a href="?page=8" className="pagination-link">8</a>
                  <span>...</span>
                  <a href="?page=316" className="pagination-link">316</a>
                  <a href="?page=317" className="pagination-link">317</a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer py-5">
        <nav className="social d-flex justify-content-center">
          <a href="/" className="home mx-2"><i className="icon-home"></i></a>
          <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
          <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
          <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
          <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
          <a href="/notifications" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
          <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
        </nav>

        <nav className="links d-flex justify-content-center mt-3">
          <a href="/" className="mx-2">يمن فليكس</a>
          <a href="/old" target="_blank" className="mx-2">الموقع القديم</a>
          <a href="/dmca" className="mx-2">DMCA</a>
          <a href="/ad-policy" className="mx-2">AD-P</a>
          <a href="#" target="_blank" className="mx-2">يمن فليكس نيوز</a>
          <a href="#" target="_blank" className="mx-2">شبكة يمن فليكس</a>
        </nav>

        <p className="copyright mb-0 font-size-12 text-center mt-3">
          جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
        </p>
      </footer>
    </>
  );
}