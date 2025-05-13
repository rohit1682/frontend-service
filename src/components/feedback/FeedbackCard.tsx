import { Star } from "lucide-react";
import { imagePlaceholder } from "../../constants/imagePlaceholder";

interface Feedback {
  _id: string;
  clientName: string;
  clientImageUrl: string;
  date: string;
  message: string;
  rating: number;
}

const FeedbackCard: React.FC<{ feedbackItem: Feedback }> = ({
  feedbackItem,
}) => {
  return (
    <div className="bg-white shadow-cardshadow rounded-2xl p-4 w-full text-gray-700">
      <div className="flex flex-wrap items-center gap-4 mb-3">
        <img
          src={feedbackItem.clientImageUrl||imagePlaceholder.profile}
          alt={feedbackItem.clientName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold">{feedbackItem.clientName}</h3>
          <p className="text-sm text-gray-400">{feedbackItem.date}</p>
        </div>
        <div className="ml-auto flex space-x-1 text-yellow-400">
          {Array.from({ length: feedbackItem.rating }, (_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600">{feedbackItem.message}</p>
    </div>
  );
};

export default FeedbackCard;