import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../mockMatchMedia";
import SignupPage from ".";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
describe("SignupPage Component", () => {
    test("renders SignupPage", () => {
        const { getByText } = render(<SignupPage />);

        // You can add more specific assertions here if needed
        expect(getByText("Signup")).toBeInTheDocument();
        expect(getByText("Already have an account?")).toBeInTheDocument();
    });
});
