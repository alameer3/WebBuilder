// صفحة المشاهدة - مطابقة لـ ak.sv تماماً
import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Download, Share2, Heart, ThumbsUp } from 'lucide-react';

// استيراد CSS الأصلي
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/akwam.css';

export default function Watch() {
  const params = useParams();
  const movieId = params.id;
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // جلب تفاصيل الفيلم
  const { data: movieResponse, isLoading } = useQuery({
    queryKey: ['/api/movies', movieId],
    enabled: !!movieId
  });

  const movie = Array.isArray(movieResponse) ? 
    movieResponse.find((m: any) => m.id === movieId) : 
    (movieResponse as any)?.movies?.find((m: any) => m.id === movieId) || 
    movieResponse;

  useEffect(() => {
    // تطبيق كلاسات body للمشاهدة
    document.body.className = 'header-fixed body-watch';
    
    if (movie) {
      document.title = `مشاهدة ${movie.title} | يمن فليكس`;
    }

    // إخفاء الكنترولز تلقائياً
    const hideControlsTimer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(hideControlsTimer);
  }, [movie]);

  // مراقبة أحداث الفيديو
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
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
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="watch-container loading">
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>جاري تحضير الفيديو...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="watch-container error">
        <div className="error-message">
          <h3>خطأ في تحميل الفيديو</h3>
          <Link href="/movies" className="btn btn-primary">العودة للأفلام</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="watch-container">
      {/* Video Player */}
      <div 
        className={`video-player-wrapper ${isFullscreen ? 'fullscreen' : ''}`}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="main-video"
          poster={movie.backdrop || movie.poster}
          onClick={togglePlay}
        >
          <source src={`/api/video/${movie.id}?quality=${quality}`} type="video/mp4" />
          <track kind="subtitles" src={`/api/subtitles/${movie.id}`} srcLang="ar" label="العربية" default />
          المتصفح لا يدعم تشغيل الفيديو
        </video>

        {/* Video Controls Overlay */}
        <div className={`video-controls-overlay ${showControls ? 'show' : 'hide'}`}>
          {/* Top Controls */}
          <div className="video-controls-top">
            <div className="video-title">
              <h4>{movie.title}</h4>
              <p>الجودة: {quality}</p>
            </div>
            <div className="video-actions">
              <button className="control-btn" title="المفضلة">
                <Heart size={20} />
              </button>
              <button className="control-btn" title="مشاركة">
                <Share2 size={20} />
              </button>
              <button className="control-btn" title="تحميل">
                <Download size={20} />
              </button>
            </div>
          </div>

          {/* Center Play Button */}
          {!isPlaying && (
            <div className="video-center-control">
              <button className="play-btn-large" onClick={togglePlay}>
                <Play size={48} />
              </button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="video-controls-bottom">
            {/* Progress Bar */}
            <div className="progress-container">
              <input
                type="range"
                className="progress-bar"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
              />
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span>/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="controls-row">
              <div className="left-controls">
                <button className="control-btn" onClick={togglePlay}>
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="volume-control">
                  <button className="control-btn" onClick={toggleMute}>
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>

              <div className="right-controls">
                <div className="quality-selector">
                  <select 
                    value={quality} 
                    onChange={(e) => setQuality(e.target.value)}
                    className="quality-select"
                  >
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="1440p">1440p</option>
                    <option value="4K">4K</option>
                  </select>
                </div>
                
                <button className="control-btn" title="الإعدادات">
                  <Settings size={20} />
                </button>
                
                <button className="control-btn" onClick={toggleFullscreen}>
                  <Maximize size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info Below Video */}
      <div className="watch-info-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="movie-watch-info">
                <h2>{movie.title}</h2>
                {movie.originalTitle && (
                  <h3 className="original-title">{movie.originalTitle}</h3>
                )}
                
                <div className="movie-meta">
                  <span className="year">{movie.year}</span>
                  <span className="duration">{movie.duration} دقيقة</span>
                  <span className="rating">⭐ {movie.rating}/10</span>
                  <span className="quality">{movie.quality}</span>
                </div>

                <div className="movie-genres">
                  {movie.genre?.map((g: string, index: number) => (
                    <span key={index} className="genre-tag">{g}</span>
                  ))}
                </div>

                <p className="movie-description">{movie.description}</p>

                <div className="movie-crew">
                  <div className="crew-item">
                    <strong>المخرج:</strong> {movie.director?.join(', ')}
                  </div>
                  <div className="crew-item">
                    <strong>الممثلون:</strong> {movie.cast?.slice(0, 5).join(', ')}
                  </div>
                </div>

                {/* User Actions */}
                <div className="user-actions">
                  <button className="action-btn like-btn">
                    <ThumbsUp size={16} />
                    أعجبني ({movie.likeCount || 0})
                  </button>
                  <button className="action-btn favorite-btn">
                    <Heart size={16} />
                    المفضلة
                  </button>
                  <button className="action-btn share-btn">
                    <Share2 size={16} />
                    مشاركة
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar with recommendations */}
            <div className="col-lg-4">
              <div className="recommendations-sidebar">
                <h5>مقترحات أخرى</h5>
                {/* يمكن إضافة أفلام مقترحة هنا */}
                <div className="recommendation-item">
                  <img src="/placeholder-poster.jpg" alt="فيلم مقترح" />
                  <div className="recommendation-info">
                    <h6>فيلم مقترح</h6>
                    <p>2023 • ⭐ 8.5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}