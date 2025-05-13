import React, { useState, useMemo } from "react";
import Button from "../button/Button";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../modals/LoginModal";
import { useNavigate } from "react-router-dom";
import { homeSearchCard } from "../../types/homeSearchCard";
import { formatDateTime } from "../../utils/home/formatDateTime";
import { imagePlaceholder } from "../../constants/imagePlaceholder";

interface CoachCardProps {
  coach: homeSearchCard;
  dateTime: string;
  onBook: (
    coach: homeSearchCard,
    dateTime: string,
    selectedSlot: string,
    originalDateTime: string
  ) => void;
}

const WorkoutCard = ({ coach, dateTime, onBook }: CoachCardProps) => {
  const { isLoggedIn } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isBooking] = useState(false);
  const navigate = useNavigate();
  const [originalDateTime] = useState(dateTime);

  // Use the first available slot as default
  const initialSlot =
    coach.availableSlots && coach.availableSlots.length > 0
      ? coach.availableSlots[0]
      : "10:00 AM - 11:00 AM";

  // State for selected slot
  const [selectedSlot, setSelectedSlot] = useState(initialSlot);

  // Extract start time from the slot (e.g., "10:00 AM - 11:00 AM" -> "10:00 AM")
  const getStartTime = (slot: string) => {
    return slot.split(" - ")[0];
  };

  // Format the date and time
  const formattedDateTime = useMemo(() => {
    return formatDateTime(dateTime, getStartTime(selectedSlot));
  }, [dateTime, selectedSlot]);

  const handleSelectSlot = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleBookingClick = () => {
    if (isLoggedIn) {
      onBook(coach, formattedDateTime, selectedSlot, originalDateTime);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleCoachProfile = () => {
    navigate(`/coaches/${coach.id}`);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-6 text-[#4B5563] rounded-xl shadow-cardshadow bg-white transform transition duration-300 hover:scale-103">
        <div className="flex flex-col md:flex-col lg:flex-row gap-6">
          {/* Coach Info */}
          <div className="flex flex-col md:flex-row lg:flex-row gap-4 flex-1 items-start">
            <img
              src={coach.imageUrl || imagePlaceholder.profile}
              alt={coach.name}
              className="w-20 h-20 object-cover rounded-full "
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-medium">{coach.name}</h2>
              <p className="text-sm font-light">{coach.summary}</p>
              <div className="flex items-center gap-1 text-sm">
                <span>{coach.rating}</span>
                <img
                  src="/images/star-01.png"
                  alt="Rating Star"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <fieldset className="border border-lime-400 rounded-lg p-4 flex-1">
            <legend className="px-2 text-sm font-light">Booking details</legend>
            <div className="flex items-center gap-2 mb-2 text-sm">
              <img src="/images/dumbbell.png" className="w-4 h-4" alt="Type" />
              <strong className="font-medium">Type:</strong>{" "}
              <span className="font-light"> {coach.preferableActivity} </span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-sm">
              <img src="/images/Time.png" className="w-4 h-4" alt="Time" />
              <strong className="font-medium">Time:</strong> <span> 1h </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <img src="/images/Calendar.png" className="w-4 h-4" alt="Date" />
              <strong className="font-medium">Date:</strong>{" "}
              <span>{formattedDateTime}</span>
            </div>
          </fieldset>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-light">{coach.motivationPitch}</p>

          <div>
            <p className="text-sm text-[#323232] font-light mb-1">
              Also available for this date:
            </p>
            <div className="flex flex-wrap gap-2">
              {coach.availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSlot(slot)}
                  className={`px-3 py-1 ${
                    slot === selectedSlot
                      ? "bg-lime-500 text-white font-medium"
                      : "bg-lime-50 font-light"
                  } rounded-md text-sm cursor-pointer hover:bg-lime-200 transition-colors`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Button
              variant="secondary"
              className="flex-1 h-12 border border-gray-700 rounded-lg"
              onClick={handleCoachProfile}
            >
              Coach Profile
            </Button>
            <Button
              variant="primary"
              className="flex-1 h-12 rounded-lg"
              onClick={handleBookingClick}
              isLoading={isBooking}
            >
              Book Workout
            </Button>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default WorkoutCard;
