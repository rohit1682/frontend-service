import React, { useState } from "react";
import TextProps from "../../types/components/text";

const Text: React.FC<TextProps> = ({
  id,
  value,
  onChange,
  legendText,
  placeholder,
  bottomText = "",
  hasError = false,
  errorMessage = "",
  className,
  isTextarea = false,
  customInput,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputType = legendText.toLowerCase() === "email" ? "email" : "text";

  return (
    <div id={id} className="w-full flex flex-col m-1 font-[300]">
      <fieldset
        className={`rounded-xl px-5 border ${
          hasError
            ? "border-[#FF4242]"
            : isFocused
            ? "border-black"
            : "border-[#DADADA]"
        }`}
      >
        <legend className="text-[11px] text-[#323A3A] -ml-2 px-2">
          {legendText}
        </legend>

        <label htmlFor={id} className="block w-full">
          {customInput ? (
            <div
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pt-1 pb-3"
            >
              {customInput}
            </div>
          ) : isTextarea ? (
            <textarea
              id={id}
              name={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`text-[14px] pt-1 pb-3 text-lg outline-none placeholder-[#909090] w-full resize-none whitespace-pre-wrap break-words ${className}`}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${id}-error` : `${id}-note`}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              rows={5}
            />
          ) : (
            <input
              id={id}
              name={id}
              value={value}
              onChange={onChange}
              type={inputType}
              placeholder={placeholder}
              className={`text-[14px] pt-1 pb-3 text-lg outline-none placeholder-[#909090] w-full ${className}`}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${id}-error` : `${id}-note`}
              autoComplete="on"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          )}
        </label>
      </fieldset>

      <p
        id={hasError ? `${id}-error` : `${id}-note`}
        className={`text-[14px] ${
          hasError ? "text-[#FF4242]" : "text-[#909090]"
        }
        `}
        role={hasError ? "alert" : "note"}
      >
        {hasError ? errorMessage : bottomText}
      </p>
    </div>
  );
};

export default Text;
