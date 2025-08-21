import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import AkwamHeader from '../components/AkwamHeader';
import MovieCard from '../components/MovieCard';
import '../assets/css/plugins.css';
import '../assets/css/style.css';
import '../assets/css/akwam.css';

interface SearchResult {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  type: 'movie' | 'series' | 'show' | 'person' | 'mix';
  genre?: string[];
  quality?: string;
  description?: string;
  episodes?: number;
  seasons?: number;
}

export default function Search() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // استخراج كلمة البحث من URL
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const query = urlParams.get('q') || '';
    setSearchQuery(query);
  }, [location]);

  // حذف البيانات التجريبية واستخدام API الحقيقي فقط

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['/api/search', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      // البحث في قاعدة البيانات الفعلية
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      return data.results || [];
    },
    enabled: !!searchQuery
  });

  useEffect(() => {
    document.body.className = 'header-fixed body-main';
    
    const breadcrumbSchema = {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://yemen-flix.replit.app/",
            "name": "يمن فليكس"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": `https://yemen-flix.replit.app/search?q=${searchQuery}`,
            "name": `البحث: ${searchQuery}`
          }
        }
      ]
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(scriptTag);

    return () => {
      document.body.className = '';
    };
  }, [searchQuery]);

  const filteredResults = results.filter((item: SearchResult) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'movie': return 'فيلم';
      case 'series': return 'مسلسل';
      case 'show': return 'برنامج';
      case 'person': return 'شخص';
      case 'mix': return 'منوعات';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'movie': return 'icon-video-camera';
      case 'series': return 'icon-monitor';
      case 'show': return 'icon-tv';
      case 'person': return 'icon-user';
      case 'mix': return 'icon-mix';
      default: return 'icon-file';
    }
  };

  return (
    <>
      <div className="site-container">
        <div className="main-header-top"></div>
        <AkwamHeader />
        <div className="main-header-height"></div>

        <div className="page page-search">
          <div className="container">
            <div className="search-header mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h1 className="search-title">
                    {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'البحث'}
                  </h1>
                  {searchQuery && (
                    <p className="search-results-count">
                      {filteredResults.length} نتيجة
                    </p>
                  )}
                </div>
                
                <div className="col-md-6">
                  <div className="search-form-container">
                    <form action="/search" method="get" className="search-form">
                      <input 
                        type="text" 
                        name="q" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث عن أفلام، مسلسلات، برامج..."
                        data-testid="search-input"
                      />
                      <button type="submit" data-testid="search-button">
                        <i className="icon-search"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {searchQuery && (
              <>
                <div className="search-filters mb-4">
                  <div className="filter-tabs d-flex flex-wrap">
                    <button 
                      className={`filter-tab btn ${filter === 'all' ? 'active' : ''}`}
                      onClick={() => setFilter('all')}
                    >
                      الكل ({results.length})
                    </button>
                    <button 
                      className={`filter-tab btn ${filter === 'movie' ? 'active' : ''}`}
                      onClick={() => setFilter('movie')}
                    >
                      أفلام ({results.filter((r: any) => r.type === 'movie').length})
                    </button>
                    <button 
                      className={`filter-tab btn ${filter === 'series' ? 'active' : ''}`}
                      onClick={() => setFilter('series')}
                    >
                      مسلسلات ({results.filter((r: any) => r.type === 'series').length})
                    </button>
                    <button 
                      className={`filter-tab btn ${filter === 'show' ? 'active' : ''}`}
                      onClick={() => setFilter('show')}
                    >
                      برامج ({results.filter((r: any) => r.type === 'show').length})
                    </button>
                    <button 
                      className={`filter-tab btn ${filter === 'person' ? 'active' : ''}`}
                      onClick={() => setFilter('person')}
                    >
                      أشخاص ({results.filter((r: any) => r.type === 'person').length})
                    </button>
                  </div>
                </div>

                <div className="search-results">
                  {isLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">جاري البحث...</span>
                      </div>
                    </div>
                  ) : filteredResults.length > 0 ? (
                    <div className="widget widget-style-1 mb-4" data-grid="6">
                      <div className="widget-body">
                        <div className="row" data-testid="search-results">
                          {filteredResults.map((item: any) => (
                            <div key={item.id} className="col-6 col-lg-2 col-md-3 col-xl-2 mb-12">
                              <div className="entry-box entry-box-1">
                                <div className="labels d-flex">
                                  <span className="label rating">
                                    <i className="icon-star mr-2"></i>{item.rating}
                                  </span>
                                  <span className="label type ml-2">
                                    <i className={`${getTypeIcon(item.type)} mr-1`}></i>
                                    {getTypeLabel(item.type)}
                                  </span>
                                  {item.quality && (
                                    <span className="label quality ml-2">{item.quality}</span>
                                  )}
                                  <span className="ml-auto"></span>
                                </div>
                                
                                <a href={`/${item.type}/${item.id}`} data-testid={`result-link-${item.id}`}>
                                  <div className="entry-image">
                                    <div 
                                      className="image"
                                      style={{
                                        backgroundImage: `url("${item.poster}")`,
                                        height: '300px',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                      }}
                                    ></div>
                                    <div className="entry-overlay">
                                      <div className="overlay-content">
                                        <div className="entry-title" data-testid={`result-title-${item.id}`}>
                                          {item.title}
                                        </div>
                                        <div className="entry-year">{item.year}</div>
                                        <div className="entry-type">{getTypeLabel(item.type)}</div>
                                        {item.type === 'series' && item.episodes && (
                                          <div className="entry-episodes">
                                            {item.seasons} موسم • {item.episodes} حلقة
                                          </div>
                                        )}
                                        {item.type === 'show' && item.episodes && (
                                          <div className="entry-episodes">{item.episodes} حلقة</div>
                                        )}
                                        {item.genre && item.genre.length > 0 && (
                                          <div className="entry-genre">{item.genre.join(', ')}</div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-results text-center py-5">
                      <i className="icon-search-outline font-size-48 text-muted mb-3"></i>
                      <h3>لا توجد نتائج</h3>
                      <p className="text-muted">
                        لم نجد أي نتائج تطابق بحثك عن "<strong>{searchQuery}</strong>"
                      </p>
                      <div className="search-suggestions">
                        <p>جرب:</p>
                        <ul className="list-unstyled">
                          <li>• التأكد من الإملاء</li>
                          <li>• استخدام كلمات أقل أو مختلفة</li>
                          <li>• البحث بكلمات أكثر عمومية</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {!searchQuery && (
              <div className="search-placeholder text-center py-5">
                <i className="icon-search font-size-48 text-muted mb-3"></i>
                <h3>ابحث في مكتبة يمن فليكس</h3>
                <p className="text-muted">
                  اكتشف آلاف الأفلام والمسلسلات والبرامج
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}