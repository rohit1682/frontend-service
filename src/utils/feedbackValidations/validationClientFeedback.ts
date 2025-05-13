interface FeedbackValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateFeedback = (
  rating: number,
  feedback: string
): FeedbackValidationResult => {

  if (rating === 0) {
    return {
      isValid: false,
      errorMessage: "Please select a rating before submitting feedback",
    };
  }

  if (feedback.trim().length === 0) {
    return {
      isValid: false,
      errorMessage: "Please provide feedback before submitting",
    };
  }

  if (rating > 5) {
    return {
      isValid: false,
      errorMessage: "Rating must be between 0.5 and 5 stars",
    };
  }

  if (feedback.trim().length > 0 && feedback.trim().length < 5) {
    return {
      isValid: false,
      errorMessage: "Feedback comment is too short",
    };
  }

  if (feedback.trim().length > 500) {
    return {
      isValid: false,
      errorMessage: "Feedback comment is too long (maximum 500 characters)",
    };
  }

  return { isValid: true };
};

export const formatFeedbackPayload = (
  rating: number,
  feedback: string,
  workoutId: string,
  coachId: string
) => {
  return {
    workoutId: workoutId.toString(),
    rating,
    comment: feedback,
    coachId,
    submittedAt: new Date().toISOString(),
  };
}; 