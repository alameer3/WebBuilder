import { Link } from 'wouter';

interface Category {
  id: number;
  name: string;
  arabicName: string;
  icon: string;
  href: string;
  count?: number;
}

interface CategoryWidgetProps {
  title: string;
  categories: Category[];
  className?: string;
  showCount?: boolean;
}

export default function CategoryWidget({ 
  title, 
  categories, 
  className = "",
  showCount = false 
}: CategoryWidgetProps) {
  return (
    <div className={`widget category-widget ${className}`}>
      <div className="widget-header">
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="widget-body">
        <div className="main-categories-list">
          <div className="row">
            {categories.map((category) => (
              <div key={category.id} className="col-lg col-4">
                <Link 
                  href={category.href} 
                  className="item d-block text-center text-white py-3 h-100"
                >
                  <div className="icn">
                    <i className={category.icon}></i>
                  </div>
                  <div className="font-size-16">{category.arabicName}</div>
                  {showCount && category.count && (
                    <div className="count font-size-12 text-muted">
                      ({category.count})
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}