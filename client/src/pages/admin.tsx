import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TMDBDataFetcher from '../components/TMDBDataFetcher';

export default function AdminPanel() {
  const [stats, setStats] = useState({
    moviesCount: 0,
    seriesCount: 0,
    totalViews: 0,
    totalUsers: 0
  });

  // جلب إحصائيات قاعدة البيانات
  const { data: moviesData, refetch: refetchMovies } = useQuery({
    queryKey: ['/api/movies'],
    select: (data: any) => data?.movies || []
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['/api/categories']
  });

  const handleDataRefresh = () => {
    refetchMovies();
    // تحديث الإحصائيات
    if (moviesData) {
      setStats(prev => ({
        ...prev,
        moviesCount: moviesData.filter((m: any) => m.category === 'movie').length,
        seriesCount: moviesData.filter((m: any) => m.category === 'series').length,
        totalViews: moviesData.reduce((sum: number, m: any) => sum + (m.viewCount || 0), 0)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#161619] text-white" dir="rtl">
      {/* Header */}
      <header className="bg-[#27272c] border-b border-[#f3951e] p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-[#f3951e]">لوحة تحكم YEMEN_FLIX</h1>
          <p className="text-gray-400 mt-1">إدارة المحتوى وقاعدة البيانات</p>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#27272c] rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-[#f3951e] ml-4">🎬</div>
              <div>
                <div className="text-2xl font-bold text-white">{moviesData?.filter((m: any) => m.category === 'movie').length || 0}</div>
                <div className="text-gray-400">أفلام</div>
              </div>
            </div>
          </div>

          <div className="bg-[#27272c] rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-[#f3951e] ml-4">📺</div>
              <div>
                <div className="text-2xl font-bold text-white">{moviesData?.filter((m: any) => m.category === 'series').length || 0}</div>
                <div className="text-gray-400">مسلسلات</div>
              </div>
            </div>
          </div>

          <div className="bg-[#27272c] rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-[#f3951e] ml-4">👁️</div>
              <div>
                <div className="text-2xl font-bold text-white">{moviesData?.reduce((sum: number, m: any) => sum + (m.viewCount || 0), 0) || 0}</div>
                <div className="text-gray-400">مشاهدات</div>
              </div>
            </div>
          </div>

          <div className="bg-[#27272c] rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-3xl text-[#f3951e] ml-4">📊</div>
              <div>
                <div className="text-2xl font-bold text-white">{categoriesData?.length || 0}</div>
                <div className="text-gray-400">فئات</div>
              </div>
            </div>
          </div>
        </div>

        {/* إدارة البيانات */}
        <TMDBDataFetcher onDataFetched={handleDataRefresh} />

        {/* جدول الأفلام */}
        {moviesData && moviesData.length > 0 && (
          <div className="bg-[#27272c] rounded-lg overflow-hidden mt-8">
            <div className="p-4 border-b border-[#161619]">
              <h3 className="text-xl font-bold text-[#f3951e]">الأفلام المضافة حديثاً</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#161619]">
                  <tr>
                    <th className="text-right p-3 text-gray-300">الملصق</th>
                    <th className="text-right p-3 text-gray-300">العنوان</th>
                    <th className="text-right p-3 text-gray-300">السنة</th>
                    <th className="text-right p-3 text-gray-300">التقييم</th>
                    <th className="text-right p-3 text-gray-300">النوع</th>
                    <th className="text-right p-3 text-gray-300">المشاهدات</th>
                    <th className="text-right p-3 text-gray-300">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {moviesData.slice(0, 10).map((movie: any) => (
                    <tr key={movie.id} className="border-b border-[#161619] hover:bg-[#2a2a2f]">
                      <td className="p-3">
                        <img 
                          src={movie.poster || '/api/placeholder/300/450'} 
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="p-3">
                        <div className="text-white font-medium">{movie.title}</div>
                        <div className="text-gray-400 text-sm">{movie.originalTitle}</div>
                      </td>
                      <td className="p-3 text-gray-300">{movie.year}</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <span className="text-[#f3951e] ml-1">⭐</span>
                          <span className="text-white">{movie.rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          movie.category === 'movie' ? 'bg-blue-600' : 
                          movie.category === 'series' ? 'bg-green-600' : 'bg-gray-600'
                        }`}>
                          {movie.category === 'movie' ? 'فيلم' : 
                           movie.category === 'series' ? 'مسلسل' : movie.category}
                        </span>
                      </td>
                      <td className="p-3 text-gray-300">{movie.viewCount || 0}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-300 text-sm">
                            تعديل
                          </button>
                          <button className="text-red-400 hover:text-red-300 text-sm">
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-[#161619] text-center">
              <a href="/movies" className="text-[#f3951e] hover:text-[#e8891a]">
                عرض جميع الأفلام ({moviesData.length})
              </a>
            </div>
          </div>
        )}

        {/* أدوات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* إحصائيات متقدمة */}
          <div className="bg-[#27272c] rounded-lg p-6">
            <h4 className="text-lg font-bold text-[#f3951e] mb-4">إحصائيات متقدمة</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">أفلام جديدة:</span>
                <span className="text-white">{moviesData?.filter((m: any) => m.isNew).length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">أفلام مميزة:</span>
                <span className="text-white">{moviesData?.filter((m: any) => m.isFeatured).length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">متوسط التقييم:</span>
                <span className="text-white">
                  {moviesData && moviesData.length > 0 
                    ? (moviesData.reduce((sum: number, m: any) => sum + (m.rating || 0), 0) / moviesData.length).toFixed(1)
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* أدوات النظام */}
          <div className="bg-[#27272c] rounded-lg p-6">
            <h4 className="text-lg font-bold text-[#f3951e] mb-4">أدوات النظام</h4>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                نسخ احتياطية
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
                تحسين قاعدة البيانات
              </button>
              <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition-colors">
                تنظيف الملفات
              </button>
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="bg-[#27272c] rounded-lg p-6">
            <h4 className="text-lg font-bold text-[#f3951e] mb-4">روابط سريعة</h4>
            <div className="space-y-3">
              <a href="/" className="block text-blue-400 hover:text-blue-300">
                الصفحة الرئيسية
              </a>
              <a href="/movies" className="block text-blue-400 hover:text-blue-300">
                قائمة الأفلام
              </a>
              <a href="/series" className="block text-blue-400 hover:text-blue-300">
                قائمة المسلسلات
              </a>
              <a href="/contact" className="block text-blue-400 hover:text-blue-300">
                الرسائل
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}