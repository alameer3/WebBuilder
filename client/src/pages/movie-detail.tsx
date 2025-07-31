import { useParams } from "wouter";
import { useState, useEffect } from "react";

// استيراد الأيقونات الجديدة من مجلد 2020
import imdbIcon from "../assets/images/imdb.png";
import tmdbIcon from "../assets/images/tmdb.png";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

export default function MovieDetail() {
  const { id } = useParams() as { id: string };
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    // إضافة body classes مطابقة للأصل
    document.body.className = 'header-fixed header-pages pace-done';

    // تحميل jQuery للتفاعلات
    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      setTimeout(() => {
        if (window.$) {
          const $ = window.$;
          
          // Menu toggle
          $(".menu-toggle").on("click", function(){
            $("body").removeClass("search-active").toggleClass("main-menu-active");
          });
          
          // Search toggle
          $(".search-toggle").on("click", function(){
            $("body").removeClass("main-menu-active").toggleClass("search-active");
            setTimeout(function(){
              $(".search-box form input").focus();
            }, 200);
          });

          // Site overlay
          $(".site-overlay").on("click", function(){
            $("body").removeClass("main-menu-active search-active");
          });

          // ESC key
          $(document).on("keydown", function(e: any){
            if (e.keyCode === 27) {
              $("body").removeClass("search-active main-menu-active");
            }
          });
        }
      }, 100);
    };
    document.head.appendChild(jqueryScript);

    return () => {
      document.body.className = '';
    };
  }, []);

  // بيانات تجريبية - ستُستبدل ببيانات من قاعدة البيانات
  const movieData = {
    id: parseInt(id),
    title: "Miracle in Cell No. 7",
    titleAr: "معجزة في الزنزانة 7",
    description: "تتناول قصة الفيلم حكاية رجل أُدِين وسُجِن بالخطأ في جريمة قتل، وقد تمكن من بناء صداقات مع مجرمين خطيرين كانوا معه في نفس الزنزانة، كما ساعده هؤلاء على رؤية ابنته بتهريبهم لها إلى داخل السجن",
    image: "/src/assets/images/default.jpg",
    imdbRating: "8.2",
    tmdbRating: "8.5",
    year: "2019",
    quality: "BluRay",
    duration: "132 دقيقة",
    country: "تركيا",
    language: "التركية",
    genre: ["دراما", "كوميديا", "عائلي"],
    director: "Mehmet Ada Öztekin",
    cast: [
      { name: "Aras Bulut İynemli", image: "/src/assets/images/default.jpg" },
      { name: "Nisa Sofiya Aksongur", image: "/src/assets/images/default.jpg" },
      { name: "Deniz Baysal", image: "/src/assets/images/default.jpg" },
      { name: "İlker Aksum", image: "/src/assets/images/default.jpg" }
    ],
    servers: [
      { name: "الخادم الأول", url: "#", quality: "1080p" },
      { name: "الخادم الثاني", url: "#", quality: "720p" },
      { name: "الخادم الثالث", url: "#", quality: "480p" }
    ]
  };

  return (
    <div className="site-container">
      <input type="hidden" name="page_app" value="movie" />
      <input type="hidden" name="page_id" value={id} />
      
      {/* Pace Loading Indicator */}
      <div className="pace pace-inactive">
        <div className="pace-progress">
          <div className="pace-progress-inner"></div>
        </div>
        <div className="pace-activity"></div>
      </div>

      {/* Site Overlay */}
      <span className="site-overlay"></span>

      {/* Main Menu - القائمة الجانبية */}
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
          <form className="search-form" method="get" action="/search">
            <div className="input-group">
              <input 
                type="text" 
                name="q" 
                className="form-control search-input" 
                placeholder="البحث في يمن فليكس ..." 
                autoComplete="off"
              />
              <div className="input-group-append">
                <button className="btn search-btn" type="submit">
                  <i className="icon-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="logo">
              <a href="/">
                <img src="/src/assets/images/yemen-flix-logo-white.svg" alt="يمن فليكس" className="logo-img" />
              </a>
            </div>

            {/* Navigation */}
            <nav className="navbar">
              <ul className="navbar-nav d-flex flex-row">
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
                  <a href="/mix" className="nav-link">منوعات</a>
                </li>
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions d-flex align-items-center">
              {/* Search Icon */}
              <button className="btn-search" type="button" aria-label="البحث">
                <i className="icon-search"></i>
              </button>

              {/* Menu Toggle */}
              <button className="menu-toggle" type="button" aria-label="القائمة">
                <div className="icn">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>

              {/* User Menu */}
              <div className="user-menu">
                <a href="/profile" className="user-link">
                  <i className="icon-user"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Movie Info Section */}
          <div className="movie-info-section">
            <div className="row">
              {/* Movie Poster */}
              <div className="col-lg-4 col-md-5">
                <div className="movie-poster">
                  <img src={movieData.image} alt={movieData.title} className="poster-img" />
                  
                  {/* Rating Badges */}
                  <div className="rating-badges">
                    <div className="rating-badge imdb">
                      <img src={imdbIcon} alt="IMDB" className="rating-icon" />
                      <span className="rating-value">{movieData.imdbRating}</span>
                    </div>
                    <div className="rating-badge tmdb">
                      <img src={tmdbIcon} alt="TMDB" className="rating-icon" />
                      <span className="rating-value">{movieData.tmdbRating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="col-lg-8 col-md-7">
                <div className="movie-details">
                  <h1 className="movie-title">{movieData.title}</h1>
                  <h2 className="movie-title-ar">{movieData.titleAr}</h2>

                  {/* Movie Meta */}
                  <div className="movie-meta">
                    <span className="year">{movieData.year}</span>
                    <span className="quality">{movieData.quality}</span>
                    <span className="duration">{movieData.duration}</span>
                  </div>

                  {/* Movie Info Grid */}
                  <div className="movie-info-grid">
                    <div className="info-item">
                      <span className="label">البلد:</span>
                      <span className="value">{movieData.country}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">اللغة:</span>
                      <span className="value">{movieData.language}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">النوع:</span>
                      <span className="value">{movieData.genre.join(", ")}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">الإخراج:</span>
                      <span className="value">{movieData.director}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button className="btn btn-primary btn-watch">
                      <i className="icon-play"></i>
                      مشاهدة
                    </button>
                    <button className="btn btn-secondary btn-trailer">
                      <i className="icon-video"></i>
                      الإعلان
                    </button>
                    <button className="btn btn-outline btn-download">
                      <i className="icon-download"></i>
                      تحميل
                    </button>
                    <button className="btn btn-outline btn-favorite">
                      <i className="icon-heart"></i>
                      قائمتي
                    </button>
                    <button 
                      className="btn btn-outline btn-report"
                      onClick={() => setShowReportModal(true)}
                    >
                      <i className="icon-flag"></i>
                      تبليغ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Servers */}
          <div className="movie-servers-section">
            <h3 className="section-title">خوادم المشاهدة</h3>
            <div className="servers-list">
              {movieData.servers.map((server, index) => (
                <div key={index} className="server-item">
                  <a href={server.url} className="server-link">
                    <span className="server-name">{server.name}</span>
                    <span className="server-quality">{server.quality}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Movie Description */}
          <div className="movie-description-section">
            <h3 className="section-title">القصة</h3>
            <div className="description-content">
              <p>{movieData.description}</p>
            </div>
          </div>

          {/* Cast Section */}
          <div className="cast-section">
            <h3 className="section-title">فريق العمل</h3>
            <div className="cast-grid">
              {movieData.cast.map((actor, index) => (
                <div key={index} className="cast-item">
                  <img src={actor.image} alt={actor.name} className="cast-image" />
                  <span className="cast-name">{actor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="modal-title">تبليغ عن خطأ</h4>
              <button 
                className="modal-close"
                onClick={() => setShowReportModal(false)}
              >
                <i className="icon-close"></i>
              </button>
            </div>
            <div className="modal-body">
              <form className="report-form">
                <div className="form-group">
                  <label>نوع المشكلة:</label>
                  <select className="form-control">
                    <option value="">اختر نوع المشكلة</option>
                    <option value="video">مشكلة في الفيديو</option>
                    <option value="audio">مشكلة في الصوت</option>
                    <option value="subtitle">مشكلة في الترجمة</option>
                    <option value="quality">مشكلة في الجودة</option>
                    <option value="other">مشكلة أخرى</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>تفاصيل المشكلة:</label>
                  <textarea 
                    className="form-control" 
                    rows={4}
                    placeholder="اكتب تفاصيل المشكلة هنا..."
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">إرسال التبليغ</button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowReportModal(false)}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a href="/contact">اتصل بنا</a>
              <a href="/privacy">سياسة الخصوصية</a>
              <a href="/terms">الشروط والأحكام</a>
              <a href="/dmca">DMCA</a>
            </div>
            <div className="footer-social">
              <a href="#" className="social-link facebook">
                <i className="icon-facebook"></i>
              </a>
              <a href="#" className="social-link youtube">
                <i className="icon-youtube"></i>
              </a>
              <a href="#" className="social-link twitter">
                <i className="icon-twitter"></i>
              </a>
            </div>
            <div className="footer-copyright">
              <p>جميع الحقوق محفوظة لـ يمن فليكس © 2025</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}