// مكون Swiper للعروض التقديمية
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SwiperItem {
  id: string;
  title: string;
  image: string;
  link?: string;
  description?: string;
}

interface SwiperCarouselProps {
  items: SwiperItem[];
  slidesPerView?: number;
  spaceBetween?: number;
  autoplay?: boolean;
  navigation?: boolean;
  pagination?: boolean;
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';
  className?: string;
}

export default function SwiperCarousel({
  items,
  slidesPerView = 1,
  spaceBetween = 30,
  autoplay = true,
  navigation = true,
  pagination = true,
  effect = 'slide',
  className = ''
}: SwiperCarouselProps) {
  const modules = [Navigation, Pagination];
  
  if (autoplay) modules.push(Autoplay);
  if (effect === 'fade') modules.push(EffectFade);

  return (
    <div className={`swiper-container ${className}`}>
      <Swiper
        modules={modules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={autoplay ? {
          delay: 3000,
          disableOnInteraction: false,
        } : false}
        effect={effect}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: Math.min(2, slidesPerView),
            spaceBetween: 20,
          },
          768: {
            slidesPerView: Math.min(3, slidesPerView),
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: Math.min(4, slidesPerView),
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: slidesPerView,
            spaceBetween: spaceBetween,
          },
        }}
        className="akwam-swiper"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="swiper-slide-content">
              {item.link ? (
                <a href={item.link} className="slide-link">
                  <div 
                    className="slide-image"
                    style={{
                      backgroundImage: `url("${item.image}")`,
                      height: '300px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px'
                    }}
                  >
                    <div className="slide-overlay">
                      <div className="slide-content">
                        <h3 className="slide-title">{item.title}</h3>
                        {item.description && (
                          <p className="slide-description">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <div 
                  className="slide-image"
                  style={{
                    backgroundImage: `url("${item.image}")`,
                    height: '300px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px'
                  }}
                >
                  <div className="slide-overlay">
                    <div className="slide-content">
                      <h3 className="slide-title">{item.title}</h3>
                      {item.description && (
                        <p className="slide-description">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// مكون خاص للصفحة الرئيسية
export function HomepageCarousel({ items }: { items: SwiperItem[] }) {
  return (
    <SwiperCarousel
      items={items}
      slidesPerView={5}
      spaceBetween={20}
      autoplay={true}
      navigation={true}
      pagination={false}
      className="homepage-carousel"
    />
  );
}

// مكون خاص للأفلام والمسلسلات
export function MediaCarousel({ items }: { items: SwiperItem[] }) {
  return (
    <SwiperCarousel
      items={items}
      slidesPerView={6}
      spaceBetween={15}
      autoplay={false}
      navigation={true}
      pagination={false}
      className="media-carousel"
    />
  );
}

// مكون خاص للغلاف المميز
export function FeaturedCarousel({ items }: { items: SwiperItem[] }) {
  return (
    <SwiperCarousel
      items={items}
      slidesPerView={1}
      spaceBetween={0}
      autoplay={true}
      navigation={true}
      pagination={true}
      effect="fade"
      className="featured-carousel"
    />
  );
}