import React from "react";
import { render, screen } from "@testing-library/react";
import ReportsPage from "../pages/reports/ReportsPage";

describe("ReportsPage Component", () => {
  it("renders the reports page", () => {
    render(<ReportsPage />);
    expect(screen.getByText("ReportsPage")).toBeInTheDocument();
  });
});
