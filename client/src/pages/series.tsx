import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import type { Movie } from "@shared/schema";

// بيانات المسلسلات النموذجية مطابقة للتصميم الأصلي
const seriesData = [
  {
    id: 1,
    title: "فندق الأحلام مدبلج",
    image: "https://img.downet.net/thumb/178x260/uploads/KVFtC.jpg",
    rating: "6.7",
    episodes: "38",
    quality: "WEB-DL",
    genre: ["دراما"],
    year: "2024",
    href: "/series/5010/فندق-الاحلام-مدبلج"
  },
  {
    id: 2,
    title: "مرحباً بك في سامداليا",
    image: "https://img.downet.net/thumb/178x260/uploads/3s9vr.jpg",
    rating: "5.3",
    episodes: "49",
    quality: "WEB-DL",
    genre: ["رومانسي", "دراما"],
    year: "2023",
    href: "/series/5011/مرحبا-بك-في-سامداليا"
  },
  {
    id: 3,
    title: "ماي نيم",
    image: "https://img.downet.net/thumb/178x260/uploads/QDVOu.jpg",
    rating: "8.1",
    episodes: "8",
    quality: "WEB-DL",
    genre: ["اكشن", "اثارة"],
    year: "2021",
    href: "/series/5012/ماي-نيم"
  },
  {
    id: 4,
    title: "قلعة الحبايب",
    image: "https://img.downet.net/thumb/178x260/uploads/default.jpg",
    rating: "7.2",
    episodes: "30",
    quality: "HDTV",
    genre: ["دراما", "عائلي"],
    year: "2024",
    href: "/series/5013/قلعة-الحبايب"
  },
  {
    id: 5,
    title: "أوراق الصبار",
    image: "https://img.downet.net/thumb/178x260/uploads/default.jpg",
    rating: "6.5",
    episodes: "28",
    quality: "WEB-DL",
    genre: ["دراما"],
    year: "2023",
    href: "/series/5014/اوراق-الصبار"
  },
  {
    id: 6,
    title: "عهد الدم",
    image: "https://img.downet.net/thumb/178x260/uploads/default.jpg",
    rating: "8.4",
    episodes: "40",
    quality: "HDTV",
    genre: ["اكشن", "جريمة"],
    year: "2024",
    href: "/series/5015/عهد-الدم"
  }
];

export default function Series() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 317;

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

  // محاكاة بيانات متعددة الصفحات
  const generateMoreSeries = () => {
    const moreSeries = [];
    for (let i = 7; i <= 30; i++) {
      moreSeries.push({
        id: i,
        title: `مسلسل ${i}`,
        image: "https://img.downet.net/thumb/178x260/uploads/default.jpg",
        rating: (Math.random() * 4 + 5).toFixed(1),
        episodes: Math.floor(Math.random() * 50 + 10).toString(),
        quality: ["WEB-DL", "HDTV", "BluRay"][Math.floor(Math.random() * 3)],
        genre: ["دراما", "كوميدي", "اكشن"][Math.floor(Math.random() * 3)],
        year: "2024",
        href: `/series/${i}/مسلسل-${i}`
      });
    }
    return moreSeries;
  };

  const allSeries = [...seriesData, ...generateMoreSeries()];

  return (
    <>
      {/* Pace Loading */}
      <div className="pace pace-inactive">
        <div className="pace-progress" data-progress-text="100%" data-progress="99" style={{ transform: 'translate3d(100%, 0px, 0px)' }}>
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>

      {/* Site Overlay */}
      <div className="site-overlay"></div>

      {/* Main Menu */}
      <div className="main-menu">
        <div className="main-menu-body">
          <div className="close"><i className="icon-arrow-back"></i></div>
          <div className="categories">
            <Link href="/movies" className="item">
              <div className="icn ml-3"><i className="icon-film"></i></div>
              <div className="text">أفلام</div>
            </Link>
            <Link href="/series" className="item">
              <div className="icn ml-3"><i className="icon-monitor"></i></div>
              <div className="text">مسلسلات</div>
            </Link>
            <Link href="/shows" className="item">
              <div className="icn ml-3"><i className="icon-tv"></i></div>
              <div className="text">تلفزيون</div>
            </Link>
            <Link href="/mix" className="item">
              <div className="icn ml-3"><i className="icon-mix"></i></div>
              <div className="text">منوعات</div>
            </Link>
          </div>
        </div>
        <nav className="social d-flex justify-content-center">
          <a href="https://yemenflix.net" target="" className="home mx-2"><i className="icon-home"></i></a>
          <a href="https://www.facebook.com/yemenflix" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
          <a href="https://www.youtube.com/c/yemenflix" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
          <Link href="/contactus" className="email mx-2"><i className="icon-email"></i></Link>
        </nav>
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
        <header className="main-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <h2 className="main-logo m-0">
                  <Link href="/main" className="d-inline-flex">
                    <img src="/images/logo-white.svg" className="img-fluid" alt="يمن فليكس" />
                  </Link>
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
                <Link href="/recent" className="btn-recently">
                  <i className="icon-plus2 ml-2"></i><span>أضيف حديثا</span>
                </Link>
              </div>
              <div className="col-auto user-profile-container">
                <div className="user-panel">
                  <Link className="user-toggle d-block font-size-20 public" href="/login">
                    <i className="icon-user"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="main-header-height"></div>

        {/* Hidden Form Inputs */}
        <input type="hidden" id="page_app" value="series" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />

        {/* Page Content */}
      <div className="page page-archive">
        <div className="archive-cover mb-4" style={{backgroundImage: "url('https://img.downet.net/uploads/USfXq.webp')"}}>
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
                              <option value="4">الاسبانية</option>
                              <option value="5">الصينية</option>
                              <option value="6">البرتغالية</option>
                              <option value="8">الفرنسية</option>
                              <option value="9">الروسية</option>
                              <option value="10">اليابانية</option>
                              <option value="11">الألمانية</option>
                              <option value="12">الكورية</option>
                              <option value="15">الإيطالية</option>
                              <option value="16">التركية</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-0">
                            <select className="form-control select2" name="formats">
                              <option value="0">الجودة</option>
                              <option>BluRay</option>
                              <option>WebRip</option>
                              <option>BRRIP</option>
                              <option>DVDrip</option>
                              <option>DVDSCR</option>
                              <option>HD</option>
                              <option>HDTS</option>
                              <option>HDTV</option>
                              <option>CAM</option>
                              <option>WEB-DL</option>
                              <option>HDTC</option>
                              <option>BDRIP</option>
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

        {/* Series Grid */}
        <div className="container">
          <div className="widget" data-grid="6">
            <div className="widget-body row flex-wrap">
              {allSeries.map((series) => (
                <div key={series.id} className="col-lg-auto col-md-4 col-6 mb-12">
                  <div className="entry-box entry-box-1">
                    <div className="labels d-flex">
                      <span className="label rating">
                        <i className="icon-star mr-2"></i>{series.rating}
                      </span>
                      <span className="ml-auto"></span>
                      <span className="label series">
                        <i className="icon-play mr-1"></i>{series.episodes}
                      </span>
                      <span className="label quality">{series.quality}</span>
                    </div>
                    <div className="entry-image">
                      <Link href={series.href} className="box">
                        <img 
                          src={series.image} 
                          alt={series.title}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '6px'
                          }}
                        />
                      </Link>
                    </div>
                    <div className="entry-body">
                      <div className="entry-header">
                        <h3 className="entry-title">
                          <Link href={series.href}>{series.title}</Link>
                        </h3>
                      </div>
                      <div className="entry-content">
                        <div className="entry-meta">
                          <span className="badge badge-pill badge-light ml-1">{series.genre}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination - Desktop */}
          <div className="d-none d-sm-block">
            <nav aria-label="Page navigation" className="mt-5">
              <ul className="pagination justify-content-center" role="navigation">
                <li className="page-item mx-1 disabled" aria-disabled="true" aria-label="« السابق">
                  <span className="page-link" aria-hidden="true">‹</span>
                </li>
                <li className="page-item mx-1 active" aria-current="page">
                  <span className="page-link">1</span>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=2">2</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=3">3</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=4">4</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=5">5</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=6">6</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=7">7</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=8">8</a>
                </li>
                <li className="page-item mx-1 disabled">
                  <span className="page-link">...</span>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=316">316</a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="?page=317">317</a>
                </li>
                <li className="page-item mx-1" aria-label="التالي »">
                  <a className="page-link" href="?page=2" rel="next">›</a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Pagination - Mobile */}
          <div className="d-block d-lg-none mt-5">
            <ul className="pagination d-flex justify-content-center" role="navigation">
              <li className="page-item disabled mx-2" aria-disabled="true">
                <span className="page-link">« السابق</span>
              </li>
              <li className="page-item mx-2">
                <a className="page-link" href="?page=2" rel="next">التالي »</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Categories List End (Required for JS) */}
        <div className="main-categories-list-end"></div>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-body d-flex flex-wrap">
            <div className="col-12 col-md-8 border-bottom border-md-0 border-gray-5">
              <nav className="social d-flex justify-content-center justify-content-md-start">
                <a href="https://yemenflix.net" target="" className="home mx-2"><i className="icon-home"></i></a>
                <a href="https://www.facebook.com/yemenflix" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
                <a href="https://www.youtube.com/c/yemenflix" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
                <Link href="/contactus" className="email mx-2"><i className="icon-email"></i></Link>
              </nav>
            </div>
            <div className="col-12 col-md-4">
              <nav className="d-flex align-items-center justify-content-center justify-content-md-end h-100">
                <Link href="/contactus" className="mx-2">اتصل بنا</Link>
                <span className="mx-2">|</span>
                <a href="#" className="mx-2">سياسة الموقع</a>
              </nav>
            </div>
            <div className="col-12">
              <div className="text-center text-md-left py-3">
                <p className="mb-0">
                  جميع الحقوق محفوظة لـ شبكة يمن فليكس © 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}