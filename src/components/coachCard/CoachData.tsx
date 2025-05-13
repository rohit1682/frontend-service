import { FC } from "react";
import { Star } from "lucide-react";
import type { CoachData } from "../../types/coaches/CoachData";

interface CoachCardProps {
  coach: CoachData;
  onBookClick?: () => void; // <-- Optional prop for triggering modal
}

const CoachData: FC<CoachCardProps> = ({ coach, onBookClick }) => {
  return (
    <div className=" bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
      <img
        src={coach.imageUrl}
        alt={coach.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4 flex flex-col gap-3 text-sm">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">{coach.name}</h3>
            <p className="text-xs text-gray-500">{coach.summary}</p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium">
            {coach.rating}
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="font-medium text-gray-800 mb-1">About Coach</h4>
          <p className="text-gray-600 text-xs leading-relaxed">{coach.about}</p>
        </div>

        {/* Specialization */}
        <div>
          <h4 className="font-medium text-gray-800 mb-1">Specialization</h4>
          <div className="flex flex-wrap gap-2">
            {coach.specialization.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-200 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h4 className="font-medium text-gray-800 mb-1">Certificates</h4>
          <ul className="list-disc list-inside text-xs text-blue-600 space-y-1">
            {coach.certificates.map((cert) => (
              <li key={cert.name}>
                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                  {cert.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            className="bg-lime-400 hover:bg-lime-500 text-white text-sm py-2 rounded-md"
            onClick={onBookClick} // <-- Trigger modal here
          >
            {coach.buttons.primary}
          </button>
          <button className="border border-gray-400 text-gray-700 text-sm py-2 rounded-md">
            {coach.buttons.secondary}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachData;
