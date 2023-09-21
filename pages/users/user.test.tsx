import React from "react";
import { render, screen } from "@testing-library/react";
import UsersPage from "@/pages/users"; // Adjust the import path as needed
import "@testing-library/jest-dom";
import "../../mockMatchMedia";
import * as redux from "react-redux";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
describe("UsersPage Component", () => {
    it("renders the UsersPage component with the Users component", () => {
        const mockDispatch = jest.fn();
        const useDispatchSpy = jest.spyOn(redux, "useDispatch");
        useDispatchSpy.mockReturnValue(mockDispatch);
        render(<UsersPage />);

        // Check if the UsersPage component title is present (assuming it's in your Layout component)
        const titleElement = screen.getByText("Users");
        expect(titleElement).toBeInTheDocument();

        // Check if the Users component is present within the UsersPage
        const usersComponent = screen.getByTestId("users-component"); // Assuming you have a data-testid for the Users component
        expect(usersComponent).toBeInTheDocument();
    });

    // Add more test cases as needed
});
