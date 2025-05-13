import React, { useEffect } from "react";
import Button from "../button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  className = "",
}) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      {/* Very light backdrop - allows content to be visible */}
      <div className="absolute inset-0 bg-opacity-60" onClick={onClose}></div>

      {/* Modal content */}
      <div
        className={`relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 z-10 ${className}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="mb-6">{children}</div>
        {actions ? (
          <div className="flex justify-end gap-4">{actions}</div>
        ) : (
          <div className="flex justify-end gap-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onClose}>
              OK
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
