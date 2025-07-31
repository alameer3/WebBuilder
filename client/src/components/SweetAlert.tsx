import { useEffect } from "react";

declare global {
  interface Window {
    swal: any;
  }
}

interface SweetAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  text?: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  timer?: number;
}

export default function SweetAlert({
  type,
  title,
  text,
  confirmButtonText = 'موافق',
  onConfirm,
  onCancel,
  showCancelButton = false,
  timer
}: SweetAlertProps) {
  
  useEffect(() => {
    // تحميل SweetAlert
    const sweetAlertScript = document.createElement('script');
    sweetAlertScript.src = '/src/assets/js/sweetalert.min.js';
    sweetAlertScript.onload = () => {
      if (window.swal) {
        const options: any = {
          title,
          text,
          type,
          confirmButtonText,
          showCancelButton,
          confirmButtonColor: '#f3951e',
          cancelButtonColor: '#d33',
          cancelButtonText: 'إلغاء'
        };

        if (timer) {
          options.timer = timer;
        }

        window.swal(options).then((result: any) => {
          if (result.value && onConfirm) {
            onConfirm();
          } else if (result.dismiss && onCancel) {
            onCancel();
          }
        });
      }
    };
    document.head.appendChild(sweetAlertScript);

    return () => {
      // تنظيف
      if (window.swal) {
        window.swal.close();
      }
    };
  }, [type, title, text, confirmButtonText, onConfirm, onCancel, showCancelButton, timer]);

  return null; // SweetAlert لا يحتاج JSX
}

// Hook لاستخدام SweetAlert بسهولة
export const useSweetAlert = () => {
  const showAlert = (options: SweetAlertProps) => {
    const script = document.createElement('script');
    script.src = '/src/assets/js/sweetalert.min.js';
    script.onload = () => {
      if (window.swal) {
        const swalOptions: any = {
          title: options.title,
          text: options.text,
          type: options.type,
          confirmButtonText: options.confirmButtonText || 'موافق',
          showCancelButton: options.showCancelButton || false,
          confirmButtonColor: '#f3951e',
          cancelButtonColor: '#d33',
          cancelButtonText: 'إلغاء'
        };

        if (options.timer) {
          swalOptions.timer = options.timer;
        }

        window.swal(swalOptions).then((result: any) => {
          if (result.value && options.onConfirm) {
            options.onConfirm();
          } else if (result.dismiss && options.onCancel) {
            options.onCancel();
          }
        });
      }
    };
    document.head.appendChild(script);
  };

  const showSuccess = (title: string, text?: string, onConfirm?: () => void) => {
    showAlert({
      type: 'success',
      title,
      text,
      onConfirm
    });
  };

  const showError = (title: string, text?: string, onConfirm?: () => void) => {
    showAlert({
      type: 'error',
      title,
      text,
      onConfirm
    });
  };

  const showWarning = (title: string, text?: string, onConfirm?: () => void) => {
    showAlert({
      type: 'warning',
      title,
      text,
      onConfirm,
      showCancelButton: true
    });
  };

  const showInfo = (title: string, text?: string, onConfirm?: () => void) => {
    showAlert({
      type: 'info',
      title,
      text,
      onConfirm
    });
  };

  const showConfirm = (
    title: string, 
    text?: string, 
    onConfirm?: () => void, 
    onCancel?: () => void
  ) => {
    showAlert({
      type: 'warning',
      title,
      text,
      onConfirm,
      onCancel,
      showCancelButton: true,
      confirmButtonText: 'نعم، متأكد!'
    });
  };

  return {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  };
};