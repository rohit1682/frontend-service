import React from "react"
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/button/Button';

describe("Button Component", () => {
    it("renders with correct text", () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByText("Click Me")).toBeInTheDocument();
    })
    it("applies primary variant styles by default", () => {
        render(<Button>Primary</Button>);
        const button = screen.getByText("Primary");
        expect(button).toHaveClass("bg-primary");
        expect(button).toHaveClass("text-black");
        expect(button).toHaveClass("hover:bg-lime-400")
    });
    it("applies secondary variant styles when specified", () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByText("Secondary");
        expect(button).toHaveClass("bg-white");
        expect(button).toHaveClass("text-gray-800");
        expect(button).toHaveClass("hover:bg-gray-200")
        expect(button).toHaveClass("border-1")
    });
    it("calls onClick handler when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        const button = screen.getByText("Click Me");
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    

})