import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import ViewUsers from "./ViewUsers"; // Import your ViewUsers component
import "@testing-library/jest-dom";
import "../../mockMatchMedia";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

// Mock Redux store and actions if needed
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => jest.fn(),
    useRouter: jest.fn(),
    useSelector: () => ({
        userDetail: {
            user: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                age: 30,
                phone: "123-456-7890",
            },
        },
    }),
}));

describe("ViewUsers Component", () => {
    it("displays user details", async () => {
        // Render the ViewUsers component
        const { getByText } = render(<ViewUsers />);

        // Wait for the user details to be loaded and displayed
        await act(async () => {
            const nameElement = getByText("Name");
            const emailElement = getByText("Email");
            const phoneElement = getByText("Phone Number");
            const ageElement = getByText("Age");

            expect(nameElement).toBeInTheDocument();
            expect(emailElement).toBeInTheDocument();
            expect(phoneElement).toBeInTheDocument();
            expect(ageElement).toBeInTheDocument();

            // Verify user details are displayed
            setTimeout(() => {
                expect(getByText("John")).toBeInTheDocument();
                expect(getByText("john.doe@example.com")).toBeInTheDocument();
                expect(getByText("123-456-7890")).toBeInTheDocument();
                expect(getByText("30")).toBeInTheDocument();
            }, 500);
        });
    });
});
