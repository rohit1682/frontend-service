import api from "./apiConfig";

// Get list of all coaches
export const getCoachList = async () => {
  try {
    const response = await api.get("/coaches");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching coach list:", error);
    throw error;
  }
};

// Get coach by ID
export const getCoach = async (coachId: string) => {
  try {
    const response = await api.get(`/coaches/${coachId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coach details:", error);
    throw error;
  }
};

// Get available slots for a coach on a specific date
export const getAvailableSlot = async (coachId: string, date: string) => {
  try {
    const response = await api.get(
      `/coaches/${coachId}/available-slots/${date}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};

// Get feedback for a coach
export const getCoachFeedback = async (coachId: string) => {
  try {
    const response = await api.get(`/coaches/${coachId}/feedbacks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coach feedback:", error);
    throw error;
  }
};
