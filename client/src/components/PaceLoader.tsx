import React, { useEffect } from 'react';

// Pace Loader Component - matches AKWAM original design
export function PaceLoader() {
  useEffect(() => {
    // Load Pace.js from the assets folder
    const script = document.createElement('script');
    script.src = '/src/assets/js/pace.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Add Pace configuration
    (window as any).paceOptions = {
      ajax: {
        trackMethods: ['GET', 'POST', 'PUT', 'DELETE']
      },
      document: true,
      eventLag: true,
      elements: false
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null; // Pace manages its own DOM elements
}

// Simple Loader for components that need inline loading
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'medium', 
  color = '#f3951e',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: '20px',
    medium: '40px', 
    large: '60px'
  };
  
  const spinnerSize = sizeMap[size];

  return (
    <div className={`loading-spinner ${className}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div 
        className="lds-ellipsis"
        style={{
          width: spinnerSize,
          height: spinnerSize,
        }}
      >
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
      </div>
    </div>
  );
}

// Page Loading Component
export function PageLoader({ message = 'جاري التحميل...' }: { message?: string }) {
  return (
    <div 
      className="page-loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(22, 22, 25, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        color: '#fff'
      }}
    >
      <LoadingSpinner size="large" />
      <p style={{ 
        marginTop: '20px', 
        fontSize: '18px',
        fontFamily: 'akoam, Arial, Helvetica, sans-serif',
        textAlign: 'center'
      }}>
        {message}
      </p>
    </div>
  );
}

export default PaceLoader;