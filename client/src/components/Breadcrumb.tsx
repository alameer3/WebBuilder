import React from 'react';
import { Link } from 'wouter';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`breadcrumb ${className}`} aria-label="تنقل الموقع">
      <div className="container">
        <div className="breadcrumb-list d-flex align-items-center">
          <Link 
            href="/" 
            className="breadcrumb-item text-decoration-none"
            style={{ color: '#999', fontSize: '14px' }}
          >
            <i className="icon-home" style={{ marginLeft: '5px' }}></i>
            الرئيسية
          </Link>
          
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span 
                className="breadcrumb-separator mx-2" 
                style={{ color: '#666' }}
              >
                /
              </span>
              
              {item.href && index < items.length - 1 ? (
                <Link 
                  href={item.href}
                  className="breadcrumb-item text-decoration-none"
                  style={{ color: '#999', fontSize: '14px' }}
                >
                  {item.title}
                </Link>
              ) : (
                <span 
                  className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
                  style={{ 
                    color: index === items.length - 1 ? '#fff' : '#999',
                    fontSize: '14px'
                  }}
                >
                  {item.title}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Pre-configured breadcrumbs for common pages
export const MoviesBreadcrumb = () => (
  <Breadcrumb items={[{ title: 'الأفلام' }]} />
);

export const SeriesBreadcrumb = () => (
  <Breadcrumb items={[{ title: 'المسلسلات' }]} />
);

export const ShowsBreadcrumb = () => (
  <Breadcrumb items={[{ title: 'البرامج' }]} />
);

export const MixBreadcrumb = () => (
  <Breadcrumb items={[{ title: 'متنوع' }]} />
);

export const MovieDetailBreadcrumb = ({ movieTitle }: { movieTitle: string }) => (
  <Breadcrumb 
    items={[
      { title: 'الأفلام', href: '/movies' },
      { title: movieTitle }
    ]} 
  />
);

export const SeriesDetailBreadcrumb = ({ seriesTitle }: { seriesTitle: string }) => (
  <Breadcrumb 
    items={[
      { title: 'المسلسلات', href: '/series' },
      { title: seriesTitle }
    ]} 
  />
);

export const EpisodeBreadcrumb = ({ 
  seriesTitle, 
  episodeTitle,
  seriesId 
}: { 
  seriesTitle: string;
  episodeTitle: string;
  seriesId: string;
}) => (
  <Breadcrumb 
    items={[
      { title: 'المسلسلات', href: '/series' },
      { title: seriesTitle, href: `/series/${seriesId}` },
      { title: episodeTitle }
    ]} 
  />
);

export default Breadcrumb;