import React from "react";
import { render, screen } from "@testing-library/react";
import WorkoutsPage from "../pages/workouts/WorkoutsPage";

// Define workout interface for the test
interface TestWorkout {
  id: string;
  title: string;
  coach: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  intensity: string;
}

// Mock the workouts data
jest.mock("../constants/workouts", () => [
  {
    id: "1",
    title: "Morning Yoga",
    coach: "Jane Smith",
    date: "2023-06-15",
    time: "07:00 AM",
    duration: "45 min",
    type: "Yoga",
    intensity: "Medium",
  },
  {
    id: "2",
    title: "Strength Training",
    coach: "John Doe",
    date: "2023-06-16",
    time: "05:00 PM",
    duration: "60 min",
    type: "Weights",
    intensity: "High",
  },
]);

// Mock the TitleBar component
jest.mock("../layouts/MainLayout/components/TitleBar", () => {
  return function MockTitleBar({ title }: { title: string }) {
    return <h1>{title}</h1>;
  };
});

// Mock the WorkoutCard component
jest.mock("../components/workouts/WorkoutCard", () => {
  return function MockWorkoutCard({ workout }: { workout: TestWorkout }) {
    return (
      <div data-testid="workout-card">
        <h2>{workout.title}</h2>
        <p>Coach: {workout.coach}</p>
        <p>Date: {workout.date}</p>
        <p>Time: {workout.time}</p>
        <p>Duration: {workout.duration}</p>
        <p>Type: {workout.type}</p>
        <p>Intensity: {workout.intensity}</p>
      </div>
    );
  };
});

describe("WorkoutsPage Component", () => {
  it("renders the title correctly", () => {
    render(<WorkoutsPage />);
    expect(screen.getByText("My Workouts")).toBeInTheDocument();
  });

  it("renders all workout cards", () => {
    render(<WorkoutsPage />);

    // Check for the workout cards
    const workoutCards = screen.getAllByTestId("workout-card");
    expect(workoutCards.length).toBe(2);

    // Check that workout details are rendered
    expect(screen.getByText("Morning Yoga")).toBeInTheDocument();
    expect(screen.getByText("Strength Training")).toBeInTheDocument();
    expect(screen.getByText("Coach: Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Coach: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Date: 2023-06-15")).toBeInTheDocument();
    expect(screen.getByText("Date: 2023-06-16")).toBeInTheDocument();
  });

  it("renders the grid layout for workout cards", () => {
    const { container } = render(<WorkoutsPage />);

    // Look for a div with the expected grid classes
    const gridContainer = container.querySelector(".container.mx-auto.grid");
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass("grid-cols-1");
    expect(gridContainer).toHaveClass("md:grid-cols-2");
  });
});
