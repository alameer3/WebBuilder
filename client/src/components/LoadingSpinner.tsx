interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white' | 'orange';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = "",
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    orange: 'text-orange-500'
  };

  return (
    <div className={`loading-spinner ${className}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && (
        <div className="loading-text mt-2">
          {text}
        </div>
      )}
    </div>
  );
}