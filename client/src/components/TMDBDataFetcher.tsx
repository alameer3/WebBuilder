import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Download, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { apiRequest } from '../lib/queryClient';

export default function TMDBDataFetcher() {
  const [searchQuery, setSearchQuery] = useState('');
  const [importCount, setImportCount] = useState(20);
  const [importStatus, setImportStatus] = useState<string>('');
  
  const queryClient = useQueryClient();

  // Import single movie from TMDB
  const importMovieMutation = useMutation({
    mutationFn: (tmdbId: number) => apiRequest(`/api/admin/import-movie`, {
      method: 'POST',
      body: JSON.stringify({ tmdbId })
    }),
    onSuccess: (data) => {
      setImportStatus(`✅ تم إستيراد الفيلم: ${data.movie?.title}`);
      queryClient.invalidateQueries({ queryKey: ['/api/movies'] });
    },
    onError: (error: any) => {
      setImportStatus(`❌ خطأ: ${error.message}`);
    }
  });

  // Import popular movies
  const importPopularMutation = useMutation({
    mutationFn: () => apiRequest(`/api/admin/import-popular`, {
      method: 'POST',
      body: JSON.stringify({ count: importCount })
    }),
    onSuccess: (data) => {
      setImportStatus(`✅ تم إستيراد ${data.imported} فيلم، تم تخطي ${data.skipped} فيلم موجود`);
      queryClient.invalidateQueries({ queryKey: ['/api/movies'] });
    },
    onError: (error: any) => {
      setImportStatus(`❌ خطأ في الإستيراد: ${error.message}`);
    }
  });

  // Search TMDB
  const searchMutation = useMutation({
    mutationFn: (query: string) => apiRequest(`/api/admin/tmdb-search?query=${encodeURIComponent(query)}`),
    onSuccess: (data) => {
      console.log('Search results:', data);
    },
    onError: (error: any) => {
      setImportStatus(`❌ خطأ في البحث: ${error.message}`);
    }
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchMutation.mutate(searchQuery);
    }
  };

  const handleImportPopular = () => {
    importPopularMutation.mutate();
  };

  return (
    <div className="space-y-6">
      {/* Search TMDB */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Search size={20} />
          البحث في TMDB
        </h3>
        
        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن فيلم..."
            className="flex-1 bg-[#161619] border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-[#f3951e] focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={searchMutation.isPending || !searchQuery.trim()}
            className="bg-[#f3951e] hover:bg-[#e8891a] disabled:opacity-50 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Search size={18} />
            بحث
          </button>
        </div>
      </div>

      {/* Import Popular Movies */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Download size={20} />
          إستيراد الأفلام الشائعة
        </h3>
        
        <div className="flex items-center gap-4 mb-4">
          <label className="text-white">عدد الأفلام:</label>
          <select
            value={importCount}
            onChange={(e) => setImportCount(parseInt(e.target.value))}
            className="bg-[#161619] border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-[#f3951e] focus:outline-none"
          >
            <option value={10}>10 أفلام</option>
            <option value={20}>20 فيلم</option>
            <option value={50}>50 فيلم</option>
            <option value={100}>100 فيلم</option>
          </select>
        </div>

        <button
          onClick={handleImportPopular}
          disabled={importPopularMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          {importPopularMutation.isPending ? 'جاري الإستيراد...' : 'إستيراد الأفلام الشائعة'}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#27272c] rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">إجراءات سريعة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => importMovieMutation.mutate(550)} // Fight Club
            disabled={importMovieMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-center transition-colors"
          >
            إستيراد Fight Club
          </button>
          
          <button
            onClick={() => importMovieMutation.mutate(680)} // Pulp Fiction
            disabled={importMovieMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-center transition-colors"
          >
            إستيراد Pulp Fiction
          </button>
          
          <button
            onClick={() => importMovieMutation.mutate(13)} // Forrest Gump
            disabled={importMovieMutation.isPending}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-center transition-colors"
          >
            إستيراد Forrest Gump
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {importStatus && (
        <div className={`p-4 rounded-lg border ${
          importStatus.includes('✅') 
            ? 'bg-green-900/50 border-green-600 text-green-300' 
            : 'bg-red-900/50 border-red-600 text-red-300'
        }`}>
          <div className="flex items-center gap-2">
            {importStatus.includes('✅') ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{importStatus}</span>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
        <h4 className="text-blue-300 font-bold mb-2">تعليمات الإستخدام:</h4>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• استخدم البحث للعثور على أفلام محددة من TMDB</li>
          <li>• استخدم الإستيراد السريع لإضافة الأفلام الشائعة</li>
          <li>• جميع الأفلام المستوردة ستظهر في قاعدة البيانات المحلية</li>
          <li>• يمكنك تعديل تفاصيل الأفلام بعد الإستيراد من صفحة إدارة الأفلام</li>
        </ul>
      </div>
    </div>
  );
}