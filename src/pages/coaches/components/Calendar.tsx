/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const hasSlots = (date: Date) => {
    // const formattedDate = format(date, "yyyy-MM-dd");
    // return slots.some((slot) => slot.date === formattedDate);
    return true;
  };

  const handleDateClick = (day: Date) => {
    if (isBefore(day, new Date()) && !isSameDay(day, new Date())) return;
    if (!hasSlots(day)) return;
    setSelectedDate(day);
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

  const renderHeader = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return (
      <>
        <div className="flex items-center justify-between my-3">
          <button
            onClick={prevMonth}
            className="p-1"
            type="button" // Explicitly set button type to prevent form submission
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-medium">
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <button
            onClick={nextMonth}
            className="p-1"
            type="button" // Explicitly set button type to prevent form submission
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="border-t border-gray-300 mb-2" />

        <div className="flex justify-between mb-1">
          {days.map((day) => (
            <div key={day} className="w-8 text-center text-xs text-gray-600">
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
        const cloneDay = day;
        const formattedDate = format(day, "d");
        const isPast = isBefore(day, new Date()) && !isSameDay(day, new Date());
        const isToday = isSameDay(day, selectedDate);
        const noSlots = !hasSlots(day);

        days.push(
          <div
            key={day.toString()}
            title={noSlots ? "No available slots" : ""}
            className={clsx(
              "size-10 flex items-center justify-center cursor-pointer rounded-full text-sm font-light",
              {
                "text-gray-400": !isSameMonth(day, monthStart),
                "text-black": isSameMonth(day, monthStart),
                "bg-[#F6FFE5] border border-[#9EF300]": isToday,
                "hover:bg-[#F6FFE5]": !isPast && !noSlots,
                "cursor-not-allowed text-gray-400": isPast || noSlots,
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
        <div className="flex gap-1 justify-between" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex flex-col gap-1">{rows}</div>;
  };
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
      <div className="bg-white rounded-lg w-full">
        <div className="w-full">
          {renderHeader()}
          {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
