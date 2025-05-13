export type ToastType = 'error' | 'success' | 'info';

export type ToastProps = {
  message: string;
  type?: ToastType;
  onClose?: () => void;
};