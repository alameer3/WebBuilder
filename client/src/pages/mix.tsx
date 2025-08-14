// Mix Page - مطابق للأصل تماماً
import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/akwam-original.css';

// استيراد الصور
import logoWhite from '../assets/images/logo-white.svg';
import defaultAvatar from '../assets/images/default.jpg';

// إعلان jQuery على النافذة
declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

interface Mix {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  genre?: string[];
  quality?: string;
  episodes?: number;
  description?: string;
}

export default function Mix() {
  const [filters, setFilters] = useState({
    section: '0',
    category: '0', 
    rating: '0',
    year: '0'
  });

  // بيانات تجريبية للمنوعات (سيتم استبدالها ببيانات حقيقية)
  const mixData: Mix[] = [
    {
      id: "508",
      title: "تغريدات البعد",
      poster: "https://img.downet.net/thumb/270x400/uploads/BGeed.jpg",
      year: "2024",
      rating: 8.5,
      genre: ["منوعات", "ثقافي"],
      quality: "HD",
      episodes: 12,
      description: "برنامج منوعات ثقافي..."
    },
    {
      id: "764", 
      title: "اغنية ضد شار بجار مؤاد",
      poster: "https://img.downet.net/thumb/270x400/uploads/Song.jpg",
      year: "2024",
      rating: 7.2,
      genre: ["موسيقى", "غناء"],
      quality: "HD",
      episodes: 1
    },
    {
      id: "781",
      title: "الاسس الاذاعة ابو العاد",
      poster: "https://img.downet.net/thumb/270x400/uploads/Radio.jpg", 
      year: "2023",
      rating: 8.0,
      genre: ["اذاعة", "تعليمي"],
      quality: "HD",
      episodes: 8
    }
  ];

  useEffect(() => {
    // تطبيق كلاسات body الأصلية
    document.body.className = 'header-fixed header-pages pace-done';
    
    // تحميل jQuery والمكتبات
    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      if (window.$) {
        const $ = window.$;
        
        // إعداد التفاعلات الأصلية
        $(document).ready(() => {
          // Header background on scroll
          function handleScroll() {
            if ($(".main-header").length) {
              if ($(window).scrollTop()! <= 50) {
                $("body").removeClass("header-bg");
              } else {
                $("body").addClass("header-bg");
              }
            }
          }
          
          handleScroll();
          $(window).scroll(handleScroll);

          // Menu toggle
          $(".menu-toggle").click(function() {
            $("body").toggleClass("main-menu-active");
            $("body").removeClass("search-active");
          });

          // Search toggle
          $(".search-toggle").click(function() {
            $("body").removeClass("search-active");
          });

          // User panel toggle
          $(".user-toggle").click(function() {
            $(this).parent().toggleClass("active");
          });

          // إعداد Select2
          if ($.fn.select2) {
            $('.select2').select2();
          }

          // تفعيل lazy loading للصور
          if ($.fn.lazy) {
            $('.lazy').lazy();
          }
        });
      }
    };
    document.head.appendChild(jqueryScript);

    // تحميل مكتبات إضافية
    const select2Script = document.createElement('script');
    select2Script.src = '/src/assets/js/select2.full.min.js';
    document.head.appendChild(select2Script);

    const lazyScript = document.createElement('script');
    lazyScript.src = '/src/assets/js/jquery.lazy.min.js';
    document.head.appendChild(lazyScript);

    return () => {
      // تنظيف عند إلغاء التحميل
      document.body.className = '';
    };
  }, []);

  return (
    <>
      <span className="site-overlay"></span>
      
      {/* القائمة الجانبية */}
      <div className="main-menu">
        <div className="d-flex flex-column">
          <div className="my-auto w-100">
            <div className="menu d-flex flex-wrap justify-content-center">
              <Link href="/movies">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-video-camera"></i></div>
                  <div className="text">أفلام</div>
                </a>
              </Link>
              <Link href="/series">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-monitor"></i></div>
                  <div className="text">مسلسلات</div>
                </a>
              </Link>
              <Link href="/shows">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-tv"></i></div>
                  <div className="text">تلفزيون</div>
                </a>
              </Link>
              <Link href="/mix">
                <a className="item">
                  <div className="icn ml-3"><i className="icon-mix"></i></div>
                  <div className="text">منوعات</div>
                </a>
              </Link>
            </div>
          </div>
          <nav className="social d-flex justify-content-center">
            <Link href="/"><a className="home mx-2"><i className="icon-home"></i></a></Link>
            <a href="#" target="_blank" className="facebook mx-2"><i className="icon-facebook"></i></a>
            <a href="#" target="_blank" className="youtube mx-2"><i className="icon-youtube"></i></a>
            <Link href="/contact"><a className="email mx-2"><i className="icon-email"></i></a></Link>
          </nav>
        </div>
      </div>

      {/* صندوق البحث */}
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

      {/* الحاوية الرئيسية */}
      <div className="site-container">
        <div className="main-header-top"></div>
        
        {/* الهيدر الرئيسي */}
        <header className="main-header">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <h2 className="main-logo m-0">
                  <Link href="/">
                    <a className="d-inline-flex">
                      <img src={logoWhite} className="img-fluid" alt="يمن فليكس" />
                    </a>
                  </Link>
                </h2>
              </div>
              <div className="col-auto menu-toggle-container">
                <a href="javascript:;" className="menu-toggle d-flex align-items-center text-white">
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
                    <button><i className="icon-search"></i></button>
                  </form>
                </div>
              </div>
              <div className="col-auto recently-container">
                <Link href="/recent">
                  <a className="btn-recently"><i className="icon-plus2 ml-2"></i><span>أضيف حديثا</span></a>
                </Link>
              </div>
              <div className="col-auto user-profile-container">
                <div className="user-panel">
                  <a className="user-toggle d-block font-size-20 private hide" href="javascript:;"><i className="icon-user"></i></a>
                  <div className="login-panel private hide">
                    <div className="user-logged d-flex align-items-center no-gutters p-3">
                      <div className="col-auto"><img src={defaultAvatar} className="img-fluid rounded-circle" alt="user avatar" /></div>
                      <div className="col pr-2">
                        <div className="username font-size-14 font-weight-normal text-truncate text-white mb-0 mr-1" style={{width: '120px', height: '22px'}}>مستخدم</div>
                      </div>
                    </div>
                    <nav className="list">
                      <Link href="/profile"><a>تعديل البروفايل</a></Link>
                      <Link href="/favorites"><a>قائمتي المفضلة</a></Link>
                      <span className="line"></span>
                      <Link href="/logout"><a>تسجيل خروج</a></Link>
                    </nav>
                  </div>
                  <Link href="/login">
                    <a className="user-toggle d-block font-size-20 public"><i className="icon-user"></i></a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="main-header-height"></div>
        
        {/* المحتوى الرئيسي */}
        <input type="hidden" id="page_app" value="mix" className="not-empty" />
        <input type="hidden" id="page_id" value="0" className="not-empty" />
        
        <div className="page page-archive">
          <div className="archive-cover mb-4" style={{backgroundImage: "url('https://img.downet.net/uploads/Mix.webp')"}}>
            <div className="container">
              <div className="row pb-3">
                <div className="col-12 mt-auto">
                  <div className="row">
                    <div className="col-md-auto col-12 mb-12 mb-md-0">
                      <div className="main-category d-flex align-items-center justify-content-center radius p-4 h-100">
                        <i className="icn icon-mix ml-4"></i>
                        <h1 className="name font-size-34 font-weight-bold mb-0">منوعات</h1>
                      </div>
                    </div>
                    <div className="col-md">
                      <form id="filter" method="get">
                        <div className="row">
                          <div className="col-lg-6 col-md-12 col-12">
                            <div className="form-group mb-12">
                              <select className="form-control select2" name="category" value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                                <option value="0">التصنيف</option>
                                <option value="100">موسيقى</option>
                                <option value="101">تعليمي</option>
                                <option value="102">ثقافي</option>
                                <option value="103">اذاعة</option>
                                <option value="104">منوعات عامة</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 col-12">
                            <div className="form-group mb-12 mb-lg-0">
                              <select className="form-control select2" name="year" value={filters.year} onChange={(e) => setFilters({...filters, year: e.target.value})}>
                                <option value="0">سنة الإنتاج</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
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

          {/* قائمة المنوعات */}
          <div className="container">
            <div className="widget">
              <div className="widget-body row flex-wrap">
                {mixData.map((mix) => (
                  <div key={mix.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
                    <div className="entry">
                      <div className="entry-image">
                        <Link href={`/mix/${mix.id}`}>
                          <a>
                            <img src={mix.poster} className="img-fluid lazy" alt={mix.title} />
                            <div className="entry-image-overlay">
                              <div className="overlay-top">
                                <div className="rating">
                                  <span className="fa fa-star checked"></span>
                                  <span>{mix.rating}</span>
                                </div>
                                {mix.episodes && (
                                  <span className="label series"><i className="icon-play mr-1"></i>{mix.episodes}</span>
                                )}
                              </div>
                              <div className="play-button">
                                <i className="icon-play"></i>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div>
                      <div className="entry-body px-3 pb-3 text-center">
                        <h3 className="entry-title mb-2">
                          <Link href={`/mix/${mix.id}`}>
                            <a className="text-white">{mix.title}</a>
                          </Link>
                        </h3>
                        <div className="entry-meta">
                          <span className="year">{mix.year}</span>
                          {mix.genre && (
                            <>
                              <span className="separator"> • </span>
                              <span className="genre">{mix.genre.join(', ')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper text-center mt-4">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">السابق</a>
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
                    <a className="page-link" href="#">التالي</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}