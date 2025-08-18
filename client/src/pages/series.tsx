import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';

interface Series {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  seasons: number;
  episodes: number;
  genre?: string[];
  quality?: string;
  status: 'ongoing' | 'completed';
}

export default function Series() {
  const [filters, setFilters] = useState({
    section: '0',
    category: '0',
    rating: '0',
    year: '0'
  });

  // جلب المسلسلات من API بدلاً من البيانات الثابتة
  const { data: seriesData, isLoading, error } = useQuery({
    queryKey: ['/api/series'],
    select: (data: any) => data || []
  });

  useEffect(() => {
    document.body.className = 'header-fixed';
  }, []);

  return (
    <>
      {/* Hidden inputs for page identification */}
      <input type="hidden" id="page_app" value="series" />
      <input type="hidden" id="page_id" value="0" />

      {/* Archive Cover Section */}
      <div className="page page-archive">
        <div className="archive-cover mb-4" style={{backgroundImage: `url('https://img.downet.net/uploads/USfXq.webp')`}}>
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
                            <select className="form-control" name="section">
                              <option value="0">القسم</option>
                              <option value="29">عربي</option>
                              <option value="30">أجنبي</option>
                              <option value="31">هندي</option>
                              <option value="32">تركي</option>
                              <option value="33">آسيوي</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12 mb-lg-0">
                            <select className="form-control" name="category">
                              <option value="0">التصنيف</option>
                              <option value="87">رمضان</option>
                              <option value="30">أنمي</option>
                              <option value="18">أكشن</option>
                              <option value="71">مدبلج</option>
                              <option value="72">NETFLIX</option>
                              <option value="20">كوميدي</option>
                              <option value="35">إثارة</option>
                              <option value="34">غموض</option>
                              <option value="33">عائلي</option>
                              <option value="88">أطفال</option>
                              <option value="25">حربي</option>
                              <option value="32">رياضي</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12 mb-lg-0">
                            <select className="form-control" name="rating">
                              <option value="0">التقييم</option>
                              <option value="9">9+</option>
                              <option value="8">8+</option>
                              <option value="7">7+</option>
                              <option value="6">6+</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                          <div className="form-group mb-12 mb-lg-0">
                            <select className="form-control" name="year">
                              <option value="0">السنة</option>
                              <option value="2024">2024</option>
                              <option value="2023">2023</option>
                              <option value="2022">2022</option>
                              <option value="2021">2021</option>
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

        {/* Series List Content */}
        <div className="container">
          <div className="row">
            {seriesData.map((series: any) => (
              <div key={series.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="post-item">
                  <div className="post-poster">
                    <Link href={`/series/${series.id}`}>
                      <a className="d-block">
                        <img
                          src={series.poster}
                          className="img-fluid"
                          alt={series.title}
                        />
                        <div className="post-overlay">
                          <div className="post-quality">{series.quality}</div>
                          <div className="post-rating">
                            <i className="icon-star"></i>
                            {series.rating}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                  <div className="post-content">
                    <h3 className="post-title">
                      <Link href={`/series/${series.id}`}>
                        <a className="text-white">{series.title}</a>
                      </Link>
                    </h3>
                    <div className="post-meta text-muted">
                      <span>{series.year}</span>
                      <span className="mx-2">•</span>
                      <span>{series.seasons} موسم</span>
                      <span className="mx-2">•</span>
                      <span>{series.episodes} حلقة</span>
                    </div>
                    <div className="post-genres">
                      {series.genre?.map((g: string, index: number) => (
                        <span key={index} className="genre-tag">{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-5">
            <button className="btn btn-orange btn-pill px-5">
              <i className="icon-plus mr-2"></i>
              تحميل المزيد
            </button>
          </div>
        </div>
      </div>
    </>
  );
}