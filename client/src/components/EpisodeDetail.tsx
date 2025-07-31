import { useParams, Link } from "wouter";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// استيراد الصور والأصول المطلوبة
import logoWhite from "../assets/images/logo-white.svg";
import defaultAvatar from "../assets/images/default.jpg";

declare global {
  interface Window {
    $: any;
  }
}

interface EpisodeDetail {
  id: string;
  title: string;
  episodeNumber: number;
  seasonNumber: number;
  description: string;
  duration: string;
  airDate: string;
  poster?: string;
  seriesId: string;
  seriesTitle: string;
  servers: Array<{
    name: string;
    url: string;
    quality: string;
  }>;
  nextEpisode?: {
    id: string;
    episodeNumber: number;
  };
  previousEpisode?: {
    id: string;
    episodeNumber: number;
  };
}

export default function EpisodeDetail() {
  const { seriesId, episodeId } = useParams<{ seriesId: string; episodeId: string }>();

  useEffect(() => {
    document.body.className = 'header-fixed header-pages pace-done';

    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      setTimeout(() => {
        if (window.$) {
          const $ = window.$;
          
          $(".menu-toggle").on("click", function(){
            $("body").removeClass("search-active").toggleClass("main-menu-active");
          });
          
          $(".site-overlay").on("click", function(){
            $("body").removeClass("main-menu-active search-active");
          });

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

  const { data: episode, isLoading } = useQuery<EpisodeDetail>({
    queryKey: ['/api/episodes', seriesId, episodeId],
    queryFn: () => Promise.resolve({
      id: episodeId || "1",
      title: "الحلقة الأولى - البداية",
      episodeNumber: 1,
      seasonNumber: 1,
      description: "في هذه الحلقة، نتعرف على الشخصيات الرئيسية ونبدأ رحلة مشوقة مليئة بالأحداث المثيرة والمفاجآت التي تجعل المشاهد في حالة ترقب مستمر.",
      duration: "45 دقيقة",
      airDate: "2025-01-01",
      poster: defaultAvatar,
      seriesId: seriesId || "220-days",
      seriesTitle: "220 يوم",
      servers: [
        { name: "الخادم الأول", url: "#", quality: "1080p" },
        { name: "الخادم الثاني", url: "#", quality: "720p" },
        { name: "الخادم الثالث", url: "#", quality: "480p" }
      ],
      nextEpisode: { id: "2", episodeNumber: 2 },
      previousEpisode: undefined
    })
  });

  if (isLoading) {
    return <div className="loading-container">جارٍ التحميل...</div>;
  }

  if (!episode) {
    return <div className="error-container">الحلقة غير موجودة</div>;
  }

  return (
    <div className="site-container">
      <input type="hidden" name="page_app" value="episode" />
      <input type="hidden" name="page_id" value={episodeId} />
      
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
          </div>
        </div>
      </header>

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
            <li className="breadcrumb-item">
              <Link href={`/series/${episode.seriesId}`}>
                {episode.seriesTitle}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              الحلقة {episode.episodeNumber}
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Episode Info Section */}
          <div className="episode-info-section py-5">
            <div className="row">
              {/* Episode Poster */}
              <div className="col-lg-4 col-md-5">
                <div className="episode-poster">
                  <img src={episode.poster} alt={episode.title} className="poster-img" />
                  
                  {/* Episode Meta */}
                  <div className="episode-meta mt-3">
                    <div className="meta-item">
                      <span className="label">الموسم:</span>
                      <span className="value">{episode.seasonNumber}</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">الحلقة:</span>
                      <span className="value">{episode.episodeNumber}</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">المدة:</span>
                      <span className="value">{episode.duration}</span>
                    </div>
                    <div className="meta-item">
                      <span className="label">تاريخ العرض:</span>
                      <span className="value">{episode.airDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Episode Details */}
              <div className="col-lg-8 col-md-7">
                <div className="episode-details">
                  <h1 className="episode-title">{episode.title}</h1>
                  <h2 className="series-title">
                    <Link href={`/series/${episode.seriesId}`}>
                      {episode.seriesTitle}
                    </Link>
                  </h2>

                  {/* Description */}
                  <div className="episode-description">
                    <p>{episode.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button className="btn btn-primary btn-watch">
                      <i className="icon-play"></i>
                      مشاهدة الحلقة
                    </button>
                    <button className="btn btn-outline btn-download">
                      <i className="icon-download"></i>
                      تحميل
                    </button>
                    <button className="btn btn-outline btn-favorite">
                      <i className="icon-heart"></i>
                      قائمتي
                    </button>
                  </div>

                  {/* Episode Navigation */}
                  <div className="episode-navigation">
                    {episode.previousEpisode && (
                      <Link
                        href={`/series/${episode.seriesId}/episode/${episode.previousEpisode.id}`}
                        className="btn btn-secondary nav-btn prev-episode"
                      >
                        <i className="icon-arrow-left"></i>
                        الحلقة السابقة ({episode.previousEpisode.episodeNumber})
                      </Link>
                    )}
                    {episode.nextEpisode && (
                      <Link
                        href={`/series/${episode.seriesId}/episode/${episode.nextEpisode.id}`}
                        className="btn btn-secondary nav-btn next-episode"
                      >
                        الحلقة التالية ({episode.nextEpisode.episodeNumber})
                        <i className="icon-arrow-right"></i>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Player Section */}
          <div className="video-player-section mb-5">
            <h3 className="section-title">خوادم المشاهدة</h3>
            <div className="servers-list">
              {episode.servers.map((server, index) => (
                <div key={index} className="server-item">
                  <a href={server.url} className="server-link" target="_blank" rel="noopener noreferrer">
                    <div className="server-info">
                      <h4 className="server-name">{server.name}</h4>
                      <span className="server-quality">{server.quality}</span>
                    </div>
                    <i className="icon-play server-icon"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Return to Series */}
          <div className="return-to-series text-center py-4">
            <Link href={`/series/${episode.seriesId}`} className="btn btn-outline btn-lg">
              <i className="icon-arrow-right ml-2"></i>
              العودة إلى صفحة المسلسل
            </Link>
          </div>
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