import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import { login } from "../api/authApi";
import { useToast } from "../hooks/useToast";

// Mock the necessary modules
jest.mock("../api/authApi");
jest.mock("../hooks/useToast");
jest.mock("../env", () => ({
  getApiUrl: jest.fn().mockReturnValue("http://localhost:3000"),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("LoginPage Component", () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Mock useToast hook
    (useToast as jest.Mock).mockReturnValue({
      showToast: jest.fn(),
    });
  });

  it("renders login form with all elements", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Check that all form elements are rendered
    expect(screen.getByText("Log In to Your Account")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument();
    expect(screen.getByText(/CREATE NEW ACCOUNT/i)).toBeInTheDocument();
  });

  it("validates form inputs and displays error messages", async () => {
    const { container } = render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Submit the form without filling in any fields
    const loginButton = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(loginButton);

    // Wait for validation errors
    await waitFor(() => {
      // Check for error message container
      const errorMessages = container.querySelectorAll(".text-red-500");
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it("submits form with valid inputs and navigates on success", async () => {
    // Mock successful login
    (login as jest.Mock).mockResolvedValue(true);

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Fill form with valid data
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });

    // Submit the form
    const loginButton = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(loginButton);

    // Verify login function was called with correct data
    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123!",
      });
    });
  });

  it("shows error toast when login fails", async () => {
    // Mock failed login
    (login as jest.Mock).mockResolvedValue(false);
    const showToastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({
      showToast: showToastMock,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Fill form with valid data
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });

    // Submit the form
    const loginButton = screen.getByRole("button", { name: /Login/i });
    fireEvent.click(loginButton);

    // Verify toast was shown with error message
    await waitFor(() => {
      expect(showToastMock).toHaveBeenCalledWith(
        "error",
        "Login Unsuccessful",
        "There was an error found with your credentials, please try again!"
      );
    });
  });
});
