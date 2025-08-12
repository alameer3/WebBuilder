// SweetAlert Replacement Component - مطابق للأصل
import { useEffect } from 'react';

interface SweetAlertOptions {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info';
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function showAlert(options: SweetAlertOptions) {
  // إنشاء overlay
  const overlay = document.createElement('div');
  overlay.className = 'swal-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // إنشاء النافذة المنبثقة
  const modal = document.createElement('div');
  modal.className = 'swal-modal';
  modal.style.cssText = `
    background: #27272c;
    border-radius: 10px;
    padding: 30px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    border: 1px solid #333;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  `;

  // أيقونة
  let iconHTML = '';
  if (options.icon) {
    const iconColors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    };
    iconHTML = `<div style="font-size: 48px; color: ${iconColors[options.icon]}; margin-bottom: 20px;">
      ${options.icon === 'success' ? '✓' : 
        options.icon === 'error' ? '✗' : 
        options.icon === 'warning' ? '⚠' : 'ℹ'}
    </div>`;
  }

  modal.innerHTML = `
    ${iconHTML}
    ${options.title ? `<h3 style="color: #fff; margin-bottom: 15px; font-family: akoam;">${options.title}</h3>` : ''}
    ${options.text ? `<p style="color: #ccc; margin-bottom: 25px;">${options.text}</p>` : ''}
    <div style="display: flex; gap: 10px; justify-content: center;">
      <button class="swal-confirm" style="
        background: #f3951e;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-family: akoam;
      ">${options.confirmButtonText || 'تأكيد'}</button>
      ${options.showCancelButton ? `
        <button class="swal-cancel" style="
          background: #6c757d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-family: akoam;
        ">${options.cancelButtonText || 'إلغاء'}</button>
      ` : ''}
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // إضافة الأحداث
  const confirmBtn = modal.querySelector('.swal-confirm') as HTMLElement;
  const cancelBtn = modal.querySelector('.swal-cancel') as HTMLElement;

  const closeModal = () => {
    document.body.removeChild(overlay);
  };

  confirmBtn?.addEventListener('click', () => {
    if (options.onConfirm) options.onConfirm();
    closeModal();
  });

  cancelBtn?.addEventListener('click', () => {
    if (options.onCancel) options.onCancel();
    closeModal();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // إضافة animation
  modal.style.transform = 'scale(0.5)';
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.transition = 'all 0.3s ease';
    modal.style.transform = 'scale(1)';
    modal.style.opacity = '1';
  }, 10);
}

// دالة Success
export function showSuccess(title: string, text?: string) {
  showAlert({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'ممتاز'
  });
}

// دالة Error
export function showError(title: string, text?: string) {
  showAlert({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'حسناً'
  });
}

// دالة Warning
export function showWarning(title: string, text?: string) {
  showAlert({
    title,
    text,
    icon: 'warning',
    confirmButtonText: 'فهمت'
  });
}

// دالة Confirm
export function showConfirm(title: string, text: string, onConfirm: () => void) {
  showAlert({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم',
    cancelButtonText: 'لا',
    onConfirm
  });
}

export default {
  showAlert,
  showSuccess,
  showError,
  showWarning,
  showConfirm
};