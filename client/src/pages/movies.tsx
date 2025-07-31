import { useEffect } from "react";
import { Link } from "wouter";

// استيراد ملفات CSS المطلوبة
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/yemen-flix.css';

// استيراد الصور والأصول المطلوبة
import logoWhite from "../assets/images/logo-white.svg";

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

// بيانات الأفلام العربية التجريبية - مطابقة للقطة الشاشة
const sampleMovies: Movie[] = [
  // الصف الأول
  { id: "1", title: "Special Ops: Lioness", description: "مسلسل أكشن أمريكي", poster: "https://img.downet.net/thumb/178x260/uploads/1nPPx.webp", year: 2023, genre: ["أكشن", "دراما"], rating: 7.6, quality: "WEB-DL" },
  { id: "2", title: "Venom: The Last Dance", description: "فيلم أكشن خيال علمي", poster: "https://img.downet.net/thumb/178x260/uploads/92298.webp", year: 2024, genre: ["أكشن", "خيال علمي"], rating: 6.2, quality: "CAM" },
  { id: "3", title: "Beneath Us", description: "فيلم رعب أمريكي", poster: "https://img.downet.net/thumb/178x260/uploads/BV1RS.webp", year: 2019, genre: ["رعب", "إثارة"], rating: 5.3, quality: "WEB-DL" },
  { id: "4", title: "Dogs", description: "فيلم دراما", poster: "https://img.downet.net/thumb/178x260/uploads/F41b1.webp", year: 2024, genre: ["دراما"], rating: 6.8, quality: "WEB-DL" },
  { id: "5", title: "28 Years Later", description: "فيلم رعب وإثارة", poster: "https://img.downet.net/thumb/178x260/uploads/Gn5bw.webp", year: 2025, genre: ["رعب", "إثارة"], rating: 7.1, quality: "WEB-DL" },
  
  // الصف الثاني
  { id: "6", title: "Decided", description: "فيلم دراما", poster: "https://img.downet.net/thumb/178x260/uploads/J0AF8.webp", year: 2024, genre: ["دراما"], rating: 6.9, quality: "WEB-DL" },
  { id: "7", title: "Osiris", description: "فيلم خيال علمي", poster: "https://img.downet.net/thumb/178x260/uploads/KogC3.webp", year: 2024, genre: ["خيال علمي"], rating: 5.8, quality: "WEB-DL" },
  { id: "8", title: "Army of Darkness", description: "فيلم رعب كوميدي كلاسيكي", poster: "https://img.downet.net/thumb/178x260/uploads/Z2Djf.webp", year: 1992, genre: ["رعب", "كوميدي"], rating: 7.4, quality: "BluRay" },
  { id: "9", title: "Revolver", description: "فيلم جريمة وإثارة", poster: "https://img.downet.net/thumb/178x260/uploads/Zupcj.webp", year: 2005, genre: ["جريمة", "إثارة"], rating: 6.3, quality: "BluRay" },
  { id: "10", title: "Red Velvet", description: "فيلم رعب", poster: "https://img.downet.net/thumb/178x260/uploads/bSO7K.webp", year: 2024, genre: ["رعب"], rating: 5.2, quality: "WEB-DL" },
  
  // الصف الثالث
  { id: "11", title: "Gilmore Girls", description: "مسلسل دراما كوميدي", poster: "https://img.downet.net/thumb/178x260/uploads/gk2fl.webp", year: 2000, genre: ["دراما", "كوميدي"], rating: 8.7, quality: "WEB-DL" },
  { id: "12", title: "The Chronicles of Narnia", description: "فيلم فانتازيا ومغامرة", poster: "https://img.downet.net/thumb/178x260/uploads/jXyXQ.webp", year: 2005, genre: ["فانتازيا", "مغامرة"], rating: 6.9, quality: "BluRay" },
  { id: "13", title: "Normal Human", description: "فيلم دراما", poster: "https://img.downet.net/thumb/178x260/uploads/oSJ7Y.webp", year: 2024, genre: ["دراما"], rating: 6.1, quality: "WEB-DL" },
  { id: "14", title: "The Cleaner", description: "فيلم أكشن", poster: "https://img.downet.net/thumb/178x260/uploads/pv9vE.webp", year: 2024, genre: ["أكشن"], rating: 6.5, quality: "WEB-DL" },
  { id: "15", title: "My Sweet Monster", description: "فيلم رسوم متحركة", poster: "https://img.downet.net/thumb/178x260/uploads/vGVxu.webp", year: 2021, genre: ["رسوم متحركة", "عائلي"], rating: 6.8, quality: "WEB-DL" },
  
  // إضافة أفلام إضافية لملء الشبكة (30 فيلم كما في الأصل)
  { id: "16", title: "The Wicked", description: "فيلم رعب", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["رعب"], rating: 5.9, quality: "WEB-DL" },
  { id: "17", title: "Desert Warrior", description: "فيلم مغامرة", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["مغامرة"], rating: 6.2, quality: "WEB-DL" },
  { id: "18", title: "Blood Moon", description: "فيلم رعب", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["رعب"], rating: 5.7, quality: "WEB-DL" },
  { id: "19", title: "City of Lights", description: "فيلم دراما", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["دراما"], rating: 7.1, quality: "WEB-DL" },
  { id: "20", title: "The Last Stand", description: "فيلم أكشن", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["أكشن"], rating: 6.8, quality: "WEB-DL" },
  
  // المزيد من الأفلام لإكمال 30 فيلم
  { id: "21", title: "Mystery Valley", description: "فيلم غموض", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["غموض"], rating: 6.4, quality: "WEB-DL" },
  { id: "22", title: "Space Rangers", description: "فيلم خيال علمي", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["خيال علمي"], rating: 6.9, quality: "WEB-DL" },
  { id: "23", title: "Love Stories", description: "فيلم رومانسي", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["رومانسي"], rating: 7.2, quality: "WEB-DL" },
  { id: "24", title: "War Heroes", description: "فيلم حربي", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["حربي"], rating: 7.5, quality: "WEB-DL" },
  { id: "25", title: "Comedy Night", description: "فيلم كوميدي", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["كوميدي"], rating: 6.7, quality: "WEB-DL" },
  { id: "26", title: "Ancient Secrets", description: "فيلم مغامرة", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["مغامرة"], rating: 6.6, quality: "WEB-DL" },
  { id: "27", title: "Digital Dreams", description: "فيلم خيال علمي", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["خيال علمي"], rating: 6.3, quality: "WEB-DL" },
  { id: "28", title: "Family Bonds", description: "فيلم عائلي", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["عائلي"], rating: 7.0, quality: "WEB-DL" },
  { id: "29", title: "Ocean Deep", description: "فيلم مغامرة", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["مغامرة"], rating: 6.8, quality: "WEB-DL" },
  { id: "30", title: "Time Traveler", description: "فيلم خيال علمي", poster: "https://img.downet.net/thumb/178x260/uploads/default.jpg", year: 2024, genre: ["خيال علمي"], rating: 7.3, quality: "WEB-DL" }
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
      document.body.className = "";
    };
  }, []);

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
                  <a className="user-toggle d-block font-size-20 private hide" href="javascript:;"><i className="icon-user"></i></a>
                  <div className="login-panel private hide">
                    <div className="user-logged d-flex align-items-center no-gutters p-3">
                      <div className="col-auto"><img src="https://img.downet.net/thumb/32x32/default.jpg" className="img-fluid rounded-circle" alt="user avatar" /></div>
                      <div className="col pr-2">
                        <div className="username font-size-14 font-weight-normal text-truncate text-white mb-0 mr-1" style={{width: '120px', height: '22px'}}>مستخدم</div>
                      </div>
                    </div>
                    <nav className="list">
                      <a href="/profile">تعديل البروفايل</a>
                      <a href="/favorite/movies">قائمتي المفضلة</a>
                      <span className="line"></span>
                      <a href="/logout">تسجيل خروج</a>
                    </nav>
                  </div>
                  <a className="user-toggle d-block font-size-20 public" href="/login"><i className="icon-user"></i></a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-header-height"></div>
        
        {/* Hidden Inputs */}
        <input type="hidden" id="page_app" value="movies" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />

        {/* Page Content */}
        <div className="page page-archive">
          {/* Archive Cover */}
          <div className="archive-cover mb-4" style={{ backgroundImage: 'url("https://img.downet.net/uploads/xVeQg.webp")' }}>
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
                                <option>2009</option>
                                <option>2008</option>
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

          {/* Movies Grid */}
          <div className="container">
            <div className="widget" data-grid="6">
              <div className="widget-body row flex-wrap">
                {sampleMovies.map((movie) => (
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
                              <div className="entry-quality">{movie.quality}</div>
                            </div>
                          </div>
                        </div>
                        <div className="entry-body px-3 pb-3 text-center">
                          <h2 className="entry-title font-size-14 font-weight-bold mb-1">{movie.title}</h2>
                          <div className="entry-meta font-size-12 text-muted">
                            <span>{movie.year}</span>
                            {movie.genre && Array.isArray(movie.genre) && (
                              <span> • {movie.genre.join(', ')}</span>
                            )}
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="widget-pagination">
              <ul className="pagination justify-content-center" role="navigation">
                <li className="page-item disabled" aria-disabled="true">
                  <span className="page-link" aria-hidden="true">‹</span>
                </li>
                <li className="page-item mx-1 active" aria-current="page">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=2">2</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=3">3</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=4">4</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=5">5</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=6">6</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=7">7</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=8">8</a>
                </li>
                <li className="page-item mx-1 disabled" aria-disabled="true">
                  <span className="page-link">...</span>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=316">316</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="/movies?page=317">317</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/movies?page=2" rel="next" aria-label="التالي »">›</a>
                </li>
              </ul>
            </div>

            {/* Mobile Pagination */}
            <div className="widget-pagination d-block d-sm-none">
              <ul className="pagination d-flex justify-content-center" role="navigation">
                <li className="page-item disabled" aria-disabled="true">
                  <span className="page-link">« السابق</span>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/movies?page=2" rel="next">التالي »</a>
                </li>
              </ul>
            </div>
            
            {/* End element for main-categories-list */}
            <div id="main-categories-list-end"></div>
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