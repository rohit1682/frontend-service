import React from "react";
import { Coach } from "../../types/coaches/Coaches";
import Button from "../button/Button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoachCard: React.FC<{ coach: Coach }> = ({ coach }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/coaches/${coach.id}`);
  };

  const handleButtonClick = () => {
    navigate(`/coaches/${coach.id}`); // Redirect from button too
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow-cardshadow rounded-xl overflow-hidden flex flex-col text-gray-600 transform transition duration-200 hover:scale-103 hover:cursor-pointer border-[0.5px] border-transparent hover:border-gray-500"
    >
      <img
        src={coach.imageUrl? coach.imageUrl : 'https://placehold.co/600x400'}
        alt={coach.name}
        className="w-full h-40 object-cover"
      />
      <div className="flex flex-col justify-between m-4 space-y-4 h-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-md font-medium">{coach.name}</h3>
            <p className="text-xs">{coach.summary}</p>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm">{coach.rating}</span>
            <span>
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
            </span>
          </div>
        </div>
        <p className="text-xs flex-1">{coach.motivationPitch}</p>

        <Button className="" variant="primary" onClick={handleButtonClick}>
          Book Workout
        </Button>
      </div>
    </div>
  );
};

export default CoachCard;
