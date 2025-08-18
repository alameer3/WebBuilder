import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  poster?: string;
  title?: string;
  downloadLinks?: Array<{
    quality: string;
    url: string;
    size: string;
  }>;
}

export default function AdvancedVideoPlayer({ 
  videoUrl, 
  poster, 
  title,
  downloadLinks = []
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('HD');
  const [showControls, setShowControls] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // إخفاء/إظهار التحكم
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // تشغيل/إيقاف الفيديو
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // تغيير الوقت
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // تحديد مدة الفيديو
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // تغيير موضع التشغيل
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // تغيير الصوت
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // كتم الصوت
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // الشاشة الكاملة
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // تنسيق الوقت
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  if (!videoUrl) {
    return (
      <div className="video-player-container bg-[#161619] rounded-lg overflow-hidden" dir="rtl">
        <div className="aspect-video bg-[#27272c] flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">🎬</div>
            <div className="text-xl mb-2">لا يوجد فيديو متاح</div>
            <div className="text-sm">سيتم إضافة الفيديو قريباً</div>
          </div>
        </div>
        
        {/* قوائم التحميل */}
        {downloadLinks.length > 0 && (
          <div className="p-4 border-t border-[#27272c]">
            <h4 className="text-[#f3951e] font-bold mb-3">روابط التحميل</h4>
            <div className="space-y-2">
              {downloadLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between bg-[#27272c] p-3 rounded-lg">
                  <div>
                    <span className="text-white font-medium">{link.quality}</span>
                    <span className="text-gray-400 mr-2">({link.size})</span>
                  </div>
                  <a 
                    href={link.url}
                    className="bg-[#f3951e] text-white px-4 py-2 rounded-lg hover:bg-[#e8891a] transition-colors"
                    download
                  >
                    تحميل
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`video-player-container bg-[#161619] rounded-lg overflow-hidden relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      dir="rtl"
    >
      {/* الفيديو */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={poster}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو
        </video>

        {/* شاشة التحميل */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f3951e]"></div>
          </div>
        )}

        {/* زر التشغيل الكبير */}
        {!isPlaying && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-[#f3951e] hover:bg-[#e8891a] text-white rounded-full p-6 transition-colors shadow-lg"
            >
              <svg className="w-8 h-8 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* أدوات التحكم */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* شريط التقدم */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={duration > 0 ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* أزرار التحكم */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* تشغيل/إيقاف */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#f3951e] transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* الصوت */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-[#f3951e] transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.025 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.025l4.358-3.816z" clipRule="evenodd" />
                      <path d="M11.295 7.295a1 1 0 000 1.414L12.709 10l-1.414 1.291a1 1 0 101.414 1.414L14 11.414l1.291 1.291a1 1 0 001.414-1.414L15.414 10l1.291-1.295a1 1 0 00-1.414-1.414L14 8.586l-1.295-1.291a1 1 0 00-1.41 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.025 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.025l4.358-3.816z" clipRule="evenodd" />
                      <path d="M11 7a1 1 0 011-1 5 5 0 010 8 1 1 0 11-2 0 3 3 0 000-6z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* الوقت */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              {/* اختيار الجودة */}
              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="bg-[#27272c] text-white text-sm rounded px-2 py-1 border border-[#f3951e]"
              >
                <option value="HD">HD</option>
                <option value="FHD">FHD</option>
                <option value="4K">4K</option>
              </select>

              {/* الشاشة الكاملة */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#f3951e] transition-colors"
              >
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* قوائم التحميل */}
      {downloadLinks.length > 0 && (
        <div className="p-4 border-t border-[#27272c]">
          <h4 className="text-[#f3951e] font-bold mb-3">روابط التحميل</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {downloadLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between bg-[#27272c] p-3 rounded-lg">
                <div>
                  <span className="text-white font-medium">{link.quality}</span>
                  <span className="text-gray-400 mr-2">({link.size})</span>
                </div>
                <a 
                  href={link.url}
                  className="bg-[#f3951e] text-white px-4 py-2 rounded-lg hover:bg-[#e8891a] transition-colors"
                  download
                >
                  تحميل
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}