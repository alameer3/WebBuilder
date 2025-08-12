import { Link } from 'wouter';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`breadcrumb-nav ${className}`}>
      <div className="container">
        <ol className="breadcrumb">
          {items.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              {item.href && index < items.length - 1 ? (
                <Link href={item.href}>
                  <a>{item.name}</a>
                </Link>
              ) : (
                <span className="active">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}