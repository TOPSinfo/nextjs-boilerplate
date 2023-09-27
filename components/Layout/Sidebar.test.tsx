import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar"; // Adjust the import path as needed
import "@testing-library/jest-dom";

// Mock useRouter and window.location.pathname
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));
Object.defineProperty(window, "location", {
    value: {
        pathname: "/dashboard",
    },
    writable: true,
});

// Write your test suite
describe("Sidebar Component", () => {
    test("renders without errors", () => {
        render(<Sidebar />);
        const sidebarElement = screen.getByTestId("sidebar");
        expect(sidebarElement).toBeInTheDocument();
    });

    test("navigates to the selected menu item", () => {
        render(<Sidebar />);
        const sidebarElement = screen.getByTitle("Users");

        fireEvent.click(sidebarElement);
        expect(sidebarElement).toHaveClass("ant-menu-item-selected");
        // You can add more assertions here based on your specific requirements
    });
});
