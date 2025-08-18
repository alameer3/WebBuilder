// مكون SweetAlert للتنبيهات التفاعلية
import Swal from 'sweetalert2';

export const showSuccessAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'موافق',
    background: '#27272c',
    color: '#ffffff',
    confirmButtonColor: '#f3951e'
  });
};

export const showErrorAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'موافق',
    background: '#27272c',
    color: '#ffffff',
    confirmButtonColor: '#f3951e'
  });
};

export const showConfirmAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'نعم',
    cancelButtonText: 'لا',
    background: '#27272c',
    color: '#ffffff',
    confirmButtonColor: '#f3951e',
    cancelButtonColor: '#6c757d'
  });
};

export const showInfoAlert = (title: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'موافق',
    background: '#27272c',
    color: '#ffffff',
    confirmButtonColor: '#f3951e'
  });
};

// تنبيه للإضافة إلى المفضلة
export const showFavoriteAlert = (title: string) => {
  return Swal.fire({
    title: `تم إضافة "${title}" إلى قائمة المفضلة`,
    icon: 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#27272c',
    color: '#ffffff'
  });
};

// تنبيه للحذف من المفضلة
export const showRemoveFavoriteAlert = (title: string) => {
  return Swal.fire({
    title: `تم حذف "${title}" من قائمة المفضلة`,
    icon: 'info',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#27272c',
    color: '#ffffff'
  });
};

export default {
  showSuccessAlert,
  showErrorAlert,
  showConfirmAlert,
  showInfoAlert,
  showFavoriteAlert,
  showRemoveFavoriteAlert
};