import { store } from "../../store/store";

interface ClientFeedbackFormData {
  comment: string;
  rating: string | number;
  workoutId: string;
  coachId: string;
}

interface CoachFeedbackFormData {
  comment: string;
  workoutId: string;
  clientId: string;
}

const coachFeedbackFromClient = async (
  formData: ClientFeedbackFormData
): Promise<boolean> => {
  // Mock implementation that simulates successful API call
  return true;
};

const clientFeedbackFromCoach = async (
  formData: CoachFeedbackFormData
): Promise<boolean> => {
  // Mock implementation that simulates successful API call
  return true;
};

export { coachFeedbackFromClient, clientFeedbackFromCoach };
