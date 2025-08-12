// Swiper Component Replacement - مطابق للأصل
import { useState, useEffect, useRef, ReactNode } from 'react';

interface SwiperProps {
  children: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean | { delay: number };
  navigation?: boolean;
  pagination?: boolean;
  className?: string;
}

export default function Swiper({
  children,
  slidesPerView = 1,
  spaceBetween = 20,
  loop = false,
  autoplay = false,
  navigation = true,
  pagination = false,
  className = ""
}: SwiperProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!!autoplay);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxSlides = children.length;

  // حساب عدد الشرائح المرئية
  const getVisibleSlides = () => {
    if (typeof slidesPerView === 'number') return slidesPerView;
    // يمكن إضافة responsive logic هنا
    return 1;
  };

  const visibleSlides = getVisibleSlides();
  const maxIndex = loop ? maxSlides : maxSlides - visibleSlides;

  // الانتقال للشريحة التالية
  const nextSlide = () => {
    setCurrentSlide(prev => {
      if (loop) {
        return (prev + 1) % maxSlides;
      }
      return Math.min(prev + 1, maxIndex);
    });
  };

  // الانتقال للشريحة السابقة
  const prevSlide = () => {
    setCurrentSlide(prev => {
      if (loop) {
        return prev === 0 ? maxSlides - 1 : prev - 1;
      }
      return Math.max(prev - 1, 0);
    });
  };

  // الانتقال لشريحة محددة
  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, maxIndex)));
  };

  // التشغيل التلقائي
  useEffect(() => {
    if (!isPlaying || !autoplay) return;

    const delay = typeof autoplay === 'object' ? autoplay.delay : 3000;
    const interval = setInterval(nextSlide, delay);

    return () => clearInterval(interval);
  }, [isPlaying, autoplay, currentSlide]);

  // إيقاف التشغيل التلقائي عند التمرير
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(!!autoplay);

  // حساب موضع الترجمة
  const translateX = -(currentSlide * (100 / visibleSlides + spaceBetween / visibleSlides));

  return (
    <div 
      className={`swiper-container ${className}`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      <div 
        className="swiper-wrapper"
        style={{
          display: 'flex',
          transform: `translateX(${translateX}%)`,
          transition: 'transform 0.3s ease',
          gap: `${spaceBetween}px`
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="swiper-slide"
            style={{
              flex: `0 0 ${100 / visibleSlides}%`,
              maxWidth: `${100 / visibleSlides}%`
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* أزرار التنقل */}
      {navigation && (
        <>
          <button
            className="swiper-button swiper-button-prev"
            onClick={prevSlide}
            disabled={!loop && currentSlide === 0}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
              fontSize: '18px',
              opacity: (!loop && currentSlide === 0) ? 0.3 : 1
            }}
          >
            <i className="icon-arrow-right"></i>
          </button>
          <button
            className="swiper-button swiper-button-next"
            onClick={nextSlide}
            disabled={!loop && currentSlide >= maxIndex}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.5)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
              fontSize: '18px',
              opacity: (!loop && currentSlide >= maxIndex) ? 0.3 : 1
            }}
          >
            <i className="icon-arrow-left"></i>
          </button>
        </>
      )}

      {/* نقاط التنقل */}
      {pagination && (
        <div 
          className="swiper-pagination"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}
        >
          {Array.from({ length: Math.ceil(maxSlides / visibleSlides) }).map((_, index) => (
            <button
              key={index}
              className={`swiper-pagination-bullet ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: 'none',
                background: currentSlide === index ? '#f3951e' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}