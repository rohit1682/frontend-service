import Calendar from "./Calendar";
import TimeSlots from "./TimeSlots";

interface CoachScheduleProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  slots: string[];
  selectedSlot: string | null;
  setSelectedSlot: (slot: string | null) => void;
  loadingSlots: boolean;
  setLoadingSlots: (loading: boolean) => void;
}

const CoachSchedule: React.FC<CoachScheduleProps> = ({
  selectedDate,
  setSelectedDate,
  slots,
  selectedSlot,
  setSelectedSlot,

  loadingSlots,
}) => {
  return (
    <div className="-mt-4">
      <h2 className="text-gray-500 text-sm font-light mb-2">SCHEDULE</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <TimeSlots
          slots={slots}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          loadingSlots={loadingSlots}
        />
      </div>
    </div>
  );
};

export default CoachSchedule;
