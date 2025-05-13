import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CoachesPage from "../pages/coaches/CoachesPage";
import { coachesData } from "../constants/coaches";

// Mock the constants/coaches module
jest.mock("../constants/coaches", () => ({
  coachesData: [
    {
      id: "1",
      name: "John Doe",
      rating: "4.8",
      summary: "Fitness expert with 10 years of experience",
      imageUrl: "/images/coach1.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      rating: "4.9",
      summary: "Yoga instructor specializing in flexibility",
      imageUrl: "/images/coach2.jpg",
    },
  ],
}));

// Mock the CoachCard component to ensure it renders with data-testid
jest.mock("../components/coachCard/CoachCard", () => {
  return function MockCoachCard({ coach }: { coach: any }) {
    return (
      <article data-testid="coach-card">
        <h2>{coach.name}</h2>
        <p>{coach.summary}</p>
        <div>{coach.rating}</div>
      </article>
    );
  };
});

describe("CoachesPage Component", () => {
  it("renders coaches grid with coach cards", async () => {
    render(
      <BrowserRouter>
        <CoachesPage />
      </BrowserRouter>
    );

    // Wait for coaches to be rendered
    await waitFor(() => {
      // Check that we have the coach cards
      const coachCards = screen.getAllByTestId("coach-card");
      expect(coachCards.length).toBe(2);

      // Test for each coach name
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();

      // Test for the summary text
      expect(
        screen.getByText("Fitness expert with 10 years of experience")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Yoga instructor specializing in flexibility")
      ).toBeInTheDocument();

      // Test for the ratings
      expect(screen.getByText("4.8")).toBeInTheDocument();
      expect(screen.getByText("4.9")).toBeInTheDocument();
    });
  });

  it("renders a grid layout", async () => {
    const { container } = render(
      <BrowserRouter>
        <CoachesPage />
      </BrowserRouter>
    );

    // Look for the grid div
    const gridDiv = container.querySelector(".grid");
    expect(gridDiv).toBeInTheDocument();

    // Check for grid classes
    expect(gridDiv).toHaveClass("grid-cols-1");
    expect(gridDiv).toHaveClass("sm:grid-cols-2");
    expect(gridDiv).toHaveClass("md:grid-cols-3");
    expect(gridDiv).toHaveClass("lg:grid-cols-4");
    expect(gridDiv).toHaveClass("gap-6");
  });
});
