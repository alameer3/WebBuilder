// Pace Loading Indicator Component - مطابق للأصل
import { useEffect, useState } from 'react';

interface PaceLoaderProps {
  isActive?: boolean;
  color?: string;
  className?: string;
}

export default function PaceLoader({ 
  isActive = false, 
  color = '#f3951e',
  className = ""
}: PaceLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(isActive);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setProgress(0);

    // محاكاة التقدم
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isVisible) return null;

  return (
    <div className={`pace ${isActive ? 'pace-active' : 'pace-inactive'} ${className}`}>
      <div 
        className="pace-progress" 
        data-progress-text={`${Math.round(progress)}%`} 
        data-progress={Math.round(progress)}
        style={{ 
          transform: `translate3d(${progress}%, 0px, 0px)`,
          background: color
        }}
      >
        <div 
          className="pace-progress-inner"
          style={{ background: color }}
        ></div>
      </div>
      <div 
        className="pace-activity"
        style={{ borderTopColor: color, borderLeftColor: color }}
      ></div>
    </div>
  );
}

// Hook لاستخدام Pace Loader
export function usePaceLoader() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    PaceLoader: () => <PaceLoader isActive={isLoading} />
  };
}