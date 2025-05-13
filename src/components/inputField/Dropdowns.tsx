import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import DropdownProps from "../../types/components/dropdown";

const Dropdown: React.FC<DropdownProps> = ({
  id,
  legendText,
  htmlFor,
  value = "",
  onChange,
  children,
  className = "",
  bottomText = "",
  hasError = false,
  errorMessage = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when value changes
  useEffect(() => {
    setIsOpen(false);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleButtonFocus = () => {
    setIsFocused(true);
  };

  const handleButtonBlur = (e: React.FocusEvent) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectOption(option);
  };

  return (
    <div
      id={id}
      ref={dropdownRef}
      className={`w-full flex flex-col text-base font-light my-1 ${className}`}
    >
      <fieldset
        className={`w-full text-[14px] rounded-xl border ${
          hasError
            ? "border-red-500"
            : isFocused
            ? "border-black"
            : "border-[#DADADA]"
        }`}
      >
        <legend className="text-[11px] text-[#323A3A] ml-3 px-2">
          {legendText}
        </legend>

        <label htmlFor={htmlFor} className="relative w-full block py-4 -mt-2">
          <button
            ref={buttonRef}
            id={htmlFor}
            type="button"
            className="w-full px-5 bg-white rounded cursor-pointer flex justify-between items-center"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            onFocus={handleButtonFocus}
            onBlur={handleButtonBlur}
          >
            <span>{value}</span>
            <ChevronDown
              className={clsx("w-5 h-5 text-gray-500 transition-transform", {
                "rotate-180": isOpen,
              })}
            />
          </button>

          {isOpen && (
            <ul
              role="listbox"
              aria-labelledby={htmlFor}
              className="absolute z-10 w-full bg-white mt-2 border border-[#DADADA] rounded shadow-sm"
            >
              {children.map((option, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={value === option}
                  onClick={(e) => handleOptionClick(option, e)}
                  className={`flex items-center justify-between px-5 py-2 cursor-pointer hover:bg-[#F6FFE5] ${
                    value === option ? "bg-[#F6FFE5]" : ""
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectOption(option);
                    }
                  }}
                >
                  <span>{option}</span>
                  {value === option && (
                    <FaCheck
                      data-testid="check-icon"
                      className="text-black text-xl"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </label>
      </fieldset>

      {bottomText && !hasError && (
        <p className="text-sm text-[#909090] mt-1" role="note">
          {bottomText}
        </p>
      )}

      {hasError && errorMessage && (
        <p className="text-sm text-red-500 mt-1" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
