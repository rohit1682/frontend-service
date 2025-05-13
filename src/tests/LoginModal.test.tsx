import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginModal from "../components/popups/LoginModal";

describe("LoginModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render when show is false", () => {
    const { container } = render(
      <LoginModal show={false} onClose={mockOnClose} onLogin={mockOnLogin} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders modal when show is true", () => {
    render(
      <LoginModal show={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    expect(
      screen.getByText("Log in to book workout")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/You must be logged in/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  it("calls onClose when close (×) button is clicked", () => {
    render(
      <LoginModal show={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    const closeButton = screen.getByRole("button", { name: /×/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <LoginModal show={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onLogin when Log In button is clicked", () => {
    render(
      <LoginModal show={true} onClose={mockOnClose} onLogin={mockOnLogin} />
    );

    fireEvent.click(screen.getByText("Log In"));
    expect(mockOnLogin).toHaveBeenCalled();
  });
});
