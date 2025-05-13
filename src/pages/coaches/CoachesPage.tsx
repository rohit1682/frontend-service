import React, { useEffect, useState } from "react";
import CoachCard from "../../components/coachCard/CoachCard";
import { Coach } from "../../types/coaches/Coaches";
import { getCoachList } from "../../api/coachsApi";
import WorkoutLoader from "../../components/loaders/WorkoutLoader";

const CoachesPage: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        setIsLoading(true);
        const coachesData = await getCoachList();
        setCoaches(coachesData.content);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  return (
    <div className="p-10 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <WorkoutLoader text="Loading coaches..." size="lg" />
        </div>
      ) : coaches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p>No coaches found.</p>
        </div>
      )}
    </div>
  );
};

export default CoachesPage;
