import { CalendarDays, Timer } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

interface Workout {
  _id: string;
  activity: string;
  dateTime: Date;
  slot: string;
  state: string;
}

interface UpcomingBookingsProps {
  upcomingWorkouts: Workout[];
}

const filterPastWorkouts = (workouts: Workout[]): Workout[] => {
  const currentTime = new Date();

  return workouts.filter((workout) => {
    const workoutDateTime = new Date(workout.dateTime);
    return (
      workoutDateTime > currentTime &&
      workout.state !== "FINISHED" &&
      workout.state !== "CANCELLED"
    );
  });
};

export const UpcomingWorkouts = ({
  upcomingWorkouts,
}: UpcomingBookingsProps) => {
  const formatDateWithOrdinal = (timeSlot: string): string => {
    if (!timeSlot) return "";
    const date = new Date(timeSlot);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Convert to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;

    // Format minutes with leading zero if needed
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours12}:${formattedMinutes} ${period}`;
  };

  const { isLoggedIn } = useAuth();
  const filteredWorkouts = filterPastWorkouts(upcomingWorkouts);

  return (
    <div>
      <h2 className="text-gray-500 text-sm font-light mb-2">
        UPCOMING WORKOUTS
      </h2>
      {!isLoggedIn ? (
        <div className="text-center text-gray-500 py-4">
          <p>
            Please{" "}
            <Link to="/auth/login" className="text-blue-500 hover:underline">
              login
            </Link>{" "}
            to view upcoming workouts
          </p>
        </div>
      ) : filteredWorkouts.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          No upcoming workouts
        </div>
      ) : (
        <div className="space-y-2">
          {filteredWorkouts.map((workout) => (
            <div
              key={workout._id}
              className="flex transition-transform duration-500 hover:scale-103 justify-between items-center p-4 border-l-8 border-blue-200 bg-blue-50 rounded"
            >
              <div className="grid grid-cols-2 gap-6">
                <h4 className="font-medium">{workout.activity}</h4>
                <div className="flex items-center font-light gap-2 text-sm">
                  <CalendarDays className="size-4" />
                  <span className="min-w-[140px]">
                    {new Date(workout.dateTime).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-light text-sm mr-10">
                <Timer className="size-4" />
                <span>
                  {formatDateWithOrdinal(workout.dateTime.toString())}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
