import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  getAvailableSlot,
  getCoach,
  getCoachFeedback,
} from "../../api/coachsApi";
import { getBookedWorkouts, bookWorkout } from "../../api/workoutsApi";
import CoachProfileCard from "./components/CoachProfileCard";
import CoachSchedule from "./components/CoachSchedule";
import { UpcomingWorkouts } from "./components/UpcomingWorkouts";
import FeedbackList from "./components/FeedbackList";
import { imagePlaceholder } from "../../constants/imagePlaceholder";
import WorkoutLoader from "../../components/loaders/WorkoutLoader";
import BookingConfirmationModal from "../../components/modals/BookingConfirmationModal";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../context/AuthContext";
import { filterSlotsCoach } from "../../utils/filterSlots";

export interface Workout {
  _id: string;
  activity: string;
  dateTime: Date;
  slot: string;
}

interface Coach {
  imageUrl: string;
  name: string;
  rating: number;
  summary: string;
  about: string;
  motivationPitch: string;
  preferableActivity: string;
  specializations: string[];
}

interface Feedback {
  _id: string;
  clientImageUrl: string;
  message: string;
  rating: number;
  clientName: string;
  date: string;
}

const CoachDetailPage = () => {
  const { showToast } = useToast();
  const { userData } = useAuth();
  const { coachId } = useParams();
  const [coach, setCoach] = useState<Coach | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [upcomingWorkouts, setUpcomingWorkouts] = useState<Workout[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const fetchCoach = async (coachId: string) => {
    try {
      const responseData = await getCoach(coachId);
      setCoach(responseData.data.content[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAvailableSlots = async (coachId: string, date: string) => {
    setAvailableSlots([]);
    setLoadingSlots(true);
    try {
      const responseData = await getAvailableSlot(coachId, date);
      setAvailableSlots(filterSlotsCoach(responseData.data.content, date));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSlots(false);
    }
  };

  const formatDateForAPI = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchUpcomingWorkouts = useCallback(
    async (coachId: string) => {
      try {
        const responseData = await getBookedWorkouts(coachId);

        const futureWorkouts = responseData.filter((workout: Workout) => {
          const workoutDate = new Date(workout.dateTime);
          const targetDate = new Date(selectedDate);

          workoutDate.setHours(0, 0, 0, 0);
          targetDate.setHours(0, 0, 0, 0);

          return workoutDate.getTime() === targetDate.getTime();
        });
        setUpcomingWorkouts(futureWorkouts);
      } catch (error) {
        console.error(error);
      }
    },
    [selectedDate]
  );

  const fetchFeedbacks = async (coachId: string) => {
    try {
      const responseData = await getCoachFeedback(coachId);
      setFeedbacks(responseData.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!coachId) return;
    fetchCoach(coachId);
    fetchAvailableSlots(coachId, formatDateForAPI(selectedDate));
    fetchUpcomingWorkouts(coachId);
    fetchFeedbacks(coachId);
  }, [coachId, selectedDate, fetchUpcomingWorkouts]);

  useEffect(() => {
    if (!coachId) return;
    fetchAvailableSlots(coachId, formatDateForAPI(selectedDate));
    fetchUpcomingWorkouts(coachId);
  }, [selectedDate, coachId, fetchUpcomingWorkouts]);

  if (!coach) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <WorkoutLoader text="Loading coach details..." size="lg" />
      </div>
    );
  }

  const formatDateWithOrdinal = (timeSlot: string): string => {
    if (!timeSlot) return "";
    const [time] = timeSlot.split("-");
    const lastTwoChars = timeSlot.slice(-2);
    return `${time.trim()} ${lastTwoChars}`;
  };

  const handleAction = (action: string) => {
    if (action === "BOOK") {
      if (!selectedSlot) {
        showToast(
          "error",
          "No Slot Selected",
          "Please select a time slot before booking"
        );
        return;
      }
      setIsOpen(true);
    } else if (action === "REPEAT") {
      setSelectedSlot(null);
    }
  };

  const handleConfirmBooking = async () => {
    if (!userData) {
      showToast(
        "error",
        "Authentication Error",
        "Please log in to book a workout"
      );
      return;
    }

    setIsBooking(true);
    try {
      const bookingRequest = {
        clientId: userData.sub,
        coachId: coachId || "",
        date: formatDateForAPI(selectedDate),
        timeSlot: selectedSlot || "",
      };

      await bookWorkout(bookingRequest);
      showToast(
        "success",
        "Booking Successful",
        "Your workout has been booked successfully!"
      );
      setIsOpen(false);
      fetchAvailableSlots(coachId || "", formatDateForAPI(selectedDate));
      fetchUpcomingWorkouts(coachId || "");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to book workout. Please try again.";
      showToast("error", "Booking Failed", errorMessage);
      console.error(error);
    } finally {
      setIsBooking(false);
    }
  };

  const formattedCoach = {
    Cid: coachId || "",
    id: parseInt(coachId || "0"),
    coachName: coach?.name || "",
    title: coach?.preferableActivity || "",
    image: coach?.imageUrl || imagePlaceholder.cover,
    rating: coach?.rating || 0,
    description: coach?.summary || "",
    availableSlots: availableSlots,
    bookingDetails: {
      type: coach?.preferableActivity || "",
      duration: "1h",
      date: `${selectedDate.toLocaleDateString()}, ${formatDateWithOrdinal(
        selectedSlot || ""
      )}`,
      time: selectedSlot || "",
    },
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      <div className="flex flex-col md:flex-row gap-4">
        <CoachProfileCard
          coach={coach}
          handleAction={handleAction}
          isSlotSelected={!!selectedSlot}
        />
        <div className="flex-1 overflow-hidden bg-white p-4 space-y-8">
          <CoachSchedule
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            slots={availableSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            loadingSlots={loadingSlots}
            setLoadingSlots={setLoadingSlots}
          />
          <UpcomingWorkouts upcomingWorkouts={upcomingWorkouts} />
          <FeedbackList feedbacks={feedbacks} />
        </div>
      </div>

      <BookingConfirmationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmBooking}
        coach={formattedCoach}
        isLoading={isBooking}
      />
    </div>
  );
};

export default CoachDetailPage;
