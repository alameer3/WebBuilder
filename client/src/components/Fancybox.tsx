// Fancybox Replacement Component - مطابق للأصل
import { useEffect, useState, ReactNode } from 'react';

interface FancyboxOptions {
  src: string;
  type?: 'image' | 'video' | 'iframe';
  title?: string;
  description?: string;
}

interface FancyboxProps {
  children: ReactNode;
  options: FancyboxOptions;
  className?: string;
}

export function Fancybox({ children, options, className = "" }: FancyboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openFancybox = () => setIsOpen(true);
  const closeFancybox = () => setIsOpen(false);

  // إغلاق عند الضغط على Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFancybox();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <div className={className} onClick={openFancybox} style={{ cursor: 'pointer' }}>
        {children}
      </div>

      {isOpen && (
        <div 
          className="fancybox-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeFancybox}
        >
          <div 
            className="fancybox-content"
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              background: '#000',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* زر الإغلاق */}
            <button
              onClick={closeFancybox}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            {/* المحتوى */}
            {options.type === 'image' ? (
              <img 
                src={options.src}
                alt={options.title || ''}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            ) : options.type === 'video' ? (
              <video 
                src={options.src}
                controls
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  display: 'block'
                }}
              />
            ) : (
              <iframe
                src={options.src}
                style={{
                  width: '80vw',
                  height: '80vh',
                  border: 'none'
                }}
                title={options.title || ''}
              />
            )}

            {/* العنوان والوصف */}
            {(options.title || options.description) && (
              <div style={{
                background: 'rgba(0,0,0,0.8)',
                color: '#fff',
                padding: '15px',
                textAlign: 'center'
              }}>
                {options.title && (
                  <h3 style={{ margin: '0 0 10px 0', fontFamily: 'akoam' }}>
                    {options.title}
                  </h3>
                )}
                {options.description && (
                  <p style={{ margin: 0, opacity: 0.8 }}>
                    {options.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// دالة مساعدة لفتح معرض صور
export function openImageGallery(images: string[], startIndex = 0) {
  let currentIndex = startIndex;
  
  const showImage = (index: number) => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.9);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    `;

    const img = document.createElement('img');
    img.src = images[index];
    img.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: white;
      font-size: 24px;
      cursor: pointer;
    `;

    const closeGallery = () => document.body.removeChild(overlay);

    closeBtn.addEventListener('click', closeGallery);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeGallery();
    });

    // أزرار التنقل
    if (images.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.innerHTML = '‹';
      prevBtn.style.cssText = `
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 24px;
        cursor: pointer;
      `;

      const nextBtn = document.createElement('button');
      nextBtn.innerHTML = '›';
      nextBtn.style.cssText = `
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.5);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 24px;
        cursor: pointer;
      `;

      prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        img.src = images[currentIndex];
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        img.src = images[currentIndex];
      });

      overlay.appendChild(prevBtn);
      overlay.appendChild(nextBtn);
    }

    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    document.body.style.overflow = 'hidden';
    overlay.addEventListener('DOMNodeRemoved', () => {
      document.body.style.overflow = 'auto';
    });
  };

  showImage(currentIndex);
}

export default Fancybox;