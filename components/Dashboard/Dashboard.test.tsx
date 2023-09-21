import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "@/components/Dashboard"; // Adjust the import path as needed
import { useSelector } from "react-redux";
import "../../mockMatchMedia";
import "@testing-library/jest-dom";

// Mock Redux store state
jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

jest.mock("react-chartjs-2", () => ({
    Line: () => null,
}));
describe("Dashboard Component", () => {
    test("renders the Dashboard component with data", () => {
        // Mock useSelector to return data
        (useSelector as jest.Mock).mockReturnValue({
            resetReducer: {
                loading: false,
            },
        });

        render(<Dashboard />);

        // Check if the Dashboard component title is present
        const dashboardTitle = screen.getByText("Dashboard");
        expect(dashboardTitle).toBeInTheDocument();

        // Check if some specific content or elements are present
        const revenueTitle = screen.getByText("Revenue");
        expect(revenueTitle).toBeInTheDocument();

        // Check if some specific content or elements are present
        const salesTitle = screen.getByText("Sales");
        expect(salesTitle).toBeInTheDocument();

        const costTitle = screen.getByText("Costs");
        expect(costTitle).toBeInTheDocument();

        // Add more assertions based on your component's content and structure
    });

    test("renders data after loading", () => {
        // Mock useSelector to indicate data loading is completed

        render(<Dashboard />);

        // Check if the data is loaded after loading
        const dataComponent = screen.getByText("Unique Visitors");
        expect(dataComponent).toBeInTheDocument();
    });
});
