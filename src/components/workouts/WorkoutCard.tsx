/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { PiCalendarCheck } from "react-icons/pi";
import { Workout } from "../../types/workout";
import { formatWorkoutDate } from "../../utils/formatDateTime";
import Button from "../button/Button";
import CancelWorkoutModal from "../modals/CancelWorkoutModal";
import ClientFeedbackModal from "../modals/ClientFeedbackModal";
import CoachFeedbackModal from "../modals/CoachFeedbackModal";
import { coachesData } from "../../constants/coaches";
import { useAuth } from "../../context/AuthContext";

interface WorkoutCardProps {
  workout: Workout;
  onWorkoutUpdated?: () => void;
}

const statusColors: Record<string, string> = {
  SCHEDULED: "bg-[var(--color-status-scheduled)]",
  WAITING_FOR_FEEDBACK: "bg-[var(--color-status-waiting)]",
  FINISHED: "bg-[var(--color-status-finished)]",
  CANCELLED: "bg-[var(--color-status-cancelled)]",
  IN_PROGRESS: "bg-[var(--color-status-in-progress)]",
  Scheduled: "bg-[var(--color-status-scheduled)]",
  "Waiting for feedback": "bg-[var(--color-status-waiting)]",
  Finished: "bg-[var(--color-status-finished)]",
  Cancelled: "bg-[var(--color-status-cancelled)]",
  "In progress": "bg-[var(--color-status-in-progress)]",
};

const formatDateWithOrdinal = (isoDate: string): string => {
  const date = new Date(isoDate);
  date.setHours(date.getHours() - 5);
  date.setMinutes(date.getMinutes() - 30);

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const monthDay = date
    .toLocaleString("en-US", { month: "long", day: "numeric" })
    .replace(/(\d+)/, `$1${suffix}`);

  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${monthDay}, ${time}`;
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  onWorkoutUpdated,
}) => {
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isClientFeedbackModalOpen, setClientFeedbackModalOpen] =
    useState(false);
  const [isCoachFeedbackModalOpen, setCoachFeedbackModalOpen] = useState(false);

  const { userData } = useAuth();
  const isCoach = userData?.role?.toLowerCase() === "coach";

  const workoutTitle = workout.name || workout.title || "";
  const workoutDescription = workout.description || "";
  const workoutDate =
    workout.dateTime || workout.date || new Date().toISOString();
  const currentDate = new Date();
  const workoutDateObj = new Date(workoutDate);

  let calculatedStatus = workout.state || workout.status || "SCHEDULED";

  if (workoutDateObj < currentDate) {
    calculatedStatus = "WAITING_FOR_FEEDBACK";
  }

  const oneHourBeforeWorkout = new Date(workoutDateObj.getTime());
  oneHourBeforeWorkout.setHours(oneHourBeforeWorkout.getHours() - 1);

  if (currentDate >= oneHourBeforeWorkout && currentDate < workoutDateObj) {
    calculatedStatus = "IN_PROGRESS";
  }

  const isCancelledOrFinished =
    workout.state === "CANCELLED" ||
    workout.status === "CANCELLED" ||
    workout.state === "Cancelled" ||
    workout.status === "Cancelled" ||
    workout.state === "FINISHED" ||
    workout.status === "FINISHED" ||
    workout.state === "Finished" ||
    workout.status === "Finished";

  let workoutStatus = isCancelledOrFinished
    ? workout.state || workout.status
    : calculatedStatus;

  const statusMap: Record<string, string> = {
    WAITING_FOR_FEEDBACK: "Waiting for feedback",
    "Waiting for feedback": "Waiting for feedback",
    SCHEDULED: "Scheduled",
    Scheduled: "Scheduled",
    FINISHED: "Finished",
    Finished: "Finished",
    CANCELLED: "Cancelled",
    Cancelled: "Cancelled",
    IN_PROGRESS: "In progress",
    "In progress": "In progress",
  };

  if (typeof workoutStatus === "string") {
    workoutStatus = statusMap[workoutStatus] || workoutStatus;
  }

  const workoutId = workout._id;
  const workoutAction =
    workout.action ||
    (workoutStatus === "Scheduled"
      ? "Cancel Workout"
      : workoutStatus === "Waiting for feedback"
      ? "Leave Feedback"
      : null);

  const selectedTrainer =
    coachesData.find((coach) => coach.id === workout.coachId) || coachesData[0];

  const trainerData = {
    name: workout.coachName || selectedTrainer.name,
    imageUrl: selectedTrainer.imageUrl,
    summary: selectedTrainer.summary,
    rating: selectedTrainer.rating,
    id: workout.coachId || selectedTrainer.id,
  };

  const workoutTypeData = {
    type: workout.activity || selectedTrainer.summary,
    time: "1 h",
    date: formatDateWithOrdinal(workoutDate),
  };

  const handleActionClick = () => {
    if (workoutAction === "Cancel Workout") {
      setCancelModalOpen(true);
    } else if (workoutAction === "Leave Feedback") {
      if (isCoach) {
        setCoachFeedbackModalOpen(true);
      } else {
        setClientFeedbackModalOpen(true);
      }
    }
  };

  return (
    <>
      <article className="p-4 md:p-6 space-y-3 shadow-cardshadow rounded-xl w-full transition-transform duration-300 hover:scale-105">
        <header className="flex justify-between items-center">
          <h3 className="font-semibold">{workoutTitle}</h3>
          <span
            className={`px-3 py-1 text-xs rounded-full text-white ${
              statusColors[workoutStatus as keyof typeof statusColors] ||
              "bg-gray-400"
            }`}
            aria-label={`Status: ${workoutStatus}`}
          >
            {workoutStatus}
          </span>
        </header>

        <p className="font-light text-sm">{workoutDescription}</p>

        <div className="flex items-center gap-1">
          <PiCalendarCheck className="text-gray-500" aria-hidden="true" />
          <p className="text-sm">{workoutTypeData.date}</p>
        </div>

        {workoutAction && (
          <Button
            variant="secondary"
            onClick={handleActionClick}
            className="ml-auto"
          >
            {workoutAction}
          </Button>
        )}
      </article>

      <CancelWorkoutModal
        isOpen={isCancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onCancel={() => {
          setCancelModalOpen(false);
          window.location.reload();
        }}
        workoutId={workoutId}
      />

      <ClientFeedbackModal
        isOpen={isClientFeedbackModalOpen}
        onClose={() => setClientFeedbackModalOpen(false)}
        trainer={trainerData}
        workoutType={workoutTypeData}
        workoutId={workoutId}
      />

      <CoachFeedbackModal
        isOpen={isCoachFeedbackModalOpen}
        onClose={() => setCoachFeedbackModalOpen(false)}
        trainer={trainerData}
        workoutType={workoutTypeData}
        workoutId={workoutId}
      />
    </>
  );
};

export default WorkoutCard;
