import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Text from "../components/inputField/Text";

describe("Text Component", () => {
  const defaultProps = {
    id: "test-input",
    value: "",
    onChange: jest.fn(),
    legendText: "Username",
    placeholder: "Enter your username",
    bottomText: "This is optional"
  };

  it("renders input with legend and placeholder", () => {
    render(<Text {...defaultProps} />);

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    expect(screen.getByText("This is optional")).toBeInTheDocument();
  });

  it("renders email input type when legendText is Email", () => {
    render(<Text {...defaultProps} legendText="Email" />);
    expect(screen.getByPlaceholderText("Enter your username")).toHaveAttribute("type", "email");
  });

  it("renders text input type when legendText is not Email", () => {
    render(<Text {...defaultProps} legendText="Name" />);
    expect(screen.getByPlaceholderText("Enter your username")).toHaveAttribute("type", "text");
  });

  it("calls onChange when typing", () => {
    render(<Text {...defaultProps} />);
    const input = screen.getByPlaceholderText("Enter your username");

    fireEvent.change(input, { target: { value: "Vansh" } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it("shows error message and styles when hasError is true", () => {
    const errorProps = {
      ...defaultProps,
      hasError: true,
      errorMessage: "Username is required",
    };

    render(<Text {...errorProps} />);

    expect(screen.getByText("Username is required")).toBeInTheDocument();

    const fieldset = screen.getByRole("textbox").closest("fieldset");
    expect(fieldset).toHaveClass("border-[#FF4242]");
  });
});
