import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";

interface Episode {
  id: number;
  title: string;
  seriesTitle: string;
  episodeNumber: number;
  season: number;
  description: string;
  duration: string;
  airDate: string;
  thumbnail: string;
  videoUrl: string;
}

export default function EpisodeDetail() {
  const [, params] = useRoute("/episode/:seriesId/:episodeId");
  const { seriesId, episodeId } = params || {};

  const { data: episode, isLoading } = useQuery<Episode>({
    queryKey: ['/api/episodes', seriesId, episodeId],
    enabled: !!seriesId && !!episodeId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#161619] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-6"></div>
            <div className="aspect-video bg-gray-700 rounded mb-6"></div>
            <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-[#161619] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">الحلقة غير موجودة</h1>
            <p className="text-gray-400">عذراً، لم نتمكن من العثور على هذه الحلقة.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161619] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* عنوان الحلقة */}
        <div className="mb-6">
          <nav className="text-sm text-gray-400 mb-2">
            <a href="/series" className="hover:text-[#f3951e]">المسلسلات</a>
            <span className="mx-2">›</span>
            <a href={`/series/${seriesId}`} className="hover:text-[#f3951e]">{episode.seriesTitle}</a>
            <span className="mx-2">›</span>
            <span>الحلقة {episode.episodeNumber}</span>
          </nav>
          <h1 className="text-3xl font-bold text-[#f3951e] mb-2">{episode.title}</h1>
          <p className="text-gray-400">
            {episode.seriesTitle} - الموسم {episode.season} الحلقة {episode.episodeNumber}
          </p>
        </div>

        {/* مشغل الفيديو */}
        <div className="aspect-video bg-black rounded-lg mb-6 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#f3951e] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">جاري تحميل الحلقة...</p>
            </div>
          </div>
        </div>

        {/* معلومات الحلقة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* التفاصيل الرئيسية */}
          <div className="lg:col-span-2">
            <div className="bg-[#27272c] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">تفاصيل الحلقة</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-400">مدة الحلقة:</span>
                  <span className="mr-2 text-white">{episode.duration}</span>
                </div>
                <div>
                  <span className="text-gray-400">تاريخ العرض:</span>
                  <span className="mr-2 text-white">{episode.airDate}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">ملخص الحلقة</h3>
                <p className="text-gray-300 leading-relaxed">{episode.description}</p>
              </div>
            </div>

            {/* أزرار التنقل */}
            <div className="flex gap-4">
              <button className="bg-[#f3951e] hover:bg-[#d17f1a] text-white px-6 py-2 rounded-lg transition-colors">
                الحلقة السابقة
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
                الحلقة التالية
              </button>
            </div>
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* معلومات المسلسل */}
            <div className="bg-[#27272c] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">حول المسلسل</h3>
              <div className="text-center mb-4">
                <img 
                  src={episode.thumbnail} 
                  alt={episode.seriesTitle}
                  className="w-full max-w-48 mx-auto rounded-lg"
                />
              </div>
              <h4 className="font-semibold text-[#f3951e] mb-2">{episode.seriesTitle}</h4>
              <p className="text-sm text-gray-400 mb-4">
                الموسم {episode.season} - {episode.episodeNumber} حلقة
              </p>
              <button className="w-full bg-[#f3951e] hover:bg-[#d17f1a] text-white py-2 px-4 rounded-lg transition-colors">
                عرض جميع الحلقات
              </button>
            </div>

            {/* حلقات أخرى */}
            <div className="bg-[#27272c] rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">حلقات أخرى</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((ep) => (
                  <div key={ep} className="flex items-center gap-3 p-2 hover:bg-[#3a3a3f] rounded cursor-pointer transition-colors">
                    <div className="w-16 h-12 bg-gray-600 rounded flex items-center justify-center">
                      <span className="text-sm">{ep}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">الحلقة {ep}</p>
                      <p className="text-xs text-gray-400">45 دقيقة</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}