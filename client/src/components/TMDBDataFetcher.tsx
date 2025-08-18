import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface TMDBDataFetcherProps {
  onDataFetched?: (data: any) => void;
}

export default function TMDBDataFetcher({ onDataFetched }: TMDBDataFetcherProps) {
  const [isPopulating, setIsPopulating] = useState(false);
  const [populationStatus, setPopulationStatus] = useState<string>('');

  // جلب الأفلام الشائعة من TMDB
  const { data: popularMovies, isLoading: popularLoading } = useQuery({
    queryKey: ['/api/tmdb/popular-movies'],
    enabled: false
  });

  // تعبئة قاعدة البيانات بالأفلام
  const populateMovies = async () => {
    setIsPopulating(true);
    setPopulationStatus('جاري تعبئة الأفلام...');
    
    try {
      const response = await fetch('/api/admin/populate-movies', {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPopulationStatus('تم تعبئة الأفلام بنجاح! ✅');
        onDataFetched?.(result);
      } else {
        setPopulationStatus('خطأ في تعبئة الأفلام ❌');
      }
    } catch (error) {
      console.error('Population error:', error);
      setPopulationStatus('خطأ في الاتصال ❌');
    } finally {
      setIsPopulating(false);
    }
  };

  // تعبئة قاعدة البيانات بالمسلسلات
  const populateTVShows = async () => {
    setIsPopulating(true);
    setPopulationStatus('جاري تعبئة المسلسلات...');
    
    try {
      const response = await fetch('/api/admin/populate-tv', {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPopulationStatus('تم تعبئة المسلسلات بنجاح! ✅');
        onDataFetched?.(result);
      } else {
        setPopulationStatus('خطأ في تعبئة المسلسلات ❌');
      }
    } catch (error) {
      console.error('Population error:', error);
      setPopulationStatus('خطأ في الاتصال ❌');
    } finally {
      setIsPopulating(false);
    }
  };

  // تعبئة كاملة لقاعدة البيانات
  const populateAll = async () => {
    setIsPopulating(true);
    setPopulationStatus('جاري التعبئة الكاملة لقاعدة البيانات...');
    
    try {
      const response = await fetch('/api/admin/populate-all', {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPopulationStatus('تم تعبئة قاعدة البيانات بالكامل! 🎉');
        onDataFetched?.(result);
      } else {
        setPopulationStatus('خطأ في التعبئة الكاملة ❌');
      }
    } catch (error) {
      console.error('Population error:', error);
      setPopulationStatus('خطأ في الاتصال ❌');
    } finally {
      setIsPopulating(false);
    }
  };

  return (
    <div className="bg-[#161619] border border-[#27272c] rounded-lg p-6 mb-6" dir="rtl">
      <h3 className="text-xl font-bold text-[#f3951e] mb-4">إدارة قاعدة البيانات</h3>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={populateMovies}
            disabled={isPopulating}
            className="px-4 py-2 bg-[#f3951e] text-white rounded-lg hover:bg-[#e8891a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPopulating ? 'جاري العمل...' : 'تعبئة الأفلام'}
          </button>
          
          <button
            onClick={populateTVShows}
            disabled={isPopulating}
            className="px-4 py-2 bg-[#f3951e] text-white rounded-lg hover:bg-[#e8891a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPopulating ? 'جاري العمل...' : 'تعبئة المسلسلات'}
          </button>
          
          <button
            onClick={populateAll}
            disabled={isPopulating}
            className="px-4 py-2 bg-[#27272c] text-white rounded-lg hover:bg-[#333338] disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-[#f3951e]"
          >
            {isPopulating ? 'جاري العمل...' : 'تعبئة كاملة'}
          </button>
        </div>

        {populationStatus && (
          <div className="mt-4 p-3 bg-[#27272c] rounded-lg">
            <p className="text-white">{populationStatus}</p>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-400">
          <p>📝 ملاحظة: التعبئة الكاملة قد تستغرق عدة دقائق</p>
          <p>🎬 سيتم إضافة 500+ فيلم و 200+ مسلسل من TMDB</p>
        </div>
      </div>
    </div>
  );
}