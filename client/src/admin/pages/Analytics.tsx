import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Eye, Users, Download, Star, Calendar } from 'lucide-react';

export default function Analytics() {
  const { data: moviesData = [] } = useQuery({
    queryKey: ['/api/movies'],
    select: (data: any) => data?.movies || []
  });

  // Calculate analytics data
  const totalViews = moviesData.reduce((sum: number, movie: any) => sum + (movie.viewCount || 0), 0);
  const averageRating = moviesData.length > 0 
    ? moviesData.reduce((sum: number, movie: any) => sum + (movie.rating || 0), 0) / moviesData.length 
    : 0;

  const topMovies = moviesData
    .sort((a: any, b: any) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5);

  const topRated = moviesData
    .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">التحليلات والإحصائيات</h1>
        <p className="text-gray-400 mt-1">نظرة شاملة على أداء المنصة</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Eye className="text-blue-400" size={24} />
            <div>
              <h3 className="text-white font-bold">إجمالي المشاهدات</h3>
              <p className="text-2xl font-bold text-blue-400">
                {totalViews.toLocaleString('ar-SA')}
              </p>
              <p className="text-green-400 text-sm">+12% هذا الشهر</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Star className="text-[#f3951e]" size={24} />
            <div>
              <h3 className="text-white font-bold">متوسط التقييم</h3>
              <p className="text-2xl font-bold text-[#f3951e]">
                {averageRating.toFixed(1)}
              </p>
              <p className="text-green-400 text-sm">+0.2 هذا الشهر</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Users className="text-green-400" size={24} />
            <div>
              <h3 className="text-white font-bold">المستخدمون النشطون</h3>
              <p className="text-2xl font-bold text-green-400">2,486</p>
              <p className="text-green-400 text-sm">+8% هذا الأسبوع</p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Download className="text-purple-400" size={24} />
            <div>
              <h3 className="text-white font-bold">التحميلات</h3>
              <p className="text-2xl font-bold text-purple-400">8,924</p>
              <p className="text-green-400 text-sm">+15% اليوم</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* View Trends */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp size={20} />
              اتجاهات المشاهدة
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Simple chart representation */}
              <div className="grid grid-cols-7 gap-2 h-32">
                {[65, 45, 78, 92, 56, 73, 85].map((height, index) => (
                  <div key={index} className="flex flex-col justify-end">
                    <div 
                      className="bg-[#f3951e] rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-400 text-center mt-1">
                      {['ج', 'ح', 'خ', 'س', 'ع', 'ث', 'أ'][index]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm text-center">آخر 7 أيام</p>
            </div>
          </div>
        </div>

        {/* Content Distribution */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">توزيع المحتوى</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">الأفلام</span>
                <span className="text-blue-400 font-bold">
                  {moviesData.filter((m: any) => m.category === 'movie').length}
                </span>
              </div>
              <div className="w-full bg-[#161619] rounded-full h-3">
                <div 
                  className="bg-blue-400 h-3 rounded-full"
                  style={{ 
                    width: `${(moviesData.filter((m: any) => m.category === 'movie').length / moviesData.length) * 100 || 0}%` 
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">المسلسلات</span>
                <span className="text-green-400 font-bold">
                  {moviesData.filter((m: any) => m.category === 'series').length}
                </span>
              </div>
              <div className="w-full bg-[#161619] rounded-full h-3">
                <div 
                  className="bg-green-400 h-3 rounded-full"
                  style={{ 
                    width: `${(moviesData.filter((m: any) => m.category === 'series').length / moviesData.length) * 100 || 0}%` 
                  }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400">أخرى</span>
                <span className="text-purple-400 font-bold">
                  {moviesData.filter((m: any) => m.category !== 'movie' && m.category !== 'series').length}
                </span>
              </div>
              <div className="w-full bg-[#161619] rounded-full h-3">
                <div 
                  className="bg-purple-400 h-3 rounded-full"
                  style={{ 
                    width: `${(moviesData.filter((m: any) => m.category !== 'movie' && m.category !== 'series').length / moviesData.length) * 100 || 0}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Content Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Viewed */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">الأكثر مشاهدة</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topMovies.map((movie: any, index: number) => (
                <div key={movie.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#f3951e] rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <img 
                    src={movie.poster || '/api/placeholder/40/60'} 
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{movie.title}</p>
                    <p className="text-gray-400 text-xs">{movie.year}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">
                      {(movie.viewCount || 0).toLocaleString('ar-SA')}
                    </p>
                    <p className="text-gray-400 text-xs">مشاهدة</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Rated */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">الأعلى تقييماً</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topRated.map((movie: any, index: number) => (
                <div key={movie.id} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#f3951e] rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <img 
                    src={movie.poster || '/api/placeholder/40/60'} 
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{movie.title}</p>
                    <p className="text-gray-400 text-xs">{movie.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="text-[#f3951e] fill-current" size={14} />
                      <span className="text-white font-bold text-sm">
                        {(movie.rating || 0).toFixed(1)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">تقييم</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-bold text-white">مصادر الزيارات</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">45%</div>
              <div className="text-gray-400 text-sm">البحث المباشر</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">28%</div>
              <div className="text-gray-400 text-sm">وسائل التواصل</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#f3951e]">18%</div>
              <div className="text-gray-400 text-sm">المواقع المرجعية</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">9%</div>
              <div className="text-gray-400 text-sm">أخرى</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}