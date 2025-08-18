import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, Edit, Trash2, Eye, Star, Filter, Tv } from 'lucide-react';

export default function Series() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { data: moviesData = [], isLoading } = useQuery({
    queryKey: ['/api/movies'],
    select: (data: any) => data?.movies || []
  });

  // Filter only series
  const seriesData = moviesData.filter((item: any) => item.category === 'series');
  
  // Filter series based on search
  const filteredSeries = seriesData.filter((series: any) => {
    return series.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           series.originalTitle?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination
  const totalPages = Math.ceil(filteredSeries.length / itemsPerPage);
  const paginatedSeries = filteredSeries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">إدارة المسلسلات</h1>
          <p className="text-gray-400 mt-1">إدارة وتحرير مكتبة المسلسلات</p>
        </div>
        <button className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={20} />
          إضافة مسلسل جديد
        </button>
      </div>

      {/* Search and Stats */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="البحث في المسلسلات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161619] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-[#f3951e] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-6 text-sm">
          <span className="text-gray-400">
            إجمالي المسلسلات: <span className="text-white font-bold">{seriesData.length}</span>
          </span>
          <span className="text-gray-400">
            النتائج المعروضة: <span className="text-white font-bold">{filteredSeries.length}</span>
          </span>
        </div>
      </div>

      {/* Series Table */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#161619]">
              <tr>
                <th className="text-right p-4 text-gray-300 font-medium">الملصق</th>
                <th className="text-right p-4 text-gray-300 font-medium">العنوان</th>
                <th className="text-right p-4 text-gray-300 font-medium">السنة</th>
                <th className="text-right p-4 text-gray-300 font-medium">التقييم</th>
                <th className="text-right p-4 text-gray-300 font-medium">المواسم</th>
                <th className="text-right p-4 text-gray-300 font-medium">المشاهدات</th>
                <th className="text-right p-4 text-gray-300 font-medium">الحالة</th>
                <th className="text-right p-4 text-gray-300 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSeries.map((series: any) => (
                <tr key={series.id} className="border-b border-gray-700 hover:bg-[#2a2a2f] transition-colors">
                  <td className="p-4">
                    <img 
                      src={series.poster || '/api/placeholder/60/90'} 
                      alt={series.title}
                      className="w-12 h-18 object-cover rounded shadow-md"
                    />
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{series.title}</div>
                    {series.originalTitle && (
                      <div className="text-gray-400 text-sm mt-1">{series.originalTitle}</div>
                    )}
                  </td>
                  <td className="p-4 text-gray-300">{series.year || 'غير محدد'}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-[#f3951e] fill-current" size={16} />
                      <span className="text-white">{series.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{series.seasons || 'غير محدد'}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Eye size={16} />
                      <span>{series.viewCount?.toLocaleString('ar-SA') || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      series.isPublished ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                    }`}>
                      {series.isPublished ? 'منشور' : 'مسودة'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-400/10 transition-colors"
                        title="تعديل"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-400/10 transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              عرض {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredSeries.length)} من {filteredSeries.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-[#161619] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2f] transition-colors"
              >
                السابق
              </button>
              <span className="px-3 py-1 text-gray-300">
                {currentPage} من {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-[#161619] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2f] transition-colors"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredSeries.length === 0 && !isLoading && (
        <div className="bg-[#27272c] rounded-lg border border-gray-700 p-12 text-center">
          <Tv size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">لا توجد مسلسلات</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm 
              ? 'لم يتم العثور على مسلسلات مطابقة لمعايير البحث'
              : 'لم يتم إضافة أي مسلسلات بعد'
            }
          </p>
          <button className="bg-[#f3951e] hover:bg-[#e8891a] text-white px-4 py-2 rounded-lg">
            إضافة أول مسلسل
          </button>
        </div>
      )}
    </div>
  );
}