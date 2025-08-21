import TMDBDataFetcher from '../../components/TMDBDataFetcher';
import { useQuery } from '@tanstack/react-query';
import { Database, Download, Trash2, RefreshCw, AlertCircle } from 'lucide-react';

export default function DataManager() {
  const { data: moviesData, refetch: refetchMovies } = useQuery({
    queryKey: ['/api/movies'],
    select: (data: any) => data?.movies || []
  });

  const handleDataRefresh = () => {
    refetchMovies();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">إدارة البيانات</h1>
          <p className="text-gray-400 mt-1">استيراد وإدارة بيانات الأفلام والمسلسلات من TMDB</p>
        </div>
        <button 
          onClick={handleDataRefresh}
          className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <RefreshCw size={20} />
          تحديث البيانات
        </button>
      </div>

      {/* Current Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Database className="text-blue-400" size={24} />
            <div>
              <h3 className="text-white font-bold">الأفلام المحفوظة</h3>
              <p className="text-2xl font-bold text-blue-400">
                {moviesData?.filter((m: any) => m.category === 'movie').length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Database className="text-green-400" size={24} />
            <div>
              <h3 className="text-white font-bold">المسلسلات المحفوظة</h3>
              <p className="text-2xl font-bold text-green-400">
                {moviesData?.filter((m: any) => m.category === 'series').length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Database className="text-[#f3951e]" size={24} />
            <div>
              <h3 className="text-white font-bold">إجمالي المحتوى</h3>
              <p className="text-2xl font-bold text-[#f3951e]">
                {moviesData?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TMDB Data Fetcher */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Download size={24} />
            استيراد البيانات من TMDB
          </h2>
          <p className="text-gray-400 mt-2">
            استخدم هذه الأداة لاستيراد الأفلام والمسلسلات من قاعدة بيانات TMDB
          </p>
        </div>
        <div className="p-6">
          <TMDBDataFetcher onDataFetched={handleDataRefresh} />
        </div>
      </div>

      {/* Data Management Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Operations */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">عمليات قاعدة البيانات</h3>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Database size={20} />
              نسخ احتياطية من قاعدة البيانات
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <RefreshCw size={20} />
              تحسين قاعدة البيانات
            </button>
            <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <AlertCircle size={20} />
              فحص سلامة البيانات
            </button>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Trash2 size={20} />
              مسح البيانات المكررة
            </button>
          </div>
        </div>

        {/* Import History */}
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">سجل الاستيراد</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#161619] rounded">
                <div>
                  <p className="text-white text-sm">استيراد الأفلام الشائعة</p>
                  <p className="text-gray-400 text-xs">منذ ساعتين</p>
                </div>
                <span className="text-green-400 text-sm">✓ نجح</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#161619] rounded">
                <div>
                  <p className="text-white text-sm">استيراد المسلسلات الأعلى تقييماً</p>
                  <p className="text-gray-400 text-xs">أمس</p>
                </div>
                <span className="text-green-400 text-sm">✓ نجح</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#161619] rounded">
                <div>
                  <p className="text-white text-sm">استيراد الأفلام الجديدة</p>
                  <p className="text-gray-400 text-xs">منذ 3 أيام</p>
                </div>
                <span className="text-green-400 text-sm">✓ نجح</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Additions */}
      {moviesData && moviesData.length > 0 && (
        <div className="bg-[#27272c] rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold text-white">آخر الإضافات</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {moviesData.slice(0, 8).map((movie: any) => (
                <div key={movie.id} className="bg-[#161619] rounded-lg overflow-hidden">
                  <img 
                    src={movie.poster || '/api/placeholder/200/300'} 
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-white font-medium text-sm truncate">{movie.title}</h4>
                    <p className="text-gray-400 text-xs mt-1">{movie.year}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-[#f3951e] text-xs">⭐</span>
                      <span className="text-gray-300 text-xs">{movie.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}