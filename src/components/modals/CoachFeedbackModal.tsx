import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../button/Button";
import { X, Calendar, Clock, Dumbbell } from "lucide-react";
import {
  validateFeedback,
  formatFeedbackPayload,
} from "../../utils/feedbackValidations/validationCoachFeedback";
import { useToast } from "../../hooks/useToast";
import { clientFeedbackFromCoach } from "../../api/feedbacksApi";

interface TrainerInfo {
  name: string;
  imageUrl: string;
  summary: string;
  rating: string;
  id: string;
}

interface WorkoutInfo {
  type: string;
  time: string;
  date: string;
}

interface CoachFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: TrainerInfo;
  workoutType: WorkoutInfo;
  workoutId?: string;
}

const CoachFeedbackModal: React.FC<CoachFeedbackModalProps> = ({
  isOpen,
  onClose,
  trainer,
  workoutType,
  workoutId = "",
}) => {
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @keyframes jiggle {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
      }
      .animate-jiggle {
        animation: jiggle 0.3s ease-in-out;
        border-color: #ef4444 !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const handleSubmit = async () => {
    const validationResult = validateFeedback(feedback);

    if (!validationResult.isValid) {
      showToast(
        "error",
        "Validation Error",
        validationResult.errorMessage || "Invalid feedback"
      );

      setIsError(true);
      setTimeout(() => setIsError(false), 500);
      return;
    }

    setIsLoading(true);
    const payload = formatFeedbackPayload(feedback, workoutId, trainer.id);

    try {
      const isSuccess = await clientFeedbackFromCoach(payload);

      if (isSuccess) {
        showToast(
          "success",
          "Feedback Submitted",
          "Your feedback has been sent successfully!"
        );
        setFeedback("");
      } else {
        showToast(
          "error",
          "Submission Failed",
          "Unable to submit feedback. Please try again."
        );
      }
    } catch (error) {
      showToast(
        "error",
        "Error",
        `Failed to submit feedback: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
      onClose();
      window.location.reload();
    }
  };

  const renderWorkoutDetails = () => (
    <div id="coach-workout-details" className="text-xs sm:text-lg">
      <div id="coach-workout-type" className="flex items-center space-x-2 pb-1">
        <Dumbbell className="text-gray-400 w-3 h-3 sm:w-5 sm:h-5" />
        <span className="font-semibold md:text-sm">Type:</span>{" "}
        <span className="font-light md:text-sm">{workoutType.type}</span>
      </div>

      <div id="coach-workout-time" className="flex items-center space-x-2 pb-1">
        <Clock className="text-gray-400 w-3 h-3 sm:w-5 sm:h-5" />
        <span>
          <span className="font-semibold md:text-sm">Time:</span>{" "}
          <span className="font-light md:text-sm">{workoutType.time}</span>
        </span>
      </div>

      <div id="coach-workout-date" className="flex items-center space-x-2 pb-2">
        <Calendar className="text-gray-400 w-3 h-3 sm:w-5 sm:h-5" />
        <span>
          <span className="font-semibold md:text-sm">Date:</span>{" "}
          <span className="font-light md:text-sm">{workoutType.date}</span>
        </span>
      </div>
    </div>
  );

  return (
    <Dialog
      id="coach-feedback-modal"
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div
        id="coach-feedback-backdrop"
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />
      <div
        id="coach-feedback-container"
        className="fixed inset-0 flex items-center justify-center p-3"
      >
        <DialogPanel
          id="coach-feedback-panel"
          className="bg-white p-5 rounded-lg shadow-xl max-w-xl w-full"
        >
          <header id="coach-feedback-header" className="flex flex-col mb-4">
            <div
              id="coach-feedback-title-row"
              className="flex justify-between items-center"
            >
              <DialogTitle
                id="coach-feedback-title"
                className="text-xl font-semibold text-gray-800"
              >
                Workout feedback
              </DialogTitle>
              <button
                id="coach-feedback-close"
                onClick={onClose}
                className="text-gray-300 hover:text-gray-500 text-lg cursor-pointer"
                aria-label="Close dialog"
              >
                <X />
              </button>
            </div>
            <p id="coach-feedback-subtitle" className="text-sm text-[#4B5563]">
              Please provide your feedback below
            </p>
          </header>

          <div id="coach-feedback-info" className="mb-6">
            <div
              id="coach-feedback-details"
              className="flex flex-row justify-around items-center gap-2"
            >
              <section
                id="coach-trainer-info"
                className="flex items-center gap-4"
              >
                <img
                  id="coach-trainer-image"
                  src={trainer.imageUrl}
                  alt={`Trainer ${trainer.name}`}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div
                  id="coach-trainer-details"
                  className="flex flex-col items-start gap-1"
                >
                  <h3
                    id="coach-trainer-name"
                    className="font-lexend text-[#4B5563] font-semibold text-[16px] sm:text-[18px] leading-7 sm:leading-8"
                  >
                    {trainer.name}
                  </h3>
                  <p
                    id="coach-trainer-role"
                    className="font-lexend text-[#4B5563] font-normal text-[13px] sm:text-[14px] leading-5"
                  >
                    Client
                  </p>
                  <div
                    id="coach-trainer-rating"
                    className="flex items-center gap-1 text-sm"
                  ></div>
                </div>
              </section>

              <fieldset
                id="coach-workout-info"
                className="inline-flex flex-col text-[#4c5664] sm:text-lg text-md px-3"
              >
                {renderWorkoutDetails()}
              </fieldset>
            </div>
          </div>

          <div id="coach-feedback-form" className="space-y-5 mb-6">
            <textarea
              id="coach-feedback-input"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={`w-full h-28 p-2 border ${
                isError ? "border-red-500 animate-jiggle" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EF300] text-sm placeholder:text-gray-500 placeholder:text-sm`}
              placeholder="Add your comments"
              aria-label="Feedback comments"
            />
          </div>

          <div id="coach-feedback-actions" className="flex justify-end">
            <Button
              id="coach-feedback-submit"
              variant="primary"
              onClick={handleSubmit}
              className="py-4 w-full bg-[#9EF300] hover:bg-lime-400"
              isLoading={isLoading}
            >
              Submit Feedback
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CoachFeedbackModal;
