import React, { useState } from "react";

interface Slot {
  date: string;
  times: string[];
}

interface CoachSlotPickerProps {
  slots: Slot[];
}

const CoachSlotPicker: React.FC<CoachSlotPickerProps> = ({ slots }) => {
  const [selectedDate, setSelectedDate] = useState(slots[0]?.date || "");

  const selectedDaySlots = slots.find((s) => s.date === selectedDate);

  return (
    <div className="mt-6 bg-white rounded-2xl shadow p-4 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3">Select a Time Slot</h3>

      {/* Date buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {slots.map((slot) => (
          <button
            key={slot.date}
            onClick={() => setSelectedDate(slot.date)}
            className={`px-3 py-1 rounded-md text-sm border ${
              selectedDate === slot.date
                ? "bg-lime-400 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {new Date(slot.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </button>
        ))}
      </div>

      {/* Time slots */}
      <div className="grid grid-cols-3 gap-2">
        {selectedDaySlots?.times.map((time) => (
          <div
            key={time}
            className="text-sm px-2 py-1 rounded-md border text-center bg-blue-50 hover:bg-blue-100 cursor-pointer"
          >
            {time}
          </div>
        )) || <p>No slots available.</p>}
      </div>
    </div>
  );
};

export default CoachSlotPicker;
