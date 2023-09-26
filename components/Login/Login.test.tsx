import Login, { validateEmail } from "./index";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import "../../mockMatchMedia";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
    },
}));

describe("Test the Login Component", () => {
    test("render the login form on the screen", async () => {
        render(<Login />);
        expect(screen.getByText("Login")).toBeInTheDocument();
        const text = screen.getByText("Password");
        expect(text).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
    });
    test("render the login form submit button on the screen", async () => {
        render(<Login />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });

    test("should be failed on email validation ", () => {
        const testEmail = "test.com";
        expect(validateEmail(testEmail)).not.toBe(true);
    });

    test("email input field should accept email ", () => {
        render(<Login />);
        const email: any = screen.getByPlaceholderText("Enter email");
        userEvent.type(email, "test");
        expect(email.value).not.toMatch("test.malvia@gmail.com");
    });

    test("passport input should have type password ", () => {
        render(<Login />);
        const password = screen.getByPlaceholderText("Password");
        expect(password).toHaveAttribute("type", "password");
    });

    test("should display alert if error", async () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        const password = screen.getByPlaceholderText("Password");
        const buttonList = screen.getAllByRole("button");

        userEvent.type(email, "test");
        userEvent.type(password, "123456");
        userEvent.click(buttonList[0]);
        setTimeout(async () => {
            const basic_email_help = await screen.getByText(
                "Email is required"
            );
            expect(basic_email_help).toBeInTheDocument();
        }, 1000);
    });

    test("should be able to submit the form", async () => {
        const component = render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        const password = screen.getByPlaceholderText("Password");
        const btnList = screen.getByRole("button", { name: /Sign In/i });
        // Simulate a user input
        userEvent.type(email, "test@gmail.com");
        userEvent.type(password, "123456");
        userEvent.click(btnList);
        // Wait for success message or any other confirmation element
        setTimeout(async () => {
            const toastText = await screen.findByText(/Login Successfully/i);
            expect(toastText).toBeInTheDocument();
        }, 2000);
    });
});
