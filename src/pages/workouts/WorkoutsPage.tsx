import { useEffect, useState } from "react";
import WorkoutCard from "../../components/workouts/WorkoutCard";
import TitleBar from "../../layouts/MainLayout/components/TitleBar";
import { getBookedWorkouts } from "../../api/workoutsApi";
import { useAppSelector } from "../../store/hooks";
import { Workout } from "../../types/workout";
import WorkoutLoader from "../../components/loaders/WorkoutLoader";

const WorkoutsPage = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const [userWorkouts, setUserWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (userData?.sub) {
        try {
          setIsLoading(true);
          const bookedWorkouts = await getBookedWorkouts(userData.sub);
          if (bookedWorkouts && Array.isArray(bookedWorkouts)) {
            setUserWorkouts(bookedWorkouts);
          }
        } catch (error) {
          console.error("Error fetching booked workouts:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchWorkouts();
  }, [userData]);

  return (
    <>
      <TitleBar title="My Workouts" />
      <div className="w-full p-6">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <WorkoutLoader text="Loading workouts..." size="lg" />
          </div>
        ) : userWorkouts.length > 0 ? (
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {userWorkouts.map((item) => (
              <WorkoutCard key={item._id || item.id} workout={item} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p>No workouts found. Book a workout to get started!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkoutsPage;
