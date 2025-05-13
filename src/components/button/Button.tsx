// src/components/button/Button.tsx
import React from "react";
import ButtonProps from "../../types/components/buttons";

// We'll need to update the ButtonProps type
interface ExtendedButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const Button: React.FC<ExtendedButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg transition-all cursor-pointer text-sm flex items-center justify-center";
  const variantStyles =
    variant === "primary"
      ? "bg-primary text-black hover:bg-lime-400"
      : "bg-white border-1 text-gray-800 hover:bg-gray-200";
  
  // Apply disabled styles when loading or explicitly disabled
  const disabledStyles = (isLoading || disabled) ? 
    "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${disabledStyles} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
