import React from "react";
import Modal from "./Modal";
import Button from "../button/Button";
import { Coach } from "../../types/Bookingdetails";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  coach: Coach;
  isLoading?: boolean;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  coach,
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm your booking"
      className="max-w-lg"
      actions={
        <div className="w-full">
          <Button
            variant="primary"
            onClick={onConfirm}
            isLoading={isLoading}
            className="w-full mt-1 py-4"
          >
            {isLoading ? "Booking..." : "Confirm"}
          </Button>
        </div>
      }
    >
      <p className="text-sm font-light text-[#4B5563] mb-4">
        Please double check your workout details.
      </p>

      <div className="flex gap-5 text-[#4B5563]">
        <div className="flex items-center gap-4">
          <img
            src={coach.image}
            alt={coach.coachName}
            className="w-16 h-16 object-cover rounded-full"
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-base">{coach.coachName}</h3>
            <p className="text-sm text-[#4B5563]">{coach.title}</p>
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <img src="/images/dumbbell.png" className="w-4 h-4" alt="Type" />
            <span>
              <strong>Type:</strong>
              <span className="font-light"> {coach.bookingDetails.type} </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img src="/images/Time.png" className="w-4 h-4" alt="Time" />
            <span>
              <strong>Time:</strong>
              <span className="font-light">
                {" "}
                {coach.bookingDetails.duration} {" "}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <img src="/images/Calendar.png" className="w-4 h-4" alt="Date" />
            <span>
              <strong>Date:</strong>
              <span className="font-light"> {coach.bookingDetails.date} </span>
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingConfirmationModal;
