import { useEffect, useRef } from "react";

interface CarouselItem {
  id: string;
  title: string;
  image: string;
  description?: string;
  link?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  duration?: number;
  className?: string;
}

declare global {
  interface Window {
    $: any;
    Swiper: any;
  }
}

export default function Carousel({ 
  items, 
  autoplay = true, 
  duration = 3000,
  className = ""
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // تحميل Swiper
    const swiperScript = document.createElement('script');
    swiperScript.src = '/src/assets/js/swiper.min.js';
    swiperScript.onload = () => {
      if (window.Swiper && carouselRef.current) {
        const swiper = new window.Swiper(carouselRef.current, {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: autoplay ? {
            delay: duration,
            disableOnInteraction: false,
          } : false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          },
        });
      }
    };
    document.head.appendChild(swiperScript);

    return () => {
      // تنظيف
      if (carouselRef.current && window.Swiper) {
        const swiperInstance = (carouselRef.current as any).swiper;
        if (swiperInstance) {
          swiperInstance.destroy();
        }
      }
    };
  }, [items, autoplay, duration]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`carousel-container ${className}`}>
      <div className="swiper" ref={carouselRef}>
        <div className="swiper-wrapper">
          {items.map((item) => (
            <div key={item.id} className="swiper-slide">
              <div className="carousel-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                  {item.link && (
                    <div className="item-overlay">
                      <a href={item.link} className="item-link">
                        <i className="icon-play"></i>
                      </a>
                    </div>
                  )}
                </div>
                <div className="item-content">
                  <h4 className="item-title">{item.title}</h4>
                  {item.description && (
                    <p className="item-description">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        
        {/* Pagination */}
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
}