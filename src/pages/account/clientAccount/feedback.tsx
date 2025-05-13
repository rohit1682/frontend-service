import React, { useState } from "react";
import Button from "../../../components/button/Button";
import Coachfeedback from "../../../constants/coachFeedbackToClient";
import FeedbackCard from "../../../components/feedback/FeedbackCard";

const CoachFeedback: React.FC = () => {
  // Sample coach feedback data (you can replace this with your Coachfeedback import)
  const feedbackData = [
    {
      id: 1,
      coachName: "Coach Michael",
      date: "4/15/2025",
      rating: 5,
      feedback: "You've made tremendous progress with your strength training program over the last month. Your form has improved significantly, especially in squat technique. Focus on maintaining core engagement during deadlifts for your next milestone."
    },
    {
      id: 2,
      coachName: "Coach Sarah",
      date: "3/28/2025",
      rating: 5,
      feedback: "Your nutrition compliance has been exceptional! I've noticed better recovery between sessions and improved energy levels. The meal prep strategies we discussed are clearly working. Next month, let's focus on optimizing your pre-workout nutrition."
    },
    {
      id: 3,
      coachName: "Coach David",
      date: "2/14/2025",
      rating: 4,
      feedback: "Great improvement in your cardio endurance. You're consistently hitting your target heart rate zones and recovering faster. I recommend adding interval training twice weekly to break through your current plateau."
    },
    {
      id: 4,
      coachName: "Coach Emma",
      date: "1/30/2025",
      rating: 5,
      feedback: "Your mobility work is paying off! Your shoulder range of motion has increased by 15% since we started. Continue with the daily stretching routine we established, and consider adding yoga to your recovery days for additional benefits."
    },
    {
      id: 5,
      coachName: "Coach James",
      date: "1/5/2025",
      rating: 4,
      feedback: "Your consistency in following the program has been excellent. I've noticed improved technique in your Olympic lifts. For next month, let's work on explosiveness in the clean and jerk to prepare for your upcoming competition."
    },
    {
      id: 6,
      coachName: "Coach Lisa",
      date: "12/20/2024",
      rating: 5,
      feedback: "You've shown remarkable discipline with your sleep hygiene improvements. Your recovery metrics show significant improvement, and it's reflecting in your performance. Continue prioritizing 7-8 hours of quality sleep for optimal results."
    }
  ];

  // Helper to render stars
  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Coach Feedback</h2>
      <p className="text-gray-600 mb-8">
        Review feedback and recommendations from your coaches to track your
        progress and focus on improvement areas.
      </p>

      {/* Flex container */}
      <div className="flex flex-wrap  gap-4">
        {feedbackData.map((feedback) => (
          <div 
            key={feedback.id} 
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow "
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg mr-3">
                {feedback.coachName.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{feedback.coachName}</h3>
                <p className="text-gray-500 text-sm">{feedback.date}</p>
              </div>
              <div className="ml-auto">
                {renderStars(feedback.rating)}
              </div>
            </div>
            
            <p className="text-gray-700">{feedback.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachFeedback;