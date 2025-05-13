import api from "./apiConfig";

// Get available workouts with filters
export const getAvailableWorkouts = async (params: {
  date: string;
  slot?: string;
  coachId?: string;
  activity?: string;
  time?: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params.date) queryParams.append("date", params.date);
    if (params.slot) queryParams.append("slot", params.slot);
    if (params.coachId) queryParams.append("coachId", params.coachId);
    if (params.activity) queryParams.append("activity", params.activity);
    if (params.time) queryParams.append("time", params.time);

    const response = await api.get(
      `/workouts/available?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching available workouts:", error);
    throw error;
  }
};

// Get booked workouts for a user
export const getBookedWorkouts = async (userId: string) => {
  try {
    const response = await api.get(`/workouts/booked?userId=${userId}`);
    return response.data.data.content;
  } catch (error) {
    console.error("Error fetching booked workouts:", error);
    throw error;
  }
};

// Book a new workout
export const bookWorkout = async (bookingData: {
  clientId: string;
  coachId: string;
  date: string;
  timeSlot: string;
}) => {
  try {
    const response = await api.post("/workouts", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error booking workout:", error);
    throw error;
  }
};

// Cancel a booked workout
export const cancelWorkout = async (workoutId: string) => {
  try {
    await api.delete(`/workouts/${workoutId}`);
    return true;
  } catch (error) {
    console.error("Error during workout cancellation:", error);
    return false;
  }
};
