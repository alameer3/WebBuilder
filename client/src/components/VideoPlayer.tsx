import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
  onTimeUpdate?: (currentTime: number) => void;
  onEnded?: () => void;
}

export default function VideoPlayer({
  src,
  poster,
  title,
  autoplay = false,
  controls = true,
  className = "",
  onTimeUpdate,
  onEnded
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onTimeUpdate, onEnded]);

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

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value) / 100;
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`video-player ${className} ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="video-container">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoplay}
          controls={false}
          className="video-element"
          onClick={togglePlay}
        />
        
        {!controls && (
          <div className="video-overlay">
            <button 
              className="play-button"
              onClick={togglePlay}
            >
              <i className={`icon-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
          </div>
        )}

        {controls && (
          <div className="video-controls">
            <div className="controls-row">
              {/* Progress Bar */}
              <div className="progress-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="progress-bar"
                />
              </div>
            </div>
            
            <div className="controls-row">
              {/* Play/Pause */}
              <button className="control-btn" onClick={togglePlay}>
                <i className={`icon-${isPlaying ? 'pause' : 'play'}`}></i>
              </button>

              {/* Time */}
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="controls-right">
                {/* Volume */}
                <div className="volume-container">
                  <button className="control-btn">
                    <i className={`icon-volume-${volume === 0 ? 'off' : volume < 0.5 ? 'down' : 'up'}`}></i>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={handleVolumeChange}
                    className="volume-bar"
                  />
                </div>

                {/* Fullscreen */}
                <button className="control-btn" onClick={toggleFullscreen}>
                  <i className={`icon-${isFullscreen ? 'compress' : 'expand'}`}></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {title && (
        <div className="video-info">
          <h4 className="video-title">{title}</h4>
        </div>
      )}
    </div>
  );
}