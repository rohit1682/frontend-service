import { useState, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Star, X } from "lucide-react";
import Button from "../button/Button";
import { Calendar, Clock, Dumbbell } from "lucide-react";
import {
  validateFeedback,
  formatFeedbackPayload,
} from "../../utils/feedbackValidations/validationClientFeedback";
import { useToast } from "../../hooks/useToast";
import { coachFeedbackFromClient } from "../../api/feedbacksApi";

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

interface ClientFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainer: TrainerInfo;
  workoutType: WorkoutInfo;
  workoutId?: string;
}

const ClientFeedbackModal: React.FC<ClientFeedbackModalProps> = ({
  isOpen,
  onClose,
  trainer,
  workoutType,
  workoutId = "",
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [shakeStars, setShakeStars] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        20% { transform: rotate(-5deg); }
        40% { transform: rotate(5deg); }
        60% { transform: rotate(-3deg); }
        80% { transform: rotate(3deg); }
      }
      .animate-shake {
        animation: shake 0.8s ease-in-out;
      }
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
    const validationResult = validateFeedback(rating, feedback);

    if (!validationResult.isValid) {
      showToast(
        "error",
        "Validation Error",
        validationResult.errorMessage || "Invalid feedback"
      );

      if (rating === 0) {
        setShakeStars(true);
        setTimeout(() => setShakeStars(false), 800);
      }

      if (
        feedback.trim().length === 0 ||
        (feedback.trim().length > 0 && feedback.trim().length < 5) ||
        feedback.trim().length > 500
      ) {
        setIsError(true);
        setTimeout(() => setIsError(false), 500);
      }

      return;
    }

    setIsLoading(true);
    const payload = formatFeedbackPayload(
      rating,
      feedback,
      workoutId,
      trainer.id
    );

    try {
      const isSuccess = await coachFeedbackFromClient(payload);

      if (isSuccess) {
        showToast(
          "success",
          "Feedback Submitted",
          "Your feedback has been sent successfully!"
        );
        setRating(0);
        setFeedback("");
      } else {
        showToast(
          "error",
          "Submission Failed",
          "Unable to submit feedback. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
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
    <div id="client-workout-details" className="text-xs sm:text-lg">
      <div
        id="client-workout-type"
        className="flex items-center space-x-2 pb-1"
      >
        <Dumbbell className="text-gray-400 w-3 h-3 sm:w-5 sm:h-5" />
        <span className="font-semibold md:text-sm">Type:</span>{" "}
        <span className="font-light md:text-sm">{workoutType.type}</span>
      </div>

      <div
        id="client-workout-time"
        className="flex items-center space-x-2 pb-1"
      >
        <Clock className="text-gray-400 w-3 h-3 sm:w-5 sm:h-5" />
        <span>
          <span className="font-semibold md:text-sm">Time:</span>{" "}
          <span className="font-light md:text-sm">{workoutType.time}</span>
        </span>
      </div>

      <div
        id="client-workout-date"
        className="flex items-center space-x-2 pb-2"
      >
        <Calendar className="text-gray-400 w-3 h-3 sm:w-5 sm:h-5" />
        <span>
          <span className="font-semibold md:text-sm">Date:</span>{" "}
          <span className="font-light md:text-sm">{workoutType.date}</span>
        </span>
      </div>
    </div>
  );

  const renderStars = () => {
    return (
      <div
        id="client-star-rating-container"
        className={`flex items-center justify-evenly w-full ${
          shakeStars ? "animate-shake" : ""
        }`}
      >
        <div id="client-stars-wrapper" className="flex justify-center gap-4">
          {[...Array(5)].map((_, index) => {
            const starIndex = index + 1;

            return (
              <div
                id={`client-star-${starIndex}`}
                key={starIndex}
                className="relative"
                style={{ width: "30px", height: "30px" }}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <Star size={30} className="text-gray-300 absolute" />

                <div
                  id={`client-star-${starIndex}-half`}
                  className="absolute w-[15px] h-[30px] overflow-hidden cursor-pointer"
                  onClick={() => setRating(starIndex - 0.5)}
                  onMouseEnter={() => setHoveredRating(starIndex - 0.5)}
                  aria-label={`Rate ${starIndex - 0.5} stars`}
                >
                  <Star
                    size={30}
                    className={`${
                      starIndex - 0.5 <= (hoveredRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-transparent"
                    }`}
                  />
                </div>

                <div
                  id={`client-star-${starIndex}-full`}
                  className="absolute w-[15px] h-[30px] overflow-hidden cursor-pointer"
                  style={{ left: "15px" }}
                  onClick={() => setRating(starIndex)}
                  onMouseEnter={() => setHoveredRating(starIndex)}
                  aria-label={`Rate ${starIndex} stars`}
                >
                  <div style={{ marginLeft: "-15px" }}>
                    <Star
                      size={30}
                      className={`${
                        starIndex <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-transparent"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <span
          id="client-rating-text"
          className={`text-sm ${shakeStars ? "text-red-500" : "text-gray-400"}`}
        >
          {rating > 0 ? `${rating}/5 stars` : "Rate workout"}
        </span>
      </div>
    );
  };

  return (
    <Dialog
      id="client-feedback-modal"
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div
        id="client-feedback-backdrop"
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />
      <div
        id="client-feedback-container"
        className="fixed inset-0 flex items-center justify-center p-3"
      >
        <DialogPanel
          id="client-feedback-panel"
          className="bg-white p-5 rounded-lg shadow-xl max-w-xl w-full"
        >
          <header id="client-feedback-header" className="flex flex-col mb-4">
            <div
              id="client-feedback-title-row"
              className="flex justify-between items-center"
            >
              <DialogTitle
                id="client-feedback-title"
                className="text-xl font-semibold text-gray-800"
              >
                Workout feedback
              </DialogTitle>
              <button
                id="client-feedback-close"
                onClick={onClose}
                className="text-gray-300 hover:text-gray-500 text-lg cursor-pointer"
                aria-label="Close dialog"
              >
                <X />
              </button>
            </div>
            <p id="client-feedback-subtitle" className="text-sm text-[#4B5563]">
              Please rate your experience below
            </p>
          </header>

          <div id="client-feedback-info" className="mb-6">
            <div
              id="client-feedback-details"
              className="flex flex-row justify-around items-center gap-2"
            >
              <section
                id="client-trainer-info"
                className="flex items-center gap-4"
              >
                <img
                  id="client-trainer-image"
                  src={trainer.imageUrl}
                  alt={`Trainer ${trainer.name}`}
                  className="w-20 h-20 rounded-full object-cover"
                />

                <div
                  id="client-trainer-details"
                  className="flex flex-col items-start gap-1"
                >
                  <h3
                    id="client-trainer-name"
                    className="font-lexend text-[#4B5563] font-semibold text-[16px] sm:text-[18px] leading-7 sm:leading-8"
                  >
                    {trainer.name}
                  </h3>
                  <p
                    id="client-trainer-summary"
                    className="font-lexend text-[#4B5563] font-normal text-[13px] sm:text-[14px] leading-5"
                  >
                    {trainer.summary}
                  </p>
                  <div
                    id="client-trainer-rating"
                    className="flex items-center gap-1 text-sm"
                  >
                    <span className="text-[#4B5563]">{trainer.rating}</span>
                    <span className="text-yellow-400 text-[16px]">★</span>
                  </div>
                </div>
              </section>

              <fieldset
                id="client-workout-info"
                className="inline-flex flex-col text-[#4c5664] sm:text-lg text-md px-3"
              >
                {renderWorkoutDetails()}
              </fieldset>
            </div>
          </div>

          <div id="client-feedback-form" className="space-y-5 mb-6">
            <div id="client-stars-container">{renderStars()}</div>
            <textarea
              id="client-feedback-input"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className={`w-full h-28 p-2 border ${
                isError ? "border-red-500 animate-jiggle" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EF300] text-sm placeholder:text-gray-500 placeholder:text-sm resize-none`}
              placeholder="Add your comments"
              aria-label="Feedback comments"
            />
          </div>

          <div id="client-feedback-actions" className="flex justify-end">
            <Button
              id="client-feedback-submit"
              variant="primary"
              onClick={handleSubmit}
              className={`py-3 w-full ${
                rating === 0
                  ? "bg-gray-300 hover:bg-gray-400"
                  : "bg-[#9EF300] hover:bg-lime-400"
              }`}
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

export default ClientFeedbackModal;
