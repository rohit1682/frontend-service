import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import FeedbackCard from "../../../components/feedback/FeedbackCard";

interface Feedback {
  _id: string;
  clientName: string;
  clientImageUrl: string;
  date: string;
  message: string;
  rating: number;
}

type SortOption = "date" | "rating";

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  const [sortOption, setSortOption] = useState<SortOption>("date");

  const sortedData = [...feedbacks].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.rating - a.rating;
  });

  return (
    <div className="relative">
      {/* Header and Sort */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-500 text-sm font-light mb-2">FEEDBACK</h2>
        <div className="flex items-center">
          <label className="text-sm mr-2 text-gray-500 font-extralight">
            Sort by
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#9EF300]"
          >
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Feedback Swiper */}
      {sortedData.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No feedback available
        </div>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".feedback-next",
              prevEl: ".feedback-prev",
            }}
            spaceBetween={18}
            style={{ height: "350px", padding: "10px 6px" }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
          >
            {sortedData.map((item) => (
              <SwiperSlide key={item._id}>
                <FeedbackCard feedbackItem={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between z-10 pointer-events-none">
            <button className="feedback-prev pointer-events-auto bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
              <ChevronLeft className="w-5 h-5 text-gray-500 hover:text-black" />
            </button>
            <button className="feedback-next pointer-events-auto bg-white/80 hover:bg-white rounded-full p-2 shadow-md">
              <ChevronRight className="w-5 h-5 text-gray-500 hover:text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackList;