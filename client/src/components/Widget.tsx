import { ReactNode } from 'react';

interface WidgetProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
  variant?: 'default' | 'style-1' | 'style-2' | 'style-3';
}

export default function Widget({ 
  title, 
  children, 
  className = "",
  headerActions,
  variant = 'default'
}: WidgetProps) {
  const variantClass = variant !== 'default' ? `widget-${variant}` : '';

  return (
    <div className={`widget ${variantClass} ${className}`}>
      {title && (
        <div className="widget-header">
          <div className="d-flex align-items-center justify-content-between">
            <h3 className="widget-title mb-0">{title}</h3>
            {headerActions && (
              <div className="widget-actions">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="widget-body">
        {children}
      </div>
    </div>
  );
}