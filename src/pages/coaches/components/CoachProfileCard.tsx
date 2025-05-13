import Button from "../../../components/button/Button";
import { imagePlaceholder } from "../../../constants/imagePlaceholder";

interface CoachProfileCardProps {
  coach: {
    imageUrl: string;
    name: string;
    rating: number;
    summary: string;
    about: string;
    motivationPitch: string;
    specializations: string[];
  };
  handleAction: (action: string) => void;
  isSlotSelected: boolean;
}

const CoachProfileCard: React.FC<CoachProfileCardProps> = ({
  coach,
  handleAction,
  isSlotSelected,
}) => {
  console.log(coach);
  return (
    <div className="block md:block sm:flex md:max-w-[320px] rounded-lg overflow-hidden shadow-cardshadow bg-white h-fit">
      <img
        className="w-full aspect-square object-cover"
        src={coach.imageUrl || imagePlaceholder.cover}
        alt={coach.name}
      />
      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 justify-between text-lg">
            <h2>{coach.name}</h2>
            <p>
              <span>{coach.rating}</span>
              <span>⭐</span>
            </p>
          </div>
          <p className="text-gray-600 text-xs">{coach.summary}</p>
        </div>
        <div>
          <h3>About</h3>
          <p className="text-gray-600 text-sm">{coach.about}</p>
        </div>
        <div>
          <h3>Specialization</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {coach.specializations?.map((spec, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={() => handleAction("BOOK")}
            disabled={!isSlotSelected}
          >
            {isSlotSelected ? "Book Workout" : "Select a Time Slot First"}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => handleAction("REPEAT")}
          >
            Repeat Previous Workout
          </Button>
        </div>
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default CoachProfileCard;
