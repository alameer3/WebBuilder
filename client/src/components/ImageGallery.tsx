import { useEffect, useRef } from "react";

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

declare global {
  interface Window {
    $: any;
  }
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // تحميل jQuery و Fancybox
    const jqueryScript = document.createElement('script');
    jqueryScript.src = '/src/assets/js/jquery-3.2.1.min.js';
    jqueryScript.onload = () => {
      const fancyboxScript = document.createElement('script');
      fancyboxScript.src = '/src/assets/js/jquery.fancybox.min.js';
      fancyboxScript.onload = () => {
        if (window.$) {
          // تطبيق Fancybox على المعرض
          window.$('[data-fancybox="gallery"]').fancybox({
            buttons: [
              "zoom",
              "slideShow", 
              "fullScreen",
              "download",
              "thumbs",
              "close"
            ],
            loop: true,
            protect: true,
            animationEffect: "fade",
            transitionEffect: "slide",
            thumbs: {
              autoStart: true,
              hideOnClose: true
            },
            caption: function(instance: any, item: any) {
              return window.$(this).attr('data-caption') || title || '';
            }
          });
        }
      };
      document.head.appendChild(fancyboxScript);
    };
    document.head.appendChild(jqueryScript);

    return () => {
      // تنظيف Fancybox عند الخروج
      if (window.$ && window.$.fancybox) {
        window.$.fancybox.close();
      }
    };
  }, [images, title]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="image-gallery" ref={galleryRef}>
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="gallery-item">
              <a
                href={image}
                data-fancybox="gallery"
                data-caption={`${title || 'صورة'} ${index + 1}`}
                className="gallery-link"
              >
                <img
                  src={image}
                  alt={`${title || 'صورة'} ${index + 1}`}
                  className="gallery-image"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div className="gallery-overlay">
                  <i className="icon-zoom-in"></i>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}