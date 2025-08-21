import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { User, Calendar, MapPin } from 'lucide-react';
import AkwamHeader from '../components/AkwamHeader';
import MovieCard from '../components/MovieCard';

// استيراد CSS الأصلي
import '../assets/css/plugins.css';
import '../assets/css/style.css';  
import '../assets/css/akwam.css';

interface Person {
  id: string;
  name: string;
  nameAr?: string;
  biography?: string;
  birthDate?: string;
  nationality?: string;
  photo?: string;
  profession: string[];
  isActive: boolean;
}

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: number;
  rating: number;
  category: string;
}

export default function PersonDetail() {
  const { id } = useParams();

  const { data: person, isLoading, error } = useQuery({
    queryKey: ['/api/person', id],
    enabled: !!id
  }) as { data: Person | undefined, isLoading: boolean, error: any };

  const { data: personMovies = [] } = useQuery({
    queryKey: ['/api/person', id, 'movies'],
    enabled: !!id
  }) as { data: Movie[] };

  useEffect(() => {
    document.body.className = 'header-fixed body-main';
    
    if (person) {
      document.title = `${person.name} - يمن فليكس`;
    }
  }, [person]);

  if (isLoading) {
    return (
      <div className="site-container">
        <AkwamHeader />
        <div className="main-header-top"></div>
        <div className="main-header-height"></div>
        
        <div className="container text-center py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">جاري التحميل...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="site-container">
        <AkwamHeader />
        <div className="main-header-top"></div>
        <div className="main-header-height"></div>
        
        <div className="container text-center py-5">
          <h3>لم يتم العثور على هذا الشخص</h3>
          <Link href="/movies" className="btn btn-primary mt-3">العودة للأفلام</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="site-container">
      <AkwamHeader />
      <div className="main-header-top"></div>
      <div className="main-header-height"></div>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-container">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">يمن فليكس</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/people">أشخاص</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {person.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Person Details */}
      <div className="person-details-section py-5">
        <div className="container">
          <div className="row">
            {/* Person Photo */}
            <div className="col-md-4">
              <div className="person-photo text-center">
                {person.photo ? (
                  <img 
                    src={person.photo} 
                    alt={person.name}
                    className="img-fluid rounded shadow"
                    style={{maxWidth: '300px'}}
                  />
                ) : (
                  <div className="default-photo bg-secondary rounded d-flex align-items-center justify-content-center mx-auto" 
                       style={{width: '300px', height: '400px'}}>
                    <User size={120} className="text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Person Info */}
            <div className="col-md-8">
              <div className="person-info">
                <h1 className="person-name">{person.name}</h1>
                {person.nameAr && person.nameAr !== person.name && (
                  <h2 className="person-name-ar text-muted">{person.nameAr}</h2>
                )}

                {/* Person Meta Info */}
                <div className="person-meta-info mb-4">
                  <div className="row">
                    <div className="col-md-6">
                      {person.birthDate && (
                        <div className="meta-item mb-2">
                          <Calendar size={16} className="ml-2" />
                          <strong>تاريخ الميلاد:</strong> {person.birthDate}
                        </div>
                      )}
                      {person.nationality && (
                        <div className="meta-item mb-2">
                          <MapPin size={16} className="ml-2" />
                          <strong>الجنسية:</strong> {person.nationality}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <div className="meta-item mb-2">
                        <strong>المهنة:</strong>
                        <div className="profession-tags">
                          {person.profession?.map((prof: string, index: number) => (
                            <span key={index} className="badge badge-primary mr-2 mb-2">{prof}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Biography */}
                {person.biography && (
                  <div className="person-biography mb-4">
                    <h5>السيرة الذاتية:</h5>
                    <p>{person.biography}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person Movies */}
      {personMovies && personMovies.length > 0 && (
        <div className="person-movies-section py-5 bg-light">
          <div className="container">
            <h4 className="mb-4">الأعمال</h4>
            <div className="row">
              {personMovies.map((movie: Movie) => (
                <div key={movie.id} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                  <div className="movie-card">
                    <Link href={`/movie/${movie.id}`}>
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        className="img-fluid rounded shadow-sm"
                      />
                      <div className="movie-card-info mt-2">
                        <h6 className="movie-card-title">{movie.title}</h6>
                        <div className="movie-card-meta">
                          <span className="year">{movie.year}</span>
                          <span className="rating">⭐ {movie.rating}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}