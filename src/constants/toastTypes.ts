import { ToastType } from '../types/toast';

export const TOAST_TYPES: Record<ToastType, string> = {
  error: 'bg-red-100 text-red-700 border border-red-300',
  success: 'bg-green-100 text-green-700 border border-green-300',
  info: 'bg-blue-100 text-blue-700 border border-blue-300',
};
