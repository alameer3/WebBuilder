import { useState } from 'react';
import { Link } from 'wouter';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    year?: number;
    poster?: string;
    rating?: number;
    quality?: string;
    genre?: string[];
    isNew?: boolean;
    isFeatured?: boolean;
    category?: string;
    section?: string;
  };
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export default function EnhancedMovieCard({ 
  movie, 
  size = 'medium',
  showDetails = true 
}: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-32 h-48',
    medium: 'w-40 h-60',
    large: 'w-48 h-72'
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'movie': return '🎬';
      case 'series': return '📺';
      case 'show': return '📻';
      case 'mix': return '🎭';
      default: return '🎬';
    }
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'عربي': return 'bg-green-600';
      case 'مترجم': return 'bg-blue-600';
      case 'مدبلج': return 'bg-purple-600';
      case 'خليجي': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="movie-card group relative bg-[#27272c] rounded-lg overflow-hidden hover:bg-[#2a2a2f] transition-all duration-300 hover:scale-105 hover:shadow-xl">
      {/* صورة الفيلم */}
      <Link href={`/movie/${movie.id}`}>
        <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
          {/* صورة الخلفية */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          
          {!imageError ? (
            <img
              src={movie.poster || '/api/placeholder/300/450'}
              alt={movie.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#161619] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">{getCategoryIcon(movie.category || 'movie')}</div>
                <div className="text-xs">لا توجد صورة</div>
              </div>
            </div>
          )}

          {/* مؤشر التحميل */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-[#161619] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f3951e]"></div>
            </div>
          )}

          {/* التسميات */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {/* التقييم */}
            {movie.rating && (
              <div className="bg-[#f3951e] text-white px-2 py-1 rounded text-xs font-bold flex items-center">
                <span className="mr-1">⭐</span>
                {movie.rating.toFixed(1)}
              </div>
            )}
            
            {/* السنة */}
            {movie.year && (
              <div className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                {movie.year}
              </div>
            )}
            
            {/* الجودة */}
            {movie.quality && (
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                {movie.quality}
              </div>
            )}
          </div>

          {/* التسميات اليسرى */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {/* جديد */}
            {movie.isNew && (
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                جديد
              </div>
            )}
            
            {/* مميز */}
            {movie.isFeatured && (
              <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-bold">
                مميز
              </div>
            )}
            
            {/* القسم */}
            {movie.section && (
              <div className={`${getSectionColor(movie.section)} text-white px-2 py-1 rounded text-xs`}>
                {movie.section}
              </div>
            )}
          </div>

          {/* أيقونة التشغيل عند الهوفر */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-[#f3951e] text-white rounded-full p-3 hover:bg-[#e8891a] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* معلومات سفلية */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
            <h4 className="text-white font-medium text-sm mb-1 line-clamp-2 group-hover:text-[#f3951e] transition-colors">
              {movie.title}
            </h4>
            
            {showDetails && (
              <div className="space-y-1">
                {/* الأنواع */}
                {movie.genre && movie.genre.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {movie.genre.slice(0, 2).map((g, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] bg-[#161619] text-gray-300 px-2 py-1 rounded"
                      >
                        {g}
                      </span>
                    ))}
                    {movie.genre.length > 2 && (
                      <span className="text-[10px] text-gray-400">+{movie.genre.length - 2}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* إجراءات سريعة */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-2">
          {/* إضافة للمفضلة */}
          <button className="bg-black/70 text-white p-2 rounded-full hover:bg-[#f3951e] transition-colors" title="إضافة للمفضلة">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
          
          {/* مشاركة */}
          <button className="bg-black/70 text-white p-2 rounded-full hover:bg-[#f3951e] transition-colors" title="مشاركة">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button>
          
          {/* معلومات */}
          <button className="bg-black/70 text-white p-2 rounded-full hover:bg-[#f3951e] transition-colors" title="معلومات">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}