import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import VideoPlayer from '../components/VideoPlayer';
import ServerLinks from '../components/ServerLinks';

// استيراد الأصول مطابقة للموقع الأصلي
import logoWhite from '../assets/images/logo-white.svg';

export default function MovieDetail() {
  const { id } = useParams();
  const [likes, setLikes] = useState(2);
  const [dislikes, setDislikes] = useState(0);
  const [userRating, setUserRating] = useState<'like' | 'dislike' | null>(null);
  const [activeTab, setActiveTab] = useState('tab-5'); // التبويب النشط للجودات

  useEffect(() => {
    // تطبيق كلاسات body الأصلية
    document.body.className = 'header-fixed';
    
    return () => {
      document.body.className = '';
    };
  }, []);

  // بيانات الفيلم - مطابقة للتصميم الأصلي
  const movieData = {
    title: "Rambo: First Blood Part II",
    imdbRating: "10 / 6.5",
    year: 1985,
    duration: "96 دقيقة",
    language: "الإنجليزية", 
    subtitle: "العربية",
    quality: "BluRay - 1080p",
    country: "الولايات المتحدة الأمريكية",
    genres: ["اثارة", "مغامرة", "اكشن"],
    certification: "PG13 اشراف عائلي",
    backdrop: "https://img.downet.net/thumb/1920x600/uploads/VlnG0.jpeg",
    poster: "https://img.downet.net/thumb/260x380/uploads/VlnG0.jpeg",
    posterLarge: "https://img.downet.net/uploads/VlnG0.jpeg",
    trailer: "https://www.youtube.com/watch?v=WQGJAIYtWD4",
    description: "فيلم Rambo: First Blood Part II بعد أن تم سجن (جون رامبو) في وقت سابق، يتم إطلاق سراحه بأوامر عليا من الحكومة وقيادات الجيش، من أجل تنفيذ مهمة خاصة للغاية في أحراش فيتنام، والمهمة هي القيام بعملية تصوير للجنود الأمريكيين المعتقلين في فيتنام، من دون حدوث معركة بينه وبين معتقلينهم، أو إطلاق رصاصة واحدة، ولكن الأمور لا تتم بتلك السهولة، ولا تسير المهمة بتلك السلاسة، خاصة في ظل وجود القائد الفيتنامي السادي ورفيقه الروسي.",
    cast: [
      { name: "Sylvester Stallone", image: "https://img.downet.net/thumb/54x54/uploads/bflPa.jpeg", url: "/person/20/sylvester-stallone" }
    ],
    gallery: [
      "https://img.downet.net/uploads/maP9n.jpeg",
      "https://img.downet.net/uploads/wN0tO.jpeg", 
      "https://img.downet.net/uploads/3diP6.jpeg"
    ],
    galleryThumbs: [
      "https://img.downet.net/thumb/180x100/uploads/maP9n.jpeg",
      "https://img.downet.net/thumb/180x100/uploads/wN0tO.jpeg",
      "https://img.downet.net/thumb/180x100/uploads/3diP6.jpeg"
    ],
    addedDate: "السبت 11 01 2020 - 08:45 مساءاً",
    updatedDate: "الخميس 02 07 2020 - 03:28 مساءاً"
  };

  const handleRating = (type: 'like' | 'dislike') => {
    if (userRating === type) {
      // إلغاء التقييم
      setUserRating(null);
      if (type === 'like') {
        setLikes(prev => prev - 1);
      } else {
        setDislikes(prev => prev - 1);
      }
    } else {
      // تغيير التقييم
      if (userRating === 'like') {
        setLikes(prev => prev - 1);
        setDislikes(prev => prev + 1);
      } else if (userRating === 'dislike') {
        setDislikes(prev => prev - 1);
        setLikes(prev => prev + 1);
      } else {
        // تقييم جديد
        if (type === 'like') {
          setLikes(prev => prev + 1);
        } else {
          setDislikes(prev => prev + 1);
        }
      }
      setUserRating(type);
    }
  };

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

      {/* Site Container - مطابقة للتصميم الأصلي */}
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
                <button type="button" className="menu-toggle d-flex align-items-center text-white btn-unstyled" onClick={() => document.body.classList.toggle('main-menu-active')}>
                  <span className="icn"></span>
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
        <input type="hidden" id="page_id" value={id || "241"} className="not-empty" />

        {/* Breadcrumb Navigation - مطابقة للتصميم الأصلي */}
        <nav aria-label="breadcrumb" style={{ backgroundColor: '#1c1c20' }}>
          <div className="container py-3">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="/" className="text-white">
                  <i className="icon-home ml-2"></i> الرئيسية
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/movies" className="text-white">
                  <i className="icon-video-camera ml-2"></i> أفلام
                </a>
              </li>
            </ol>
          </div>
        </nav>

        {/* SVG Filter للخلفية المطموسة */}
        <svg style={{ opacity: 0, visibility: 'hidden', position: 'absolute', top: '-999px', right: '-999px' }}>
          <filter id="blur-effect-1">
            <feGaussianBlur stdDeviation="20"></feGaussianBlur>
          </filter>
        </svg>

        {/* Movie Page */}
        <div className="page page-movie page-film">
          {/* Movie Cover مع SVG blur effect */}
          <div className="movie-cover mb-4 without-cover">
            <svg>
              <image x="0" y="0" filter="url(#blur-effect-1)" xlinkHref={movieData.backdrop}></image>
            </svg>
            <div className="container">
              <div className="row py-4">
                {/* Movie Poster */}
                <div className="col-lg-3 col-md-4 text-center mb-5 mb-md-0">
                  <a href={movieData.posterLarge} data-fancybox="">
                    <picture>
                      <img src={movieData.poster} className="img-fluid" alt={movieData.title} />
                    </picture>
                  </a>
                </div>

                {/* Movie Info */}
                <div className="col-lg-7 pr-lg-4 col-md-5 col-sm-8 mb-4 mb-sm-0 px-4 px-sm-0">
                  <h1 className="entry-title font-size-28 font-weight-bold text-white mb-0">{movieData.title}</h1>
                  
                  <div className="font-size-16 text-white mt-2 d-flex align-items-center">
                    <a href={`https://www.imdb.com/title/tt0089880/?ref_=nv_sr_srsg_0`} rel="nofollow" target="_blank">
                      <img src="https://ak.sv/style/assets/images/imdb.png" alt="IMDB" />
                    </a>
                    <span className="mx-2">{movieData.imdbRating}</span>
                    <i className="icon-star text-orange"></i>
                    <span className="badge badge-pill badge-info font-size-14 mr-3">{movieData.certification}</span>
                  </div>
                  
                  <div className="font-size-16 text-white mt-2"><span>اللغة : {movieData.language}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>الترجمة : {movieData.subtitle}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>جودة الفيلم : {movieData.quality}</span></div>
                  <div className="font-size-16 text-white mt-2"><span> انتاج : {movieData.country}</span></div>
                  <div className="font-size-16 text-white mt-2"><span> السنة : {movieData.year}</span></div>
                  <div className="font-size-16 text-white mt-2"><span>مدة الفيلم : {movieData.duration}</span></div>
                  
                  <div className="font-size-16 d-flex align-items-center mt-3">
                    {movieData.genres.map((genre, index) => (
                      <a key={index} href={`/movies?category=${genre}`} className="badge badge-pill badge-light ml-2">{genre}</a>
                    ))}
                  </div>
                  
                  <div className="font-size-14 text-muted mt-3">
                    <span>تـ الإضافة : {movieData.addedDate}</span>
                  </div>
                  <div className="font-size-14 text-muted">
                    <span>تـ اخر تحديث : {movieData.updatedDate}</span>
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
                      <button type="button" className="facebook ml-2 btn-unstyled" onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}><i className="icon-facebook"></i></button>
                      <button type="button" className="twitter ml-2 btn-unstyled" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}`, '_blank')}><i className="icon-twitter"></i></button>
                      <button type="button" className="messenger ml-2 btn-unstyled" onClick={() => window.open(`https://www.messenger.com/`, '_blank')}><i className="icon-messenger"></i></button>
                      <button type="button" className="whatsapp ml-2 btn-unstyled" onClick={() => window.open(`https://wa.me/?text=${window.location.href}`, '_blank')}><i className="icon-whatsapp"></i></button>
                    </div>
                  </div>
                  
                  <button type="button" className="btn btn-favorite btn-pill d-flex align-items-center text-white mt-2 add-to-fav private hide" data-type="movie" data-id="241" onClick={() => console.log('Add to favorites')}>
                    <span className="font-size-18 font-weight-medium">قائمتي</span>
                    <i className="icon-plus icon1 font-size-20 mr-auto"></i>
                    <i className="icon-check icon2 font-size-20 mr-auto"></i>
                  </button>
                  
                  {/* Rating System - مطابقة للتصميم الأصلي */}
                  <div className="mt-auto pt-3">
                    <div className="movie-rating d-flex justify-content-center align-items-center">
                      <span className="text font-size-16 text-white d-none">ما رأيك في هذا الموضوع ؟</span>
                      <button 
                        type="button"
                        className={`like mx-1 btn-unstyled ${userRating === 'like' ? 'active' : ''}`}
                        onClick={() => handleRating('like')}
                      >
                        <i className="icon-like"></i>
                        <span className="number">{likes}</span>
                      </button>
                      <button 
                        type="button"
                        className={`unlike mx-1 btn-unstyled ${userRating === 'dislike' ? 'active' : ''}`}
                        onClick={() => handleRating('dislike')}
                      >
                        <i className="icon-like1"></i>
                        <span className="number">{dislikes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Content */}
          <div className="container">
            {/* Movie Description */}
            <div className="widget widget-style-1 mb-5">
              <header className="widget-header border-0 mb-4">
                <div className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">قصة الفيلم</span>
                </div>
                <img src="https://ak.sv/style/assets/images/icn-w-header.png" className="header-img" alt="" />
              </header>
              <div className="widget-body">
                <h2>
                  <div className="text-white font-size-18" style={{ lineHeight: '1.7' }}>
                    {movieData.title} <p>{movieData.description}</p>
                  </div>
                </h2>
                <div className="d-flex">
                  {movieData.galleryThumbs.map((thumb, index) => (
                    <a key={index} href={movieData.gallery[index]} data-fancybox="movie-gallery" className="ml-12">
                      <img src={thumb} className="img-fluid" alt={`${movieData.title} undefined`} />
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
                <img src="https://ak.sv/style/assets/images/icn-w-header.png" className="header-img" alt="" />
              </header>
              <div className="widget-body row">
                {movieData.cast.map((actor, index) => (
                  <div key={index} className="col-lg-auto col-md-4 col-6 mb-12">
                    <div className="entry-box entry-box-3 h-100">
                      <a href={actor.url} className="box d-flex no-gutters align-items-center">
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

            {/* Downloads Section - قسم مشاهدة وتحميل */}
            <div className="widget widget-style-1 mb-5">
              <header className="widget-header border-0 mb-4" id="downloads">
                <h2 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">مشاهدة وتحميل</span>
                </h2>
                <img src="https://ak.sv/style/assets/images/icn-w-header.png" className="header-img" alt="" />
              </header>
              
              <div className="widget-body">
                <div className="header-tabs-container">
                  <ul className="header-tabs tabs d-flex list-unstyled p-0 m-0">
                    <li>
                      <a 
                        href="#tab-5" 
                        className={activeTab === 'tab-5' ? 'selected' : ''}
                        onClick={(e) => { e.preventDefault(); setActiveTab('tab-5'); }}
                      >
                        1080p
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#tab-4" 
                        className={activeTab === 'tab-4' ? 'selected' : ''}
                        onClick={(e) => { e.preventDefault(); setActiveTab('tab-4'); }}
                      >
                        720p
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#tab-3" 
                        className={activeTab === 'tab-3' ? 'selected' : ''}
                        onClick={(e) => { e.preventDefault(); setActiveTab('tab-3'); }}
                      >
                        480p
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary2 p-4" style={{ borderRadius: '6px 0 6px 6px' }}>
                  <div className="tab-content quality" id="tab-5" style={{ display: activeTab === 'tab-5' ? 'block' : 'none' }}>
                    <div className="qualities row flex-wrap align-items-center">
                      <div className="col-lg-6 row " data-server="39" data-quality="5">
                        <div className="col-lg-6 col">
                          <a href={`/watch/${id}?server=yemenflix&quality=1080p`} className="link-btn link-show d-flex align-items-center px-3">
                            <span className="text">مشاهدة</span><i className="icon-play2 mr-auto"></i>
                          </a>
                        </div>
                        <div className="col-lg-6 col">
                          <a href="#" className="link-btn link-download d-flex align-items-center px-3">
                            <span className="text">تحميل</span><span className="font-size-14 mr-auto">1.8 GB</span>
                            <i className="icon-download mr-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content quality" id="tab-4" style={{ display: activeTab === 'tab-4' ? 'block' : 'none' }}>
                    <div className="qualities row flex-wrap align-items-center">
                      <div className="col-lg-6 row " data-server="39" data-quality="4">
                        <div className="col-lg-6 col">
                          <a href={`/watch/${id}?server=yemenflix&quality=720p`} className="link-btn link-show d-flex align-items-center px-3">
                            <span className="text">مشاهدة</span><i className="icon-play2 mr-auto"></i>
                          </a>
                        </div>
                        <div className="col-lg-6 col">
                          <a href="#" className="link-btn link-download d-flex align-items-center px-3">
                            <span className="text">تحميل</span><span className="font-size-14 mr-auto">1.0 GB</span>
                            <i className="icon-download mr-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content quality" id="tab-3" style={{ display: activeTab === 'tab-3' ? 'block' : 'none' }}>
                    <div className="qualities row flex-wrap align-items-center">
                      <div className="col-lg-6 row " data-server="39" data-quality="3">
                        <div className="col-lg-6 col">
                          <a href={`/watch/${id}?server=yemenflix&quality=480p`} className="link-btn link-show d-flex align-items-center px-3">
                            <span className="text">مشاهدة</span><i className="icon-play2 mr-auto"></i>
                          </a>
                        </div>
                        <div className="col-lg-6 col">
                          <a href="#" className="link-btn link-download d-flex align-items-center px-3">
                            <span className="text">تحميل</span><span className="font-size-14 mr-auto">561.6 MB</span>
                            <i className="icon-download mr-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Movies Section - قسم شاهد المزيد */}
            <div className="widget-4 widget widget-style-1 more mb-4">
              <header className="widget-header mb-4 d-flex align-items-center">
                <h2 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">شاهد المزيد</span>
                </h2>
                <img src="/style/assets/images/icn-w-header.png" className="header-img" alt="icn-w-header" />
              </header>
              <div className="widget-body">
                <div className="row">
                  {/* Sample Related Movies */}
                  {[
                    { id: '4813', title: 'Help', rating: '8.3', quality: 'WEB-DL', image: 'https://img.downet.net/thumb/178x260/uploads/igtta.jpg' },
                    { id: '5014', title: 'Rambo III', rating: '7.5', quality: 'BluRay', image: 'https://img.downet.net/thumb/178x260/uploads/5ek0n.jpeg' },
                    { id: '6215', title: 'First Blood', rating: '8.1', quality: 'BluRay', image: 'https://img.downet.net/thumb/178x260/uploads/mZNr0.jpeg' },
                    { id: '7416', title: 'Rocky', rating: '8.6', quality: 'BluRay', image: 'https://img.downet.net/thumb/178x260/uploads/nuqhQ.jpg' },
                    { id: '8517', title: 'The Expendables', rating: '7.2', quality: 'BluRay', image: 'https://img.downet.net/thumb/178x260/uploads/ZL1w1.jpg' },
                    { id: '9618', title: 'Creed', rating: '8.0', quality: 'BluRay', image: 'https://img.downet.net/thumb/178x260/uploads/h9rWZ.jpg' }
                  ].map((movie, index) => (
                    <div key={index} className="col-6 col-lg-2 col-md-4 mb-12">
                      <div className="entry-box entry-box-1">
                        <div className="labels d-flex">
                          <span className="label rating"><i className="icon-star mr-2"></i>{movie.rating}</span>
                          <span className="ml-auto"></span>
                          <span className="label quality">{movie.quality}</span>
                        </div>
                        <div className="entry-image">
                          <a href={`/movie/${movie.id}/${movie.title.toLowerCase()}`} className="box">
                            <picture>
                              <img src={movie.image} className="img-fluid w-100 lazy" alt={movie.title} style={{}} />
                            </picture>
                          </a>
                        </div>
                        <div className="entry-header">
                          <div className="entry-title">
                            <a href={`/movie/${movie.id}/${movie.title.toLowerCase()}`}>{movie.title}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
            <a href="/contact" className="email mx-2"><i className="icon-email"></i></a>
          </nav>
        </footer>
      </div>
    </>
  );
}