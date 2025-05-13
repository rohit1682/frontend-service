import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ClientFeedbackModal from "../../components/modals/ClientFeedbackModal";
import * as validationModule from "../../utils/feedbackValidations/validationClientFeedback";
import { useToast } from "../../hooks/useToast";
import * as giveFeedbackModule from "../../api/feedbacksApi";

// Mock dependencies
jest.mock("../../hooks/useToast", () => ({
  useToast: jest.fn(),
}));

// Mock the validation module
jest.mock("../../utils/feedbackValidations/validationClientFeedback", () => ({
  validateFeedback: jest.fn(),
  formatFeedbackPayload: jest.fn(),
}));

// Mock giveFeedback API
jest.mock("../../api/feedbacksApi", () => ({
  coachFeedbackFromClient: jest.fn().mockResolvedValue(true),
}));

describe("ClientFeedbackModal", () => {
  const mockTrainer = {
    name: "Jane Smith",
    imageUrl: "trainer-image.jpg",
    summary: "Certified personal trainer",
    rating: "4.8",
  };

  const mockWorkoutType = {
    type: "Strength Training",
    time: "45 minutes",
    date: "August 15th, 10:00 AM",
  };

  const mockShowToast = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({
      showToast: mockShowToast,
    });
  });

  test("renders correctly when open", () => {
    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
        workoutId={456}
      />
    );

    // Check header content
    expect(screen.getByText("Workout feedback")).toBeInTheDocument();
    expect(
      screen.getByText("Please rate your experience below")
    ).toBeInTheDocument();

    // Check trainer info
    expect(screen.getByText(mockTrainer.name)).toBeInTheDocument();
    expect(screen.getByText(mockTrainer.summary)).toBeInTheDocument();
    expect(screen.getByText(mockTrainer.rating)).toBeInTheDocument();
    expect(
      screen.getByAltText(`Trainer ${mockTrainer.name}`)
    ).toBeInTheDocument();

    // Check workout info
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(screen.getByText(mockWorkoutType.type)).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText(mockWorkoutType.time)).toBeInTheDocument();
    expect(screen.getByText("Date:")).toBeInTheDocument();
    expect(screen.getByText(mockWorkoutType.date)).toBeInTheDocument();

    // Check star rating and form elements
    expect(screen.getByText("Rate workout")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Submit Feedback")).toBeInTheDocument();
  });

  test("does not render when not open", () => {
    render(
      <ClientFeedbackModal
        isOpen={false}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
      />
    );

    // Modal should not be visible
    expect(screen.queryByText("Workout feedback")).not.toBeInTheDocument();
  });

  test("handles close button click", () => {
    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
      />
    );

    // Find and click the close button (X icon)
    const closeButton = screen.getByLabelText("Close dialog");
    fireEvent.click(closeButton);

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("updates rating when stars are clicked", () => {
    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
      />
    );

    // Initially show "Rate workout"
    expect(screen.getByText("Rate workout")).toBeInTheDocument();

    // Click on the 4-star rating (full star)
    const starFour = screen.getByLabelText("Rate 4 stars");
    fireEvent.click(starFour);

    // Rating text should update
    expect(screen.getByText("4/5 stars")).toBeInTheDocument();

    // Click on the 2.5-star rating (half star)
    const starTwoHalf = screen.getByLabelText("Rate 2.5 stars");
    fireEvent.click(starTwoHalf);

    // Rating text should update again
    expect(screen.getByText("2.5/5 stars")).toBeInTheDocument();
  });

  test("handles feedback submission with valid input", async () => {
    // Mock validation success
    (validationModule.validateFeedback as jest.Mock).mockReturnValue({
      isValid: true,
    });
    (validationModule.formatFeedbackPayload as jest.Mock).mockReturnValue({
      workoutId: 456,
      rating: 4.5,
      feedback: "Excellent session!",
      submittedAt: "2023-08-15T10:00:00.000Z",
    });

    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
        workoutId={456}
      />
    );

    // Set rating by clicking on 4.5 stars
    const starFourHalf = screen.getByLabelText("Rate 4.5 stars");
    fireEvent.click(starFourHalf);

    // Type feedback
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Excellent session!" } });

    // Submit feedback
    const submitButton = screen.getByText("Submit Feedback");

    await act(async () => {
      fireEvent.click(submitButton);
      // Give time for async operations to complete
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check if validation was called with correct parameters
    expect(validationModule.validateFeedback).toHaveBeenCalledWith(
      4.5,
      "Excellent session!"
    );

    // Check if success toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "success",
      "Feedback Submitted",
      "Your feedback has been sent successfully!"
    );

    // We're omitting the direct test for formatFeedbackPayload
    // since it's an internal implementation detail that could change
  });

  test("shows error toast for invalid feedback (no rating)", () => {
    // Mock validation failure for missing rating
    const errorMessage = "Please select a rating before submitting feedback";
    (validationModule.validateFeedback as jest.Mock).mockReturnValue({
      isValid: false,
      errorMessage,
    });

    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
      />
    );

    // Type feedback but don't set rating
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Great workout!" } });

    // Submit feedback
    const submitButton = screen.getByText("Submit Feedback");
    fireEvent.click(submitButton);

    // Check if validation was called
    expect(validationModule.validateFeedback).toHaveBeenCalledWith(
      0,
      "Great workout!"
    );

    // Check if error toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "error",
      "Validation Error",
      errorMessage
    );

    // Payload format should not be called for invalid input
    expect(validationModule.formatFeedbackPayload).not.toHaveBeenCalled();
  });

  test("shows error toast for invalid feedback (feedback too short)", () => {
    // Mock validation failure for short feedback
    const errorMessage = "Feedback comment is too short";
    (validationModule.validateFeedback as jest.Mock).mockReturnValue({
      isValid: false,
      errorMessage,
    });

    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
      />
    );

    // Set rating
    const starFour = screen.getByLabelText("Rate 4 stars");
    fireEvent.click(starFour);

    // Type very short feedback
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "OK" } });

    // Submit feedback
    const submitButton = screen.getByText("Submit Feedback");
    fireEvent.click(submitButton);

    // Check if validation was called
    expect(validationModule.validateFeedback).toHaveBeenCalledWith(4, "OK");

    // Check if error toast was shown
    expect(mockShowToast).toHaveBeenCalledWith(
      "error",
      "Validation Error",
      errorMessage
    );
  });

  test("clears form after successful submission", async () => {
    // Mock validation success
    (validationModule.validateFeedback as jest.Mock).mockReturnValue({
      isValid: true,
    });
    (validationModule.formatFeedbackPayload as jest.Mock).mockReturnValue({
      workoutId: 456,
      rating: 4,
      feedback: "Great workout!",
      submittedAt: "2023-08-15T10:00:00.000Z",
    });

    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
        workoutId={456}
      />
    );

    // Set rating
    const starFour = screen.getByLabelText("Rate 4 stars");
    fireEvent.click(starFour);

    // Save rating text element for later checks
    const ratingTextBefore = screen.queryByText("4/5 stars");
    expect(ratingTextBefore).toBeInTheDocument();

    // Type feedback
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Great workout!" } });

    // Verify form has values
    expect(textarea).toHaveValue("Great workout!");

    // Submit feedback
    const submitButton = screen.getByText("Submit Feedback");

    await act(async () => {
      fireEvent.click(submitButton);
      // Give time for the component to update
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Wait for async operations to complete
    await waitFor(
      () => {
        // Check if textarea was cleared
        expect(textarea).toHaveValue("");

        // Check if rating was reset (using queryByText to avoid errors if not found)
        const ratingTextAfter = screen.queryByText("4/5 stars");
        expect(ratingTextAfter).not.toBeInTheDocument();

        // Rating should be back to "Rate workout"
        const rateWorkoutText = screen.queryByText("Rate workout");
        expect(rateWorkoutText).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  // Keep this test if your component has the shake animation feature
  test("stars shake when validation fails due to missing rating", async () => {
    // Mock validation failure for missing rating
    (validationModule.validateFeedback as jest.Mock).mockReturnValue({
      isValid: false,
      errorMessage: "Please select a rating",
    });

    render(
      <ClientFeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        trainer={mockTrainer}
        workoutType={mockWorkoutType}
      />
    );

    // Type feedback but skip rating
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Great workout!" } });

    // Submit feedback
    const submitButton = screen.getByText("Submit Feedback");
    fireEvent.click(submitButton);

    // Check if the stars container has the shake animation class
    const starsContainer = screen.getByText("Rate workout").closest("div");
    expect(starsContainer).toHaveClass("animate-shake");

    // After animation, the class should be removed
    await waitFor(
      () => {
        expect(starsContainer).not.toHaveClass("animate-shake");
      },
      { timeout: 1000 }
    );
  });
});
