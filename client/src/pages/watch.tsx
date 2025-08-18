import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { ArrowRight, Download, Share2, ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

export default function WatchPage() {
  const { id } = useParams();
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const server = urlParams.get('server') || 'yemenflix';
  const quality = urlParams.get('quality') || '1080p';

  useEffect(() => {
    document.body.className = 'header-fixed body-watch';
    return () => {
      document.body.className = '';
    };
  }, []);

  // بيانات الفيلم (في الوضع الحقيقي ستأتي من API)
  const movieData = {
    id: id,
    title: "فارس الظلام",
    originalTitle: "The Dark Knight",
    year: 2008,
    duration: "152 دقيقة",
    rating: 9.0,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/hqkIcbrOHL86UncnHIsHVcVmzue.jpg"
  };

  // مصادر الفيديو حسب السيرفر والجودة
  const videoSources = [
    {
      quality: '4K',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      size: '8.5 GB'
    },
    {
      quality: '1080p',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      size: '2.1 GB'
    },
    {
      quality: '720p',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      size: '1.2 GB'
    },
    {
      quality: '480p',
      url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      size: '650 MB'
    }
  ];

  const downloadLinks = [
    {
      quality: '4K',
      url: `/download/${id}?quality=4k`,
      size: '8.5 GB'
    },
    {
      quality: '1080p',
      url: `/download/${id}?quality=1080p`,
      size: '2.1 GB'
    },
    {
      quality: '720p',
      url: `/download/${id}?quality=720p`,
      size: '1.2 GB'
    },
    {
      quality: '480p',
      url: `/download/${id}?quality=480p`,
      size: '650 MB'
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: movieData.title,
        text: `شاهد ${movieData.title} على يمن فليكس`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط');
    }
  };

  return (
    <div className="min-h-screen bg-[#161619] text-white">
      {/* Header */}
      <header className="bg-[#27272c] border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <a
              href={`/movie/${id}`}
              className="flex items-center space-x-2 rtl:space-x-reverse text-gray-300 hover:text-white transition-colors"
            >
              <ArrowRight size={20} />
              <span>العودة لتفاصيل الفيلم</span>
            </a>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">{movieData.title}</h1>
              <div className="text-sm text-gray-400">
                {movieData.year} • {movieData.duration} • 
                <span className="inline-flex items-center mr-2">
                  <Star size={14} className="text-yellow-500 mr-1" />
                  {movieData.rating}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={handleShare}
                className="p-2 bg-[#161619] hover:bg-[#f3951e] rounded-lg transition-colors"
                title="مشاركة"
              >
                <Share2 size={18} />
              </button>
              <a
                href={downloadLinks.find(l => l.quality === quality)?.url}
                className="p-2 bg-[#161619] hover:bg-[#f3951e] rounded-lg transition-colors"
                title="تحميل"
              >
                <Download size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Video Player Section */}
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-[#27272c] rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">الآن تشاهد: {movieData.title}</h2>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
                    <span>السيرفر: {server}</span>
                    <span>•</span>
                    <span>الجودة: {quality}</span>
                  </div>
                </div>
              </div>

              <VideoPlayer
                movieId={id || '1'}
                title={movieData.title}
                poster={movieData.poster}
                sources={videoSources}
                downloadLinks={downloadLinks}
              />

              {/* Player Info */}
              <div className="mt-4 p-4 bg-[#161619] rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 bg-[#27272c] hover:bg-[#f3951e] rounded-lg transition-colors">
                        <ThumbsUp size={16} />
                        <span>أعجبني</span>
                      </button>
                      <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 bg-[#27272c] hover:bg-red-600 rounded-lg transition-colors">
                        <ThumbsDown size={16} />
                        <span>لم يعجبني</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-400">
                    عدد المشاهدات: 12,456 • تاريخ الإضافة: 2025/01/15
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Server Selection */}
              <div className="bg-[#27272c] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">تغيير السيرفر</h3>
                <div className="space-y-2">
                  {[
                    { id: 'yemenflix', name: 'يمن فليكس', status: 'online' },
                    { id: 'arab', name: 'سيرفر العرب', status: 'online' },
                    { id: 'mycima', name: 'MyCima', status: 'online' },
                    { id: 'faselhd', name: 'FaselHD', status: 'maintenance' }
                  ].map((srv) => (
                    <a
                      key={srv.id}
                      href={`/watch/${id}?server=${srv.id}&quality=${quality}`}
                      className={`block p-3 rounded-lg transition-colors ${
                        server === srv.id
                          ? 'bg-[#f3951e] text-white'
                          : srv.status === 'online'
                          ? 'bg-[#161619] hover:bg-[#f3951e] text-gray-300 hover:text-white'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{srv.name}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          srv.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              <div className="bg-[#27272c] rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">تغيير الجودة</h3>
                <div className="space-y-2">
                  {['4K', '1080p', '720p', '480p'].map((qual) => (
                    <a
                      key={qual}
                      href={`/watch/${id}?server=${server}&quality=${qual}`}
                      className={`block p-3 rounded-lg transition-colors ${
                        quality === qual
                          ? 'bg-[#f3951e] text-white'
                          : 'bg-[#161619] hover:bg-[#f3951e] text-gray-300 hover:text-white'
                      }`}
                    >
                      {qual}
                    </a>
                  ))}
                </div>
              </div>

              {/* Movie Info */}
              <div className="bg-[#27272c] rounded-lg p-4">
                <img
                  src={movieData.poster}
                  alt={movieData.title}
                  className="w-full rounded-lg mb-4"
                />
                <h3 className="font-semibold mb-2">{movieData.title}</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>السنة: {movieData.year}</div>
                  <div>المدة: {movieData.duration}</div>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    التقييم: {movieData.rating}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}