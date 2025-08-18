import { Link } from 'wouter';

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  year: string;
  rating: number;
  quality?: string;
  genre?: string[];
}

export default function MovieCard({ id, title, poster, year, rating, quality, genre }: MovieCardProps) {
  return (
    <div className="col-6 col-lg-2 col-md-3 col-xl-2 mb-12">
      <div className="entry-box entry-box-1" data-testid={`movie-card-${id}`}>
        <div className="labels d-flex">
          <span className="label rating">
            <i className="icon-star mr-2"></i>{rating}
          </span>
          {quality && (
            <span className="label quality ml-2">{quality}</span>
          )}
          <span className="ml-auto"></span>
        </div>
        
        <Link href={`/movie/${id}`} data-testid={`movie-link-${id}`}>
          <div className="entry-image">
            <div 
              className="image" 
              style={{ 
                backgroundImage: `url("${poster}")`,
                height: '300px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="entry-overlay">
              <div className="overlay-content">
                <div className="entry-title" data-testid={`movie-title-${id}`}>{title}</div>
                <div className="entry-year" data-testid={`movie-year-${id}`}>{year}</div>
                {genre && genre.length > 0 && (
                  <div className="entry-genre">{genre.join(', ')}</div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}