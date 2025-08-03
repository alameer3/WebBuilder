import { Link } from 'wouter';

interface MovieCardProps {
  id: number;
  title: string;
  arabicTitle?: string;
  year?: number;
  posterUrl: string;
  rating?: number;
  quality?: string[];
  type: 'movie' | 'series' | 'show' | 'episode';
  genre?: string[];
  isNew?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export default function MovieCard({
  id,
  title,
  arabicTitle,
  year,
  posterUrl,
  rating,
  quality = [],
  type,
  genre = [],
  isNew = false,
  isFavorite = false,
  onToggleFavorite
}: MovieCardProps) {
  const getTypeUrl = () => {
    switch (type) {
      case 'movie': return `/movie/${id}`;
      case 'series': return `/series/${id}`;
      case 'show': return `/show/${id}`;
      case 'episode': return `/episode/${id}`;
      default: return `/movie/${id}`;
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <div className="entry-box entry-box-1">
      <div className="box">
        <Link href={getTypeUrl()}>
          <div className="entry-image">
            <img 
              src={posterUrl} 
              className="img-fluid" 
              alt={arabicTitle || title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/client/src/assets/images/default-poster.jpg';
              }}
            />
            {isNew && (
              <div className="entry-badge new-badge">
                <span className="badge badge-success">جديد</span>
              </div>
            )}
            {quality.length > 0 && (
              <div className="entry-qualities">
                {quality.map((q, index) => (
                  <span key={index} className="quality-badge">{q}</span>
                ))}
              </div>
            )}
          </div>
          
          <div className="entry-body">
            <h3 className="entry-title">
              {arabicTitle || title}
            </h3>
            {title !== arabicTitle && arabicTitle && (
              <h4 className="entry-subtitle">{title}</h4>
            )}
            
            <div className="entry-meta">
              {year && <span className="entry-year">{year}</span>}
              {rating && (
                <span className="entry-rating">
                  <i className="icon-star"></i>
                  {rating.toFixed(1)}
                </span>
              )}
            </div>
            
            {genre.length > 0 && (
              <div className="entry-genres">
                {genre.slice(0, 3).map((g, index) => (
                  <span key={index} className="genre-tag">{g}</span>
                ))}
              </div>
            )}
          </div>
        </Link>
        
        <div className="entry-actions">
          <button 
            onClick={handleFavoriteClick}
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            title={isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
          >
            <i className={`icon-${isFavorite ? 'heart' : 'heart-o'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}