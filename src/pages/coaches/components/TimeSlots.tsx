import { format } from "date-fns";
import { useEffect } from "react";
import clsx from "clsx";

interface TimeSlotsProps {
  slots: string[];
  selectedDate: Date;
  selectedSlot?: string | null;
  setSelectedSlot: (slot: string | null) => void;
  loadingSlots?: boolean;
}

const TimeSlots = ({
  slots,
  selectedDate,
  selectedSlot,
  setSelectedSlot,
  loadingSlots,
}: TimeSlotsProps) => {
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  useEffect(() => {
    setSelectedSlot(null);
  }, [formattedDate, loadingSlots]);


  return (
    <div className="bg-white text-gray-600\">
      <div className="flex justify-between items-center my-4">
        <span className="text-sm font-medium">
          {format(selectedDate, "MMM d")}
        </span>
        <span className="text-xs text-gray-500">
          {slots.length} slots available
        </span>
      </div>

      <div className="overflow-y-auto max-h-[250px] min-h-[250px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {slots.length > 0 ? (
          <div className="space-y-2">
            {slots.map((time) => (
              <div
                key={time}
                onClick={() => setSelectedSlot?.(time)}
                className={clsx(
                  "p-4 rounded-lg cursor-pointer text-center font-light transition-all duration-300 hover:scale-105",
                  selectedSlot === time
                    ? "bg-lime-100 text-black border border-lime-500"
                    : "bg-lime-100 border border-transparent hover:border-lime-200"
                )}
              >
                {time}
              </div>
            ))}
          </div>
        ) : loadingSlots ? (
          <div className="bg-white text-gray-600 p-4 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm mt-2">
            No available slots for this date
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSlots;
