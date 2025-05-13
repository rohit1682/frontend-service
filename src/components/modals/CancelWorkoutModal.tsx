import React, { useState } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useToast } from "../../hooks/useToast";
import { cancelWorkout } from "../../api/workoutsApi";

interface CancelWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  workoutId?: string;
}

const CancelWorkoutModal: React.FC<CancelWorkoutModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  workoutId = "",
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelWorkout = async () => {
    if (!workoutId) {
      showToast(
        "error",
        "Cancellation Failed",
        "Unable to identify workout to cancel."
      );
      return;
    }

    try {
      setIsLoading(true);
      const isSuccessful = await cancelWorkout(workoutId);

      if (isSuccessful) {
        showToast(
          "success",
          "Workout Cancelled",
          "Your workout has been successfully cancelled."
        );
        // Wait for the toast to be visible before reloading
        setTimeout(() => {
          onCancel();
        }, 1000);
      } else {
        showToast(
          "error",
          "Cancellation Failed",
          "There was an error cancelling your workout. Please try again."
        );
      }
    } catch (error) {
      console.error("Error cancelling workout:", error);
      showToast(
        "error",
        "Cancellation Failed",
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-3">
        <DialogPanel className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full">
          <div className="flex justify-between items-center mb-2">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Cancel Workout
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
            >
              <X />
            </button>
          </div>

          <Description className="text-sm text-gray-600 mb-6">
            You're about to mark this workout as canceled. Are you sure you want
            to cancel this session? Any progress or data from this workout will
            not be saved.
          </Description>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 text-gray-800 rounded-md text-sm hover:bg-gray-100"
            >
              Resume Workout
            </button>
            <button
              onClick={handleCancelWorkout}
              disabled={isLoading}
              className="px-4 py-2 bg-[#9EF300] hover:bg-lime-400 text-black font-medium rounded-md text-sm transition flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Cancelling...
                </>
              ) : (
                "Cancel Workout"
              )}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CancelWorkoutModal;
