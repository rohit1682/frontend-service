import React from "react";
import { TOAST_TYPES } from "../constants/toastTypes";
import { ToastProps } from "../types/toast";
import { X } from "lucide-react"; // optional close icon

const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 w-5 rounded-lg shadow-md max-w-md ${TOAST_TYPES[type]}`}
    >
      <span className="text-xl mt-[2px]">⚠️</span>
      <div className="flex-1">{message}</div>
      {onClose && (
        <button onClick={onClose} className="text-sm hover:opacity-70">
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Toast;