import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "@/pages/dashboard"; // Adjust the import path as needed
import "@testing-library/jest-dom";
import "../../mockMatchMedia";

jest.mock("react-chartjs-2", () => ({
    Line: () => null,
}));
jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
describe("DashboardPage Component", () => {
    test("renders without errors", async () => {
        render(<DashboardPage />);
        await waitFor(async () => {
            const dashboardTitle = screen.getByText("Dashboard");
            expect(dashboardTitle).toBeInTheDocument();
        });
    });
});
