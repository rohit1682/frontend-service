import api from "./apiConfig";
import { store } from "../store/store";
import { AxiosError } from "axios";

// Client gives feedback to coach
export const coachFeedbackFromClient = async (formData: {
  comment: string;
  rating: string | number;
  workoutId: string;
  coachId: string;
}) => {
  // Get userData from Redux store directly
  const userData = store.getState().auth.userData;
  const clientId = userData?.sub || "";

  const requestBody = {
    clientId: clientId,
    coachId: formData.coachId,
    comment: formData.comment,
    rating:
      typeof formData.rating === "number"
        ? formData.rating.toString()
        : formData.rating,
    workoutId: formData.workoutId,
  };

  try {
    await api.post("/users/feedbacks", requestBody);
    return true;
  } catch (error) {
    console.error("Error during client feedback submission:", error);
    if (error instanceof AxiosError && error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

// Coach gives feedback to client
export const clientFeedbackFromCoach = async (formData: {
  comment: string;
  workoutId: string;
  clientId: string;
}) => {
  // Get userData from Redux store directly
  const userData = store.getState().auth.userData;
  const coachId = userData?.sub || "";

  const requestBody = {
    coachId: coachId,
    clientId: formData.clientId,
    comment: formData.comment,
    workoutId: formData.workoutId,
  };

  try {
    await api.post("/feedbacks", requestBody);
    return true;
  } catch (error) {
    console.error("Error during coach feedback submission:", error);
    if (error instanceof AxiosError && error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};
