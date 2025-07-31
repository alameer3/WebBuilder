import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useEffect } from "react";

// استيراد ملفات CSS المطلوبة
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/yemen-flix.css';

// استيراد الصور والأصول المطلوبة
import logoWhite from "../assets/images/logo-white.svg";
import defaultAvatar from "../assets/images/default.jpg";
import tmdbIcon from "../assets/images/tmdb.png";
import imdbIcon from "../assets/images/imdb.png";
import reportIcon from "../assets/images/report.svg";

interface SeriesDetail {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  poster?: string;
  backdrop?: string;
  year?: number;
  genre?: string[];
  rating?: number;
  tmdbRating?: number;
  imdbRating?: number;
  quality?: string;
  language?: string;
  subtitle?: string;
  country?: string;
  duration?: string;
  addedDate?: string;
  updatedDate?: string;
  tmdbUrl?: string;
  imdbUrl?: string;
  trailerUrl?: string;
  episodesCount?: number;
  cast?: Array<{
    id: string;
    name: string;
    image?: string;
  }>;
  gallery?: string[];
  episodes?: Array<{
    id: string;
    title: string;
    episodeNumber: number;
    description?: string;
    duration?: string;
  }>;
}

export default function SeriesDetail() {
  const { id } = useParams();
  
  const { data: series, isLoading } = useQuery<SeriesDetail>({
    queryKey: ['/api/series', id],
    // بيانات تجريبية - ستستبدل بـ API حقيقي
    queryFn: () => Promise.resolve({
      id: "220-days",
      title: "220 يوم",
      titleEn: "220 Days",
      description: "مسلسل 220 يوم يحكي قصة مشوقة ومثيرة تجري أحداثها خلال 220 يوماً حافلاً بالأحداث المتلاحقة والمفاجآت التي تبقي المشاهد في حالة ترقب مستمر. يمزج المسلسل بين عناصر الإثارة والرومانسية والدراما بطريقة مميزة تجعله من أبرز الأعمال الدرامية.",
      poster: "/client/src/assets/images/default.jpg",
      backdrop: "/client/src/assets/images/home-bg.webp",
      year: 2025,
      genre: ["اثارة", "رومانسي", "دراما"],
      rating: 8.0,
      tmdbRating: 8.0,
      imdbRating: 7.8,
      quality: "WEB-DL - 720p",
      language: "العربية",
      subtitle: "العربية",
      country: "مصر",
      duration: "36 دقيقة",
      addedDate: "الخميس 31 07 2025 - 01:43 صباحا",
      updatedDate: "الخميس 31 07 2025 - 01:46 صباحا",
      tmdbUrl: "https://www.themoviedb.org/tv/271270-220",
      imdbUrl: "https://www.imdb.com/title/tt34934811",
      trailerUrl: "https://www.youtube.com/watch?v=Q6z0EKgBvmw",
      episodesCount: 24,
      cast: [
        { id: "1", name: "ممثل رئيسي 1", image: "/client/src/assets/images/default.jpg" },
        { id: "2", name: "ممثل رئيسي 2", image: "/client/src/assets/images/default.jpg" },
        { id: "3", name: "ممثل رئيسي 3", image: "/client/src/assets/images/default.jpg" }
      ],
      gallery: [
        "/client/src/assets/images/default.jpg",
        "/client/src/assets/images/default.jpg",
        "/client/src/assets/images/default.jpg",
        "/client/src/assets/images/default.jpg"
      ],
      episodes: Array.from({ length: 24 }, (_, i) => ({
        id: `ep-${i + 1}`,
        title: `الحلقة ${i + 1}`,
        episodeNumber: i + 1,
        description: `وصف الحلقة ${i + 1}`,
        duration: "36 دقيقة"
      }))
    })
  });

  useEffect(() => {
    // إضافة classes للجسم مطابقة للأصل
    document.body.className = "header-fixed header-pages";
    
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

  if (isLoading || !series) {
    return (
      <div className="col-12 text-center py-5">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* طبقة التراكب للقائمة */}
      <div className="site-overlay"></div>

      {/* القائمة الجانبية */}
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

      {/* الهيدر الرئيسي */}
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
      <input type="hidden" id="page_app" value="series" />
      <input type="hidden" id="page_id" value={series.id} />

      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" style={{backgroundColor: '#1c1c20'}}>
        <div className="container py-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/main">
                <i className="icon-home ml-2"></i> الرئيسية
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/series">
                <i className="icon-monitor ml-2"></i> مسلسلات
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {series.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* SVG Filter للخلفية المبهمة */}
      <svg style={{opacity: 0, visibility: 'hidden', position: 'absolute', top: '-999px', right: '-999px'}}>
        <filter id="blur-effect-1">
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </svg>

      {/* صفحة تفاصيل المسلسل */}
      <div className="page page-movie page-film">
        {/* Movie Cover مع الخلفية المبهمة */}
        <div className="movie-cover mb-4 without-cover">
          <svg>
            <image x="0" y="0" filter="url(#blur-effect-1)" xlinkHref={series.backdrop} />
          </svg>
          <div className="container">
            <div className="row py-4">
              {/* صورة المسلسل */}
              <div className="col-lg-3 col-md-4 text-center mb-5 mb-md-0">
                <a href={series.poster} data-fancybox>
                  <picture>
                    <img src={series.poster || defaultAvatar} className="img-fluid" alt={series.title} />
                  </picture>
                </a>
              </div>

              {/* معلومات المسلسل */}
              <div className="col-lg-7 pr-lg-4 col-md-5 col-sm-8 mb-4 mb-sm-0 px-4 px-sm-0">
                <h1 className="entry-title font-size-28 font-weight-bold text-white mb-0">
                  {series.title}
                </h1>
                
                {/* التقييمات مع أيقونات TMDB و IMDB */}
                <div className="font-size-16 text-white mt-2 d-flex align-items-center">
                  {series.tmdbUrl && (
                    <a href={series.tmdbUrl} rel="nofollow" className="ml-2" target="_blank">
                      <img src={tmdbIcon} height="20" alt="TMDB" />
                    </a>
                  )}
                  {series.imdbUrl && (
                    <a href={series.imdbUrl} rel="nofollow" target="_blank">
                      <img src={imdbIcon} height="20" alt="IMDB" />
                    </a>
                  )}
                  <span className="mx-2">
                    10 / {series.rating} 
                  </span>
                  <i className="icon-star text-orange"></i>
                  <span className="mx-2">PG13 اشراف عائلي</span>
                </div>

                {/* معلومات تقنية */}
                <div className="font-size-16 text-white mt-2">
                  <span>اللغة : {series.language}</span>
                </div>
                <div className="font-size-16 text-white mt-2">
                  <span>الجودة : {series.quality}</span>
                </div>
                <div className="font-size-16 text-white mt-2">
                  <span>انتاج : {series.country}</span>
                </div>
                <div className="font-size-16 text-white mt-2">
                  <span>السنة : {series.year}</span>
                </div>
                <div className="font-size-16 text-white mt-2">
                  <span>مدة المسلسل : {series.duration}</span>
                </div>

                {/* التصنيفات */}
                <div className="font-size-16 d-flex align-items-center mt-3">
                  {series.genre?.map((genre, index) => (
                    <a key={index} href={`/series?category=${genre}`} className="badge badge-pill badge-light ml-2">
                      {genre}
                    </a>
                  ))}
                </div>

                {/* تواريخ الإضافة والتحديث */}
                <div className="font-size-14 text-muted mt-3">
                  <span>تـ الإضافة : {series.addedDate}</span>
                </div>
                <div className="font-size-14 text-muted">
                  <span>تـ اخر تحديث : {series.updatedDate}</span>
                </div>
              </div>

              {/* أزرار التفاعل */}
              <div className="col-lg-2 col-md-3 col-sm-4 d-flex flex-column px-4 px-sm-0">
                {/* زر الإعلان */}
                {series.trailerUrl && (
                  <a href={series.trailerUrl} target="_blank" className="btn btn-danger btn-pill d-flex align-items-center text-white mt-2">
                    <span className="font-size-18 font-weight-medium">الاعلان</span>
                    <i className="icon-play2 font-size-20 mr-auto"></i>
                  </a>
                )}

                {/* زر الحلقات */}
                <a href="#series-episodes" className="btn btn-orange btn-pill d-flex align-items-center text-white mt-2">
                  <span className="font-size-18 font-weight-medium">الحلقات</span>
                  <i className="icon-play2 font-size-20 mr-auto"></i>
                </a>

                {/* زر المشاركة */}
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

                {/* زر قائمتي */}
                <a href="javascript:;" className="btn btn-favorite btn-pill d-flex align-items-center text-white mt-2 add-to-fav">
                  <span className="font-size-18 font-weight-medium">قائمتي</span>
                  <i className="icon-plus icon1 font-size-20 mr-auto"></i>
                  <i className="icon-check icon2 font-size-20 mr-auto"></i>
                </a>

                {/* نظام التقييم */}
                <div className="mt-auto pt-3">
                  <div className="movie-rating d-flex justify-content-center align-items-center">
                    <span className="text font-size-16 text-white d-none">ما رأيك في هذا الموضوع ؟</span>
                    <a href="javascript:;" className="like mx-1">
                      <i className="icon-like"></i>
                      <span className="number">0</span>
                    </a>
                    <a href="javascript:;" className="unlike mx-1">
                      <i className="icon-like1"></i>
                      <span className="number">0</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* محتوى الصفحة */}
        <div className="container">
          {/* قسم قصة المسلسل */}
          <div className="widget widget-style-1 mb-5">
            <header className="widget-header border-0 mb-4">
              <div className="header-title font-size-18 font-weight-bold mb-0">
                <span className="header-link text-white">قصة المسلسل</span>
              </div>
              <img src="/style/assets/images/icn-w-header.png" alt="icn-w" className="header-img" />
            </header>
            <div className="widget-body">
              <div className="text-white font-size-18" style={{lineHeight: 1.7}}>
                <p>{series.description}</p>
              </div>
              
              {/* معرض الصور */}
              {series.gallery && series.gallery.length > 0 && (
                <div className="d-flex">
                  {series.gallery.map((image, index) => (
                    <a key={index} href={image} data-fancybox="movie-gallery" className="ml-12">
                      <img src={image} className="img-fluid" alt={`${series.title} ${index + 1}`} style={{width: '180px', height: '100px', objectFit: 'cover'}} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* قسم فريق العمل */}
          {series.cast && series.cast.length > 0 && (
            <div className="widget widget-style-1 mb-5" data-grid="5">
              <header className="widget-header border-0 mb-4">
                <h3 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">فريق العمل</span>
                </h3>
                <img src="/style/assets/images/icn-w-header.png" alt="icn-w" className="header-img" />
              </header>
              <div className="widget-body row">
                {series.cast.map((actor) => (
                  <div key={actor.id} className="col-lg-auto col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-3 h-100">
                      <a href={`/person/${actor.id}`} className="box d-flex no-gutters align-items-center">
                        <div className="col-auto">
                          <img src={actor.image || defaultAvatar} className="img-fluid rounded-circle" alt={actor.name} style={{width: '54px', height: '54px'}} />
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
          )}

          {/* قسم الحلقات */}
          <div className="widget widget-style-1 mb-5" id="series-episodes">
            <header className="widget-header border-0 mb-4">
              <div className="header-title font-size-18 font-weight-bold mb-0">
                <span className="header-link text-white">الحلقات</span>
              </div>
              <img src="/style/assets/images/icn-w-header.png" alt="icn-w" className="header-img" />
            </header>
            <div className="widget-body">
              <div className="row">
                {series.episodes?.map((episode) => (
                  <div key={episode.id} className="col-lg-6 col-12 mb-3">
                    <div className="entry-box entry-box-4 d-flex align-items-center p-3">
                      <div className="episode-number bg-orange text-white rounded-circle d-flex align-items-center justify-content-center ml-3" style={{width: '40px', height: '40px'}}>
                        {episode.episodeNumber}
                      </div>
                      <div className="episode-info">
                        <h4 className="episode-title text-white mb-1">{episode.title}</h4>
                        <p className="episode-duration text-muted mb-0">{episode.duration}</p>
                      </div>
                      <div className="ml-auto">
                        <a href={`/watch/series/${series.id}/episode/${episode.id}`} className="btn btn-sm btn-orange">
                          <i className="icon-play"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* قسم الوسوم */}
          <div className="widget widget-style-1 mb-5">
            <div className="widget-body">
              <div className="font-size-16 text-white">
                <span>وسوم : </span>
                <a href={`/series?tag=${series.title}`} className="badge badge-pill badge-secondary ml-2">
                  #{series.title}
                </a>
                <a href={`/series?tag=مشاهدة و تحميل مسلسل ${series.title}`} className="badge badge-pill badge-secondary ml-2">
                  #مشاهدة و تحميل مسلسل {series.title}
                </a>
              </div>
            </div>
          </div>

          {/* نموذج التبليغ عن خطأ */}
          <div className="widget widget-style-1 mb-5">
            <header className="widget-header border-0 mb-4">
              <div className="header-title font-size-18 font-weight-bold mb-0 d-flex align-items-center">
                <img src={reportIcon} alt="error icon" className="ml-2" style={{width: '20px'}} />
                <span className="header-link text-white">التبليغ عن خطأ</span>
              </div>
            </header>
            <div className="widget-body">
              <form className="report-form">
                <div className="form-group mb-3">
                  <label className="text-white">رابط الصفحة</label>
                  <input type="url" className="form-control" value={window.location.href} readOnly />
                </div>
                <div className="form-group mb-3">
                  <label className="text-white">البريد الإلكتروني (اختياري)</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-group mb-3">
                  <label className="text-white">السبب</label>
                  <select className="form-control">
                    <option>مشكلة في رابط التحميل المباشر</option>
                    <option>مشكلة في رابط المشاهدة المباشرة</option>
                    <option>مشكلة عدم توافق الترجمة</option>
                    <option>مشكلة تقنية في الصوت او الصورة</option>
                    <option>مشكلة تحريرية في الموضوع او الصور</option>
                    <option>طلب تحديث جودة</option>
                    <option>مشكلة اخرى</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label className="text-white">بيانات إضافية / برجاء توضيح المشكلة بالضبط ليتم التعامل معها باسرع وقت</label>
                  <textarea className="form-control" rows={4}></textarea>
                </div>
                <button type="submit" className="btn btn-orange">ارسال</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* الفوتر */}
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="footer-links">
                <a href="/contactus">اتصل بنا</a>
                <a href="/privacy">سياسة الخصوصية</a>
                <a href="/terms">الشروط والأحكام</a>
              </div>
              <div className="copyright text-muted mt-3">
                جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
              </div>
            </div>
            <div className="col-md-4">
              <div className="social-links d-flex justify-content-md-end">
                <a href="#" className="mx-2"><i className="icon-facebook"></i></a>
                <a href="#" className="mx-2"><i className="icon-twitter"></i></a>
                <a href="#" className="mx-2"><i className="icon-instagram"></i></a>
                <a href="#" className="mx-2"><i className="icon-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}