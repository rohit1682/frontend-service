import React, { useState, useEffect, useRef } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import "./password.css";

interface PasswordProps {
  id: string;
  legendText: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  bottomText?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const Password: React.FC<PasswordProps> = ({
  id,
  legendText,
  value,
  onChange,
  placeholder = "",
  bottomText = "",
  hasError = false,
  errorMessage = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasAutofilled, setHasAutofilled] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (inputRef.current) {
      const observer = new MutationObserver(() => {
        if (inputRef.current && inputRef.current.matches(":-webkit-autofill")) {
          setHasAutofilled(true);
        }
      });

      observer.observe(inputRef.current, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <div id={id} className="w-full flex flex-col m-1 font-light">
      <fieldset
        className={`rounded-xl px-5 flex flex-row border ${
          hasError
            ? "border-red-500"
            : isFocused
            ? "border-black"
            : "border-[#DADADA]"
        } ${hasAutofilled ? "autofilled" : ""}`}
      >
        <legend className="text-[11px] text-[#323A3A] -ml-2 px-2 bg-white z-10">
          {legendText}
        </legend>

        <label
          htmlFor={id}
          className="flex justify-between items-center w-full"
        >
          <input
            ref={inputRef}
            id={id}
            name={id}
            type={showPassword ? "text" : "password"}
            className="pt-1 pb-3 text-lg outline-none text-[14px] placeholder-[#909090] w-full"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete="current-password"
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : `${id}-note`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-2 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <GoEyeClosed className="size-5 text-gray-500" />
            ) : (
              <GoEye className="size-5 text-gray-500" />
            )}
          </button>
        </label>
      </fieldset>

      <p
        id={hasError ? `${id}-error` : `${id}-note`}
        className={`text-sm mt-1 ${
          hasError ? "text-red-500" : "text-[#909090]"
        }`}
        role={hasError ? "alert" : "note"}
      >
        {hasError ? errorMessage : bottomText}
      </p>
    </div>
  );
};

export default Password;
