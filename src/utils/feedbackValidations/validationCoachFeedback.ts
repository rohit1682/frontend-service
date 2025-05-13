interface FeedbackValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateFeedback = (
  feedback: string
): FeedbackValidationResult => {
  // Check if feedback is provided
  if (feedback.trim().length === 0) {
    return {
      isValid: false,
      errorMessage: "Please provide feedback before submitting",
    };
  }

  if (feedback.trim().length < 5) {
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

  // If all validations pass
  return { isValid: true };
};

export const formatFeedbackPayload = (
  feedback: string,
  workoutId: string,
  clientId: string
) => {
  return {
    workoutId: workoutId.toString(),
    comment: feedback,
    clientId,
    submittedAt: new Date().toISOString(),
  };
};
