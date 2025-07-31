import { useParams } from "wouter";
import { useEffect } from "react";

// استيراد الصور المطلوبة
import defaultAvatar from "../assets/images/default.jpg";
import logoWhite from "../assets/images/logo-white.svg";

declare global {
  interface Window {
    $: any;
  }
}

interface PersonDetail {
  id: string;
  name: string;
  nameEn?: string;
  biography?: string;
  image?: string;
  birthDate?: string;
  birthPlace?: string;
  nationality?: string;
  profession?: string[];
  filmography?: Array<{
    id: string;
    title: string;
    year: number;
    role: string;
    poster?: string;
  }>;
}

export default function PersonDetail() {
  const { id } = useParams();

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

  // بيانات تجريبية - ستُستبدل بـ API حقيقي
  const personData: PersonDetail = {
    id: id || "1",
    name: "أحمد رزق",
    nameEn: "Ahmed Rizk", 
    biography: "ممثل مصري مشهور، ولد في القاهرة وبدأ مسيرته الفنية في المسرح قبل أن ينتقل إلى السينما والتلفزيون. شارك في العديد من الأعمال الدرامية والكوميدية المميزة.",
    image: defaultAvatar,
    birthDate: "1970-03-25",
    birthPlace: "القاهرة، مصر",
    nationality: "مصري",
    profession: ["ممثل", "مخرج"],
    filmography: [
      {
        id: "1002",
        title: "معجزة في الزنزانة 7",
        year: 2019,
        role: "بطولة",
        poster: defaultAvatar
      },
      {
        id: "1003",
        title: "الفيل الأزرق",
        year: 2014,
        role: "مساعد",
        poster: defaultAvatar
      }
    ]
  };

  return (
    <div className="site-container">
      <input type="hidden" name="page_app" value="person" />
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
            <div className="col-auto recently-container">
              <a href="/recent" className="btn-recently">
                <i className="icon-plus2 ml-2"></i>
                <span>أضيف حديثا</span>
              </a>
            </div>
            <div className="col-auto user-profile-container">
              <div className="user-panel">
                <a className="user-toggle d-block font-size-20" href="/login">
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
          {/* Person Profile Section */}
          <div className="person-profile-section py-5">
            <div className="row">
              {/* Person Photo */}
              <div className="col-lg-4 col-md-5">
                <div className="person-photo">
                  <img src={personData.image} alt={personData.name} className="person-img" />
                </div>
              </div>

              {/* Person Details */}
              <div className="col-lg-8 col-md-7">
                <div className="person-details">
                  <h1 className="person-name">{personData.name}</h1>
                  {personData.nameEn && (
                    <h2 className="person-name-en">{personData.nameEn}</h2>
                  )}

                  {/* Person Info */}
                  <div className="person-info-grid">
                    <div className="info-item">
                      <span className="label">تاريخ الميلاد:</span>
                      <span className="value">{personData.birthDate}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">مكان الميلاد:</span>
                      <span className="value">{personData.birthPlace}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">الجنسية:</span>
                      <span className="value">{personData.nationality}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">المهنة:</span>
                      <span className="value">{personData.profession?.join(", ")}</span>
                    </div>
                  </div>

                  {/* Biography */}
                  {personData.biography && (
                    <div className="person-biography">
                      <h3>السيرة الذاتية</h3>
                      <p>{personData.biography}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Filmography Section */}
          {personData.filmography && personData.filmography.length > 0 && (
            <div className="filmography-section py-5">
              <h2 className="section-title">الأعمال السينمائية</h2>
              <div className="row">
                {personData.filmography.map((work) => (
                  <div key={work.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <div className="work-card">
                      <div className="work-poster">
                        <img src={work.poster} alt={work.title} />
                        <div className="work-overlay">
                          <a href={`/movie/${work.id}`} className="btn btn-primary">
                            عرض التفاصيل
                          </a>
                        </div>
                      </div>
                      <div className="work-info">
                        <h4 className="work-title">{work.title}</h4>
                        <div className="work-meta">
                          <span className="work-year">{work.year}</span>
                          <span className="work-role">{work.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="footer-logo">
                <img src={logoWhite} alt="يمن فليكس" className="footer-logo-img" />
              </div>
              <p className="footer-description">
                يمن فليكس - أفضل موقع لمشاهدة الأفلام والمسلسلات العربية والأجنبية
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-links">
                <a href="/movies">الأفلام</a>
                <a href="/series">المسلسلات</a>
                <a href="/shows">التلفزيون</a>
                <a href="/contactus">اتصل بنا</a>
              </div>
              <div className="footer-social">
                <a href="#" className="social-link facebook"><i className="icon-facebook"></i></a>
                <a href="#" className="social-link youtube"><i className="icon-youtube"></i></a>
                <a href="#" className="social-link twitter"><i className="icon-twitter"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 يمن فليكس. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}