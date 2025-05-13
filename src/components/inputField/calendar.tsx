import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
} from "date-fns";
import clsx from "clsx";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useDropdown } from "../../context/DropdownContext";

type CalendarProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  className?: string;
};

const Calendar = ({
  selectedDate,
  setSelectedDate,
  className,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { activeDropdown, setActiveDropdown } = useDropdown();
  const dropdownId = "calendar-dropdown";
  const [isFocused, setIsFocused] = useState(false);

  const handleDateClick = (day: Date) => {
    if (isBefore(day, new Date()) && !isSameDay(day, new Date())) return;
    setSelectedDate(day);
    setActiveDropdown(null);
    setIsFocused(false);
  };

  const nextMonth = (e: React.MouseEvent) => {
    // Prevent event from bubbling up to parent elements
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (e: React.MouseEvent) => {
    // Prevent event from bubbling up to parent elements
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const toggleCalendar = () => {
    if (activeDropdown === dropdownId) {
      setActiveDropdown(null);
      setIsFocused(false);
    } else {
      setActiveDropdown(dropdownId);
      setIsFocused(true);
    }
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`#${dropdownId}`) && activeDropdown === dropdownId) {
        setActiveDropdown(null);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown, setActiveDropdown]);

  // Reset focus state when dropdown is closed from elsewhere
  useEffect(() => {
    if (activeDropdown !== dropdownId) {
      setIsFocused(false);
    }
  }, [activeDropdown]);

  const renderHeader = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={prevMonth}
            className="p-2"
            type="button" // Explicitly set button type to prevent form submission
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="text-sm font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <button
            onClick={nextMonth}
            className="p-2"
            type="button" // Explicitly set button type to prevent form submission
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="border-t border-gray-300 mb-4" />

        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-black"
            >
              {day}
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;
        const isPast = isBefore(day, new Date()) && !isSameDay(day, new Date());
        const isToday = isSameDay(day, selectedDate);

        days.push(
          <div
            key={day.toString()}
            className={clsx(
              "size-8 flex items-center justify-center mb-1 cursor-pointer rounded-full text-xs",
              {
                "text-gray-400": !isSameMonth(day, monthStart),
                "text-black": isSameMonth(day, monthStart),
                "bg-[#F6FFE5] border border-[#9EF300]": isToday,
                "hover:bg-[#F6FFE5]": !isPast,
                "cursor-not-allowed text-gray-300": isPast,
              }
            )}
            onClick={() => handleDateClick(cloneDay)}
          >
            {formattedDate}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="flex flex-col gap-2">{rows}</div>;
  };

  return (
    <div
      id={dropdownId}
      className={`w-full flex flex-col text-base font-light my-1 ${className}`}
    >
      <fieldset
        className={`w-full text-[14px] rounded-xl border ${
          isFocused || activeDropdown === dropdownId
            ? "border-black"
            : "border-[#DADADA]"
        }`}
      >
        <legend className="text-[11px] text-[#323A3A] ml-3 px-2">
          Select Date
        </legend>

        <div className="relative w-full block py-4 -mt-2">
          <button
            onClick={toggleCalendar}
            type="button"
            className="w-full px-5 bg-white rounded cursor-pointer flex justify-between items-center"
            aria-expanded={activeDropdown === dropdownId}
          >
            <span className="text-sm">{format(selectedDate, "MMMM dd")}</span>
            <ChevronDown
              className={clsx("w-5 h-5 text-gray-500 transition-transform", {
                "rotate-180": activeDropdown === dropdownId,
              })}
            />
          </button>

          {activeDropdown === dropdownId && (
            <div className="absolute z-10 w-full md:w-[250px] lg:w-[380px] xl:w-[400px] bg-white mt-6 border border-[#DADADA] rounded shadow-sm p-3">
              {renderHeader()}
              {renderDays()}
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default Calendar;
