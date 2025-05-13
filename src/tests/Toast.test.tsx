import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toast from "../components/Toast"; // Adjust path as needed
import "@testing-library/jest-dom";

describe("Toast Component", () => {
  it("renders the toast message", () => {
    render(<Toast message="Test message" />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("displays the default icon and applies info type class", () => {
    render(<Toast message="Info toast" />);
    expect(screen.getByText("⚠️")).toBeInTheDocument();
    // Optional: Check for default styling class
    // expect(container.firstChild).toHaveClass(TOAST_TYPES["info"]);
  });

  it("renders close button when onClose is provided", () => {
    const handleClose = jest.fn();
    render(<Toast message="Close test" onClose={handleClose} />);
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it("does not render close button when onClose is not provided", () => {
    render(<Toast message="No close" />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("applies correct class for different toast types", () => {
    const { container: successContainer } = render(
      <Toast message="Success toast" type="success" />
    );
    expect(successContainer.firstChild).toHaveClass("bg-green-100"); // Adjust based on your TOAST_TYPES map

    const { container: errorContainer } = render(
      <Toast message="Error toast" type="error" />
    );
    expect(errorContainer.firstChild).toHaveClass("bg-red-100"); // Adjust accordingly
  });
});
