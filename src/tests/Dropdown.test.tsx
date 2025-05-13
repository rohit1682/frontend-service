import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../components/inputField/Dropdowns";

describe("Dropdown Component", () => {
  const mockOptions = ["Option A", "Option B", "Option C"];
  const setup = (props = {}) => {
    const defaultProps = {
      id: "test-dropdown",
      legendText: "Choose an option",
      htmlFor: "dropdown-select",
      value: "Option A",
      onChange: jest.fn(),
      bottomText: "Select wisely",
      children: mockOptions,
      className: "",
      ...props,
    };
    render(<Dropdown {...defaultProps} />);
    return defaultProps;
  };

  it("renders with legend, value, and bottom text", () => {
    setup();
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Select wisely")).toBeInTheDocument();
  });

  it("opens and displays options on click", () => {
    setup();
    const toggle = screen.getByText("Option A");
    fireEvent.click(toggle);

    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Option C")).toBeInTheDocument();
  });

  it("calls onChange and closes dropdown on option click", () => {
    const onChange = jest.fn();
    render(
      <Dropdown
        id="test-dropdown"
        legendText="Choose"
        htmlFor="dropdown"
        value="Option A"
        onChange={onChange}
      >
        {["Option A", "Option B", "Option C"]}
      </Dropdown>
    );
  
    const toggle = screen.getByText("Option A");
    fireEvent.click(toggle);
  
    const optionB = screen.getByText("Option B");
    fireEvent.click(optionB);
  
    expect(onChange).toHaveBeenCalledWith("Option B");
    const listbox = screen.queryByRole("list");
    expect(listbox).not.toBeInTheDocument();
  });

  it("shows check icon for selected item", () => {
    setup({ value: "Option C" });
  
    fireEvent.click(screen.getByText("Option C")); // open dropdown
  
    const checkIcon = screen.getByTestId("check-icon");
    expect(checkIcon).toBeInTheDocument();
  });

  it("closes dropdown on outside click", () => {
    setup();
    const toggle = screen.getByText("Option A");
    fireEvent.click(toggle); 

    fireEvent.mouseDown(document);
    expect(screen.queryByText("Option B")).toBeNull();
  });
});
