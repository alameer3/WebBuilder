import { useState } from 'react';
import MovieCard from './MovieCard';

interface Movie {
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
}

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  cols?: 2 | 3 | 4 | 5 | 6;
  showPagination?: boolean;
  itemsPerPage?: number;
  className?: string;
}

export default function MovieGrid({
  movies,
  loading = false,
  cols = 4,
  showPagination = false,
  itemsPerPage = 20,
  className = ""
}: MovieGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = showPagination ? movies.slice(startIndex, endIndex) : movies;

  const toggleFavorite = (movieId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
      } else {
        newFavorites.add(movieId);
      }
      return newFavorites;
    });
  };

  const colClass = {
    2: 'col-xl-6 col-lg-6 col-md-6',
    3: 'col-xl-4 col-lg-4 col-md-6',
    4: 'col-xl-3 col-lg-4 col-md-6',
    5: 'col-xl-2 col-lg-3 col-md-4',
    6: 'col-xl-2 col-lg-2 col-md-3'
  };

  if (loading) {
    return (
      <div className={`movie-grid ${className}`}>
        <div className="row">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div key={index} className={`${colClass[cols]} col-sm-6 col-6 mb-4`}>
              <div className="entry-box entry-box-1">
                <div className="box">
                  <div className="entry-image">
                    <div className="skeleton-loader" style={{ height: '300px' }}></div>
                  </div>
                  <div className="entry-body">
                    <div className="skeleton-loader" style={{ height: '20px', marginBottom: '10px' }}></div>
                    <div className="skeleton-loader" style={{ height: '15px', width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`movie-grid ${className}`}>
      <div className="row">
        {currentMovies.map((movie) => (
          <div key={movie.id} className={`${colClass[cols]} col-sm-6 col-6 mb-4`}>
            <MovieCard
              {...movie}
              isFavorite={favorites.has(movie.id)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="pagination-container d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  السابق
                </button>
              </li>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  التالي
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}