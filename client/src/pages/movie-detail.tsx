import { useState } from 'react';
import { useParams } from 'wouter';

// Simple string assets for now
const logoWhite = "/assets/logo-white.svg";
const tmdbIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23f3951e'%3E%3Crect width='20' height='20'/%3E%3C/svg%3E";
const imdbIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23f3951e'%3E%3Ccircle cx='10' cy='10' r='10'/%3E%3C/svg%3E";

export default function MovieDetail() {
  const { id } = useParams();
  const [showReportModal, setShowReportModal] = useState(false);

  // بيانات الفيلم - مطابقة للتصميم الأصلي
  const movieData = {
    title: "28 Years Later",
    rating: "7.1",
    imdbRating: "10 / 7.1",
    year: 2025,
    duration: "115 دقيقة",
    language: "الإنجليزية", 
    subtitle: "العربية",
    quality: "WEB-DL - 1080p",
    country: "الولايات المتحدة الأمريكية",
    genres: ["اثارة", "رعب"],
    office: "BOX OFFICE",
    certification: "PG13 اشراف عائلي",
    backdrop: "https://img.downet.net/thumb/1920x600/uploads/Gn5bw.webp",
    poster: "https://img.downet.net/thumb/260x380/uploads/Gn5bw.webp",
    trailer: "https://www.youtube.com/watch?v=mcvLKldPM08",
    description: "فيلم 28 Years Later حيث يدور العمل حول بعد ثمانية وعشرين عامًا من هروب فيروس الغضب من مختبر للأسلحة البيولوجية، لا يزال البعض يخضع لحجر صحي قاسٍ، وقد وجدوا سبلًا للعيش وسط المصابين. تعيش إحدى هذه المجموعات على جزيرة صغيرة متصلة بالبر الرئيسي عبر جسر واحد مُحصّن جيدًا.",
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
    addedDate: "الثلاثاء 29 07 2025 - 07:57 مساءاً",
    servers: [
      { 
        name: "خادم المشاهدة 1080p", 
        url: "#", 
        type: "watch",
        size: "1.7 GB"
      },
      { 
        name: "خادم التحميل 720p", 
        url: "#", 
        type: "download",
        size: "908.5 MB"
      }
    ]
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
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
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
                <a href="javascript:;" className="menu-toggle d-flex align-items-center text-white">
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
        <input type="hidden" id="page_id" value={id} className="not-empty" />

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
                <div className="col-lg-3 col-md-4 text-center mb-5 mb-md-0">
                  <a href={movieData.poster} data-fancybox="">
                    <picture>
                      <img src={movieData.poster} className="img-fluid" alt={movieData.title} />
                    </picture>
                  </a>
                </div>
                <div className="col-lg-7 pr-lg-4 col-md-5 col-sm-8 mb-4 mb-sm-0 px-4 px-sm-0">
                  <h1 className="entry-title font-size-28 font-weight-bold text-white mb-0">{movieData.title}</h1>
                  <div className="font-size-16 text-white mt-2 d-flex align-items-center">
                    <a href="#" rel="nofollow" className="ml-2" target="_blank">
                      <img src={tmdbIcon} height="20" alt="TMDB" />
                    </a>
                    <a href="#" rel="nofollow" target="_blank">
                      <img src={imdbIcon} alt="IMDB" />
                    </a>
                    <span className="mx-2">{movieData.imdbRating}</span>
                    <i className="icon-star text-orange"></i>
                    <span className="badge badge-pill badge-info font-size-14 mr-3">{movieData.certification}</span>
                  </div>
                  <div className="font-size-16 text-white mt-2"><span>{movieData.office}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>اللغة : {movieData.language}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>الترجمة : {movieData.subtitle}</span></div>
                  <div className="font-size-16 text-white mt-2">
                    <span>جودة الفيلم : {movieData.quality}</span>
                  </div>
                  <div className="font-size-16 text-white mt-2"><span>انتاج : {movieData.country}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>السنة : {movieData.year}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>مدة الفيلم : {movieData.duration}</span></div>
                  <div className="font-size-16 d-flex align-items-center mt-3">
                    {movieData.genres.map((genre, index) => (
                      <a key={index} href="#" className="badge badge-pill badge-light ml-2">{genre}</a>
                    ))}
                  </div>
                  <div className="font-size-14 text-muted mt-3">
                    <span>تـ الإضافة : {movieData.addedDate}</span>
                  </div>
                </div>
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
                      <a href="javascript:;" className="facebook ml-2"><i className="icon-facebook"></i></a>
                      <a href="javascript:;" className="twitter ml-2"><i className="icon-twitter"></i></a>
                      <a href="javascript:;" className="messenger ml-2"><i className="icon-messenger"></i></a>
                      <a href="javascript:;" className="whatsapp ml-2"><i className="icon-whatsapp"></i></a>
                    </div>
                  </div>
                  <a href="javascript:;" className="btn btn-favorite btn-pill d-flex align-items-center text-white mt-2 add-to-fav">
                    <span className="font-size-18 font-weight-medium">قائمتي</span>
                    <i className="icon-plus icon1 font-size-20 mr-auto"></i>
                    <i className="icon-check icon2 font-size-20 mr-auto"></i>
                  </a>
                  <div className="mt-auto pt-3">
                    <div className="movie-rating d-flex justify-content-center align-items-center">
                      <span className="text font-size-16 text-white d-none">ما رأيك في هذا الموضوع ؟</span>
                      <a href="javascript:;" className="like mx-1">
                        <i className="icon-like"></i><span className="number">{movieData.likes}</span>
                      </a>
                      <a href="javascript:;" className="unlike mx-1">
                        <i className="icon-like1"></i><span className="number">{movieData.dislikes}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Movie Story */}
          <div className="container">
            <div className="widget widget-style-1 mb-5">
              <header className="widget-header border-0 mb-4">
                <div className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">قصة الفيلم</span>
                </div>
                <img src="/src/assets/images/icn-w-header.png" className="header-img" alt="" />
              </header>
              <div className="widget-body">
                <h2>
                  <div className="text-white font-size-18" style={{ lineHeight: 1.7 }}>
                    فيلم {movieData.title} <p>{movieData.description}</p>
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
                <img src="/src/assets/images/icn-w-header.png" className="header-img" alt="" />
              </header>
              <div className="widget-body row">
                {movieData.cast.map((actor, index) => (
                  <div key={index} className="col-lg-auto col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-3 h-100">
                      <a href="#" className="box d-flex no-gutters align-items-center">
                        <div className="col-auto">
                          <img src={actor.image} className="img-fluid rounded-circle" alt={actor.name} />
                        </div>
                        <div className="col">
                          <div className="entry-title text-center">{actor.name}</div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download/Watch Section */}
            <div className="widget widget-style-1 mb-5">
              <header className="widget-header border-0 mb-4" id="downloads">
                <h2 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">مشاهدة وتحميل</span>
                </h2>
                <img src="/src/assets/images/icn-w-header.png" className="header-img" alt="" />
              </header>
              <div className="widget-body">
                <div className="qualities">
                  {movieData.servers.map((server, index) => (
                    <div key={index} className="quality-item mb-3">
                      <div className="d-flex align-items-center justify-content-between p-3 bg-dark rounded">
                        <div className="d-flex align-items-center">
                          <i className={`icon-${server.type === 'watch' ? 'play2' : 'download'} font-size-20 text-${server.type === 'watch' ? 'orange' : 'info'} ml-3`}></i>
                          <span className="text-white font-weight-medium">{server.name}</span>
                          <span className="text-muted font-size-14 mr-3">({server.size})</span>
                        </div>
                        <a 
                          href={server.url} 
                          className={`btn btn-${server.type === 'watch' ? 'orange' : 'info'} btn-sm`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {server.type === 'watch' ? 'مشاهدة' : 'تحميل'}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Movies */}
            <div className="widget widget-style-1 mb-5">
              <header className="widget-header border-0 mb-4">
                <h3 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">أفلام مشابهة</span>
                </h3>
                <img src="/src/assets/images/icn-w-header.png" className="header-img" alt="" />
              </header>
              <div className="widget-body">
                <div className="row">
                  {relatedMovies.map((movie) => (
                    <div key={movie.id} className="col-xl-2 col-lg-3 col-md-4 col-6 mb-4">
                      <div className="entry-box entry-box-1">
                        <a href={`/movie/${movie.id}`} className="box d-block">
                          <div className="entry-image">
                            <img src={movie.poster} className="img-fluid" alt={movie.title} />
                          </div>
                          <div className="entry-body">
                            <div className="entry-title font-size-14 text-white text-center mt-2">
                              {movie.title}
                            </div>
                            <div className="entry-rating text-center mt-1">
                              <i className="icon-star text-orange"></i>
                              <span className="text-muted font-size-12">{movie.rating}</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Error Modal */}
        {showReportModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-white">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title">
                    <img src="/src/assets/images/report.svg" className="mr-2" alt="" />
                    التبليغ عن خطأ
                  </h5>
                  <button 
                    type="button" 
                    className="close text-white"
                    onClick={() => setShowReportModal(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>رابط الصفحة</label>
                      <input 
                        type="url" 
                        className="form-control bg-secondary text-white border-secondary" 
                        readOnly 
                        value={typeof window !== 'undefined' ? window.location.href : ''}
                      />
                    </div>
                    <div className="form-group">
                      <label>البريد الإلكتروني (اختياري)</label>
                      <input type="email" className="form-control bg-secondary text-white border-secondary" />
                    </div>
                    <div className="form-group">
                      <label>السبب</label>
                      <select className="form-control bg-secondary text-white border-secondary">
                        <option>مشكلة في رابط التحميل المباشر</option>
                        <option>مشكلة في رابط المشاهدة المباشرة</option>
                        <option>مشكلة عدم توافق الترجمة</option>
                        <option>مشكلة تقنية في الصوت او الصورة</option>
                        <option>مشكلة تحريرية في الموضوع او الصور</option>
                        <option>طلب تحديث جودة</option>
                        <option>مشكلة اخرى</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>بيانات إضافية / برجاء توضيح المشكلة بالضبط ليتم التعامل معها باسرع وقت</label>
                      <textarea className="form-control bg-secondary text-white border-secondary" rows={4}></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer border-secondary">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowReportModal(false)}>
                    إغلاق
                  </button>
                  <button type="button" className="btn btn-primary">
                    ارسال
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}