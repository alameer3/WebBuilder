import { useEffect } from "react";
import { useRoute } from "wouter";

// استيراد ملفات CSS المطلوبة
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/yemen-flix.css';

// استيراد الصور والأصول المطلوبة
import logoWhite from "../assets/images/logo-white.svg";
// سنستخدم روابط خارجية للأيقونات بدلاً من نسخها محلياً

// بيانات تجريبية للفيلم - مطابقة للأصل
const movieData = {
  id: "28-years-later",
  title: "28 Years Later",
  arabicTitle: "بعد 28 عاما",
  poster: "https://img.downet.net/thumb/260x380/uploads/Gn5bw.webp",
  backdrop: "https://img.downet.net/thumb/1920x600/uploads/Gn5bw.webp",
  rating: 7.1,
  imdbRating: "10 / 7.1",
  quality: "WEB-DL - 1080p",
  language: "الإنجليزية",
  subtitle: "العربية",
  country: "الولايات المتحدة الأمريكية",
  year: 2025,
  duration: "115 دقيقة",
  certification: "PG13 اشراف عائلي",
  office: "BOX OFFICE",
  genres: ["اثارة", "رعب"],
  description: "مشاهدة و تحميل فيلم 28 Years Later حيث يدور العمل حول بعد ثمانية وعشرين عامًا من هروب فيروس الغضب من مختبر للأسلحة البيولوجية، لا يزال البعض يخضع لحجر صحي قاسٍ، وقد وجدوا سبلًا للعيش وسط المصابين. تعيش إحدى هذه المجموعات على جزيرة صغيرة متصلة بالبر الرئيسي عبر جسر واحد مُحصّن جيدًا. عندما ينطلق أحد الأعضاء في مهمة إلى قلب البر الرئيسي المظلم، يكتشف أسرارًا وعجائب وأهوالًا حوّلت ليس المصابين فحسب، بل ناجين آخرين أيضًا.",
  trailer: "https://www.youtube.com/watch?v=mcvLKldPM08",
  cast: [
    { name: "Jodie Comer", image: "https://img.downet.net/thumb/54x54/uploads/HD9VV.jpeg" },
    { name: "Aaron Taylor-Johnson", image: "https://img.downet.net/thumb/54x54/uploads/Nf84R.jpg" },
    { name: "Ralph Fiennes", image: "https://img.downet.net/thumb/54x54/uploads/ZwiTY.jpeg" }
  ],
  gallery: [
    "https://img.downet.net/thumb/180x100/uploads/JeOy3.jpg",
    "https://img.downet.net/thumb/180x100/uploads/vud56.jpg",
    "https://img.downet.net/thumb/180x100/uploads/hG2yM.jpg",
    "https://img.downet.net/thumb/180x100/uploads/6Sfgr.jpg"
  ],
  likes: 2,
  dislikes: 0,
  addedDate: "الثلاثاء 29 07 2025 - 07:57 مساءاً"
};

// أفلام مشابهة
const relatedMovies = [
  { id: "1", title: "Escape the Field", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", rating: 4.9 },
  { id: "2", title: "Under the Amalfi Sun", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", rating: 5.5 },
  { id: "3", title: "Bloody Hell", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", rating: 6.2 },
  { id: "4", title: "الحدود", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", rating: 7.1 },
  { id: "5", title: "Iron Man 2", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", rating: 7.8 },
  { id: "6", title: "Mahaveeryar", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", rating: 6.5 }
];

export default function MovieDetails() {
  const [match, params] = useRoute("/movie/:id");

  useEffect(() => {
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

    const menuToggle = document.querySelector('.menu-toggle');
    const searchToggle = document.querySelector('.search-toggle');
    
    menuToggle?.addEventListener('click', handleMenuToggle);
    searchToggle?.addEventListener('click', handleSearchToggle);
    document.addEventListener('keydown', handleEscape);

    return () => {
      menuToggle?.removeEventListener('click', handleMenuToggle);
      searchToggle?.removeEventListener('click', handleSearchToggle);
      document.removeEventListener('keydown', handleEscape);
      document.body.className = "";
    };
  }, []);

  if (!match) return null;

  return (
    <>
      {/* Pace Loading Indicator */}
      <div className="pace pace-inactive">
        <div className="pace-progress" data-progress-text="100%" data-progress="99" style={{ transform: 'translate3d(100%, 0px, 0px)' }}>
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>

      {/* Site Overlay */}
      <span className="site-overlay"></span>

      {/* Main Menu */}
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
            <a href="https://www.facebook.com/yemenflix" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="https://www.facebook.com/groups/yemenflix" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="https://www.youtube.com/c/yemenflix" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="#" target="_blank" className="app-store mx-2"><i className="icon-app-store"></i></a>
            <a href="/contactus" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </div>
      </div>

      {/* Search Box */}
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

      {/* Site Container */}
      <div className="site-container">
        <div className="main-header-top"></div>
        
        {/* Header */}
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
                <button className="menu-toggle d-flex align-items-center text-white bg-transparent border-0">
                  <span className="icn">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <div className="text font-size-18 mr-3">الأقسام</div>
                </button>
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
                  <i className="icon-plus2 ml-2"></i><span>أضيف حديثا</span>
                </a>
              </div>
              <div className="col-auto user-profile-container">
                <div className="user-panel">
                  <a className="user-toggle d-block font-size-20 public" href="/login"><i className="icon-user"></i></a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-header-height"></div>
        
        {/* Hidden Inputs */}
        <input type="hidden" id="page_app" value="movies" className="not-empty" />
        <input type="hidden" id="page_id" value="9995" className="not-empty" />

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ backgroundColor: '#1c1c20' }}>
          <div className="container py-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="/"><i className="icon-home ml-2"></i> الرئيسية</a></li>
              <li className="breadcrumb-item"><a href="/movies"><i className="icon-video-camera ml-2"></i> أفلام</a></li>
            </ol>
          </div>
        </nav>

        {/* SVG Filter */}
        <svg style={{ opacity: 0, visibility: 'hidden', position: 'absolute', top: '-999px', right: '-999px' }}>
          <filter id="blur-effect-1">
            <feGaussianBlur stdDeviation="20"></feGaussianBlur>
          </filter>
        </svg>

        {/* Movie Page */}
        <div className="page page-movie page-film">
          {/* Movie Cover */}
          <div className="movie-cover mb-4 without-cover">
            <svg>
              <image x="0" y="0" filter="url(#blur-effect-1)" xlinkHref={movieData.backdrop}></image>
            </svg>
            <div className="container">
              <div className="row py-4">
                {/* Movie Poster */}
                <div className="col-lg-3 col-md-4 text-center mb-5 mb-md-0">
                  <a href={movieData.poster.replace('thumb/260x380/', '')} data-fancybox="">
                    <picture>
                      <img src={movieData.poster} className="img-fluid" alt={movieData.title} />
                    </picture>
                  </a>
                </div>

                {/* Movie Info */}
                <div className="col-lg-7 pr-lg-4 col-md-5 col-sm-8 mb-4 mb-sm-0 px-4 px-sm-0">
                  <h1 className="entry-title font-size-28 font-weight-bold text-white mb-0">{movieData.title}</h1>
                  
                  <div className="font-size-16 text-white mt-2 d-flex align-items-center">
                    <a href="https://www.themoviedb.org/movie/1100988-28-years-later" rel="nofollow" className="ml-2" target="_blank">
                      <span className="badge badge-pill badge-warning font-size-12">TMDB</span>
                    </a>
                    <a href="https://www.imdb.com/title/tt10548174" rel="nofollow" target="_blank">
                      <span className="badge badge-pill badge-warning font-size-12 mr-2">IMDB</span>
                    </a>
                    <span className="mx-2">{movieData.imdbRating}</span>
                    <i className="icon-star text-orange"></i>
                    <span className="badge badge-pill badge-info font-size-14 mr-3">{movieData.certification}</span>
                  </div>

                  <div className="font-size-16 text-white mt-2"><span>{movieData.office}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>اللغة : {movieData.language}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>الترجمة : {movieData.subtitle}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>جودة الفيلم : {movieData.quality}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>انتاج : {movieData.country}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>السنة : {movieData.year}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>مدة الفيلم : {movieData.duration}</span></div>

                  <div className="font-size-16 d-flex align-items-center mt-3">
                    {movieData.genres.map((genre, index) => (
                      <a key={index} href={`/movies?category=${genre}`} className="badge badge-pill badge-light ml-2">{genre}</a>
                    ))}
                  </div>

                  <div className="font-size-14 text-muted mt-3">
                    <span>تـ الإضافة : {movieData.addedDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="col-lg-2 col-md-3 col-sm-4 d-flex flex-column px-4 px-sm-0">
                  <a href={movieData.trailer} className="btn btn-light btn-pill d-flex align-items-center" data-fancybox="">
                    <span className="font-size-18 font-weight-medium">الاعلان</span>
                    <i className="icon-play2 font-size-20 mr-auto"></i>
                  </a>
                  
                  <a href="#downloads" className="btn btn-orange btn-pill d-flex align-items-center text-white mt-2">
                    <span className="font-size-18 font-weight-medium">مشاهدة</span>
                    <i className="icon-play2 font-size-20 mr-auto"></i>
                  </a>
                  
                  <a href="#downloads" className="btn btn-info btn-pill d-flex align-items-center text-white mt-2">
                    <span className="font-size-18 font-weight-medium">تحميل</span>
                    <i className="icon-download font-size-20 mr-auto"></i>
                  </a>

                  <div className="btn btn-share btn-pill d-none d-sm-flex align-items-center text-white hal-container mt-2">
                    <span className="font-size-18 font-weight-medium">شارك</span>
                    <i className="icon-share font-size-20 mr-auto"></i>
                    <div className="menu d-flex align-items-center share">
                      <button className="facebook ml-2 bg-transparent border-0"><i className="icon-facebook"></i></button>
                      <button className="twitter ml-2 bg-transparent border-0"><i className="icon-twitter"></i></button>
                      <button className="messenger ml-2 bg-transparent border-0"><i className="icon-messenger"></i></button>
                      <button className="whatsapp ml-2 bg-transparent border-0"><i className="icon-whatsapp"></i></button>
                    </div>
                  </div>

                  <button className="btn btn-favorite btn-pill d-flex align-items-center text-white mt-2 add-to-fav private hide bg-transparent border-0" data-type="movie" data-id="9995">
                    <span className="font-size-18 font-weight-medium">قائمتي</span>
                    <i className="icon-plus icon1 font-size-20 mr-auto"></i>
                    <i className="icon-check icon2 font-size-20 mr-auto"></i>
                  </button>

                  <div className="mt-auto pt-3">
                    <div className="movie-rating d-flex justify-content-center align-items-center">
                      <span className="text font-size-16 text-white d-none">ما رأيك في هذا الموضوع ؟</span>
                      <button className="like mx-1 bg-transparent border-0"><i className="icon-like"></i><span className="number">{movieData.likes}</span></button>
                      <button className="unlike mx-1 bg-transparent border-0"><i className="icon-like1"></i><span className="number">{movieData.dislikes}</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            {/* Movie Story */}
            <div className="widget widget-style-1 mb-5">
              <header className="widget-header border-0 mb-4">
                <div className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">قصة الفيلم</span>
                </div>
                <div className="header-decoration"></div>
              </header>
              <div className="widget-body">
                <h2>
                  <div className="text-white font-size-18" style={{ lineHeight: '1.7' }}>
                    فيلم {movieData.title}
                    <p>{movieData.description}</p>
                  </div>
                </h2>
                <div className="d-flex">
                  {movieData.gallery.map((image, index) => (
                    <a key={index} href={image.replace('thumb/180x100/', '')} data-fancybox="movie-gallery" className="ml-12">
                      <img src={image} className="img-fluid" alt={`${movieData.title} ${index + 1}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Cast */}
            <div className="widget widget-style-1 mb-5" data-grid="5">
              <header className="widget-header border-0 mb-4">
                <h3 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">فريق العمل</span>
                </h3>
                <div className="header-decoration"></div>
              </header>
              <div className="widget-body row">
                {movieData.cast.map((actor, index) => (
                  <div key={index} className="col-lg-auto col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-3 h-100">
                      <div className="box d-flex no-gutters align-items-center">
                        <div className="col-auto">
                          <img src={actor.image} className="img-fluid rounded-circle" alt={actor.name} />
                        </div>
                        <div className="col">
                          <div className="entry-title text-center">{actor.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Ratings */}
            <div className="widget widget-style-1 mb-5">
              <header className="widget-header border-0 mb-4">
                <h3 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">مشاهدة والتحميل</span>
                </h3>
                <div className="header-decoration"></div>
              </header>
              <div className="widget-body">
                <div className="d-flex justify-content-center">
                  <div className="rating-bars mx-3">
                    <div className="rating-label">75%</div>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="rating-bars mx-3">
                    <div className="rating-label">100%</div>
                    <div className="rating-bar">
                      <div className="rating-fill" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                  <a href="#downloads" className="btn btn-info btn-pill mx-2">
                    <i className="icon-play2 ml-2"></i>تحميل
                  </a>
                  <a href="#downloads" className="btn btn-orange btn-pill mx-2">
                    <i className="icon-download ml-2"></i>مشاهدة
                  </a>
                </div>
              </div>
            </div>

            {/* Related Movies */}
            <div className="widget widget-style-1 mb-5" data-grid="6">
              <header className="widget-header border-0 mb-4">
                <h3 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">شاهد المزيد</span>
                </h3>
                <div className="header-decoration"></div>
              </header>
              <div className="widget-body row">
                {relatedMovies.map((movie) => (
                  <div key={movie.id} className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                    <div className="entry-box entry-box-1">
                      <a href={`/movie/${movie.id}`}>
                        <div className="entry-image">
                          <div className="image" style={{ backgroundImage: `url("${movie.poster}")` }}></div>
                          <div className="entry-overlay">
                            <div className="overlay-content">
                              <div className="entry-rating">
                                <i className="icon-star"></i>
                                <span>{movie.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="entry-body px-3 pb-3 text-center">
                          <h3 className="entry-title font-size-14 m-0">
                            <span className="text-white">{movie.title}</span>
                          </h3>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="main-footer">
          <div className="container">
            <div className="widget-footer text-center border-top pt-4 mt-5">
              <nav className="footer-social d-flex justify-content-center mb-4">
                <a href="/" className="home mx-2" title="الرئيسية"><i className="icon-home"></i></a>
                <a href="https://www.facebook.com/yemenflix" target="_blank" className="facebook mx-2" title="فيسبوك"><i className="icon-facebook"></i></a>
                <a href="https://www.facebook.com/groups/yemenflix" target="_blank" className="facebook mx-2" title="مجموعة فيسبوك"><i className="icon-facebook"></i></a>
                <a href="#" target="_blank" className="app-store mx-2" title="التطبيق"><i className="icon-app-store"></i></a>
                <a href="https://www.youtube.com/c/yemenflix" target="_blank" className="youtube mx-2" title="يوتيوب"><i className="icon-youtube"></i></a>
                <a href="#" target="_blank" className="app-store mx-2" title="الإشعارات"><i className="icon-app-store"></i></a>
                <a href="/contactus" className="email mx-2" title="اتصل بنا"><i className="icon-email"></i></a>
              </nav>
              <div className="footer-links d-flex justify-content-center flex-wrap mb-3">
                <a href="/movies" className="mx-2">أفلام</a>
                <a href="/series" className="mx-2">مسلسلات</a>
                <a href="/shows" className="mx-2">تلفزيون</a>
                <a href="/mix" className="mx-2">منوعات</a>
                <a href="/recent" className="mx-2">أضيف حديثا</a>
                <a href="/profile" className="mx-2">البروفايل</a>
                <a href="/contactus" className="mx-2">اتصل بنا</a>
              </div>
              <div className="copyright">
                <p>جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}