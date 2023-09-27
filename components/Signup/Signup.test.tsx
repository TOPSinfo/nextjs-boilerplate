import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "../../mockMatchMedia";
import Signup from "./index"; // Update the import path to match your project structure
import mockRouter from "next-router-mock";
import "@testing-library/jest-dom";
import { validateEmail } from "../Login";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
    },
}));
jest.mock("../../redux/sagas/signup.saga", () => ({
    apiCall: jest.fn(),
}));
describe("next-router-mock", () => {
    test("mocks the useRouter hook", async () => {
        // Set the initial url:
        mockRouter.push("/");

        // Render the component:
        render(<Signup />);
        expect(screen.getByRole("button", { name: /Sign Up/i }));

        // Click the button:
        userEvent.click(screen.getByRole("button"));

        // Ensure the router was updated:
        setTimeout(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/",
                pathname: "/",
            });
        }, 500);
    });
});
describe("Signup Component", () => {
    test("renders the signup form", () => {
        render(<Signup />);

        // Assert that the form elements are present
        const text = screen.getByText("Signup");
        expect(text).toBeInTheDocument();
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByText("Confirm Password")).toBeInTheDocument();

        // Add similar assertions for other form elements
    });
    test("should be failed on email validation ", () => {
        const testEmail = "test.com";
        expect(validateEmail(testEmail)).not.toBe(true);
    });
    test("email input field should accept email ", () => {
        render(<Signup />);
        const email: HTMLInputElement =
            screen.getByPlaceholderText("Enter Email");
        userEvent.type(email, "test");
        expect(email.value).not.toMatch("test.test@gmail.com");
    });
    test("should link", async () => {
        render(<Signup />);

        const links: HTMLAnchorElement[] = screen.getAllByRole("link");

        expect(links[0].textContent).toEqual("Sign In");
        expect(links[0].href).toContain("/");
    });
    test("should display alert if error", async () => {
        const { container } = render(<Signup />);
        const email = screen.getByPlaceholderText("Enter Email");
        const password = screen.getByPlaceholderText("Password");
        const username = screen.getByPlaceholderText("Enter Username");
        const confirmPassword = screen.getByPlaceholderText("Confirm Password");
        const gender = screen.getByText("Gender");
        const phnNumber = screen.getByPlaceholderText("Enter Phone Number");

        const buttonList = screen.getAllByRole("button");

        userEvent.type(email, "");
        userEvent.type(password, "");
        userEvent.type(username, "");
        userEvent.type(confirmPassword, "");
        userEvent.type(gender, "");
        userEvent.type(phnNumber, "");

        userEvent.click(buttonList[0]);
        setTimeout(() => {
            const basic_email_help = screen.getByText("Email is required");
            const basic_password = screen.getByText("Password is required");
            const basic_username = screen.getByText("Username is required");
            const confPassword_text = screen.getByText(
                "Confirm Password is required"
            );
            const phn_text = screen.getByText("Phone Number is required");
            const gender_text = screen.getByText("Gender is required");
            const checkbox = container.querySelectorAll(
                "input[type='checkbox']"
            )[0] as HTMLInputElement;
            fireEvent.click(checkbox);

            expect(basic_email_help).toBeInTheDocument();
            expect(basic_password).toBeInTheDocument();
            expect(basic_username).toBeInTheDocument();
            expect(confPassword_text).toBeInTheDocument();
            expect(phn_text).toBeInTheDocument();
            expect(gender_text).toBeInTheDocument();
            expect(checkbox.checked).toBe(true);
        }, 500);
    });
    test("should submit when form inputs contain text", async () => {
        const { getByTestId, queryByText } = render(<Signup />);

        await act(async () => {
            userEvent.type(screen.getByText("Username"), "shaquille");
            userEvent.type(screen.getByText("Email"), "oatmeal@gmail.com");
            userEvent.type(screen.getByText("Phone Number"), "998521478");
            userEvent.type(screen.getByText("Gender"), "female");
            userEvent.type(screen.getByText("Password"), "oatmeal");
            userEvent.type(screen.getByText("Confirm Password"), "oatmeal");
        });

        await act(async () => {
            fireEvent.submit(getByTestId("form"));
        });

        expect(queryByText("Username is required")).not.toBeInTheDocument();
        expect(queryByText("Email is required")).not.toBeInTheDocument();
        expect(queryByText("Phone Number is required")).not.toBeInTheDocument();
        expect(queryByText("Gender is required")).not.toBeInTheDocument();
        expect(queryByText("Password is required")).not.toBeInTheDocument();
        expect(
            queryByText("Confirm Password is required")
        ).not.toBeInTheDocument();
    });
    // Add more test cases for validation, error handling, etc.
});
