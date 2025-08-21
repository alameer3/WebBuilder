import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Download, Share2 } from 'lucide-react';

interface VideoPlayerProps {
  movieId: string;
  title: string;
  poster?: string;
  sources: Array<{
    quality: string;
    url: string;
    size?: string;
  }>;
  downloadLinks?: Array<{
    quality: string;
    url: string;
    size: string;
  }>;
}

export default function VideoPlayer({ movieId, title, poster, sources, downloadLinks }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(sources[0]?.quality || '720p');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const vol = parseFloat(e.target.value);
    video.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const changeQuality = (quality: string) => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const source = sources.find(s => s.quality === quality);
    if (source) {
      video.src = source.url;
      video.currentTime = currentTime;
      setSelectedQuality(quality);
      if (isPlaying) {
        video.play();
      }
    }
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const currentSource = sources.find(s => s.quality === selectedQuality);

  return (
    <div 
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={showControlsTemporarily}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-auto max-h-[70vh]"
        poster={poster}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {currentSource && (
          <source src={currentSource.url} type="video/mp4" />
        )}
        متصفحك لا يدعم تشغيل الفيديو.
      </video>

      {/* Loading/Play Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-[#f3951e] rounded-full flex items-center justify-center hover:bg-[#e8891a] transition-colors"
          >
            <Play size={32} className="text-white mr-1" />
          </button>
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #f3951e 0%, #f3951e ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#f3951e] transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-[#f3951e] transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-sm text-gray-300">{selectedQuality}</span>
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="relative">
                <button
                  onClick={() => setShowDownloads(!showDownloads)}
                  className="text-white hover:text-[#f3951e] transition-colors"
                  title="تحميل"
                >
                  <Download size={20} />
                </button>
                {showDownloads && downloadLinks && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#27272c] rounded-lg shadow-lg p-2 min-w-48">
                    <div className="text-white text-sm font-semibold mb-2">تحميل الفيلم</div>
                    {downloadLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        download
                        className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#f3951e] rounded transition-colors"
                      >
                        {link.quality} - {link.size}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="text-white hover:text-[#f3951e] transition-colors"
                title="مشاركة"
              >
                <Share2 size={20} />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-[#f3951e] transition-colors"
                  title="الإعدادات"
                >
                  <Settings size={20} />
                </button>
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-[#27272c] rounded-lg shadow-lg p-2 min-w-32">
                    <div className="text-white text-sm font-semibold mb-2">الجودة</div>
                    {sources.map((source) => (
                      <button
                        key={source.quality}
                        onClick={() => changeQuality(source.quality)}
                        className={`block w-full text-right px-3 py-1 text-sm rounded transition-colors ${
                          selectedQuality === source.quality
                            ? 'bg-[#f3951e] text-white'
                            : 'text-gray-300 hover:text-white hover:bg-gray-600'
                        }`}
                      >
                        {source.quality}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#f3951e] transition-colors"
                title="ملء الشاشة"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}