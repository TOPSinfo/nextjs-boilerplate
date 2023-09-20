import ForgotPassword, { validateEmail } from "./index";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "../../mockMatchMedia";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));
jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
    },
}));
jest.mock("../../redux/sagas/forgot.saga", () => ({
    apiCall: jest.fn(),
}));
const onSubmit = jest.fn();

describe("Test the ForgotPassword Component", () => {
    test("render the forgot form on the screen", async () => {
        render(<ForgotPassword />);
        const text = screen.getByText("Email");
        expect(text).toBeInTheDocument();
        expect(screen.getByText("Forgot Password?")).toBeInTheDocument();
    });

    test("should be failed on email validation ", () => {
        const testEmail = "test.com";
        expect(validateEmail(testEmail)).not.toBe(true);
    });

    test("email input field should accept email ", () => {
        render(<ForgotPassword />);
        const email: any = screen.getByPlaceholderText("Enter email");
        userEvent.type(email, "test");
        expect(email.value).not.toMatch("test.malvia@gmail.com");
    });

    test("should display alert if error", async () => {
        render(<ForgotPassword />);
        const email = screen.getByPlaceholderText("Enter email");
        const buttonList = screen.getAllByRole("button");

        userEvent.type(email, "test");
        userEvent.click(buttonList[0]);
        setTimeout(async () => {
            const basic_email_help = await screen.getByText(
                "Email is required"
            );
            expect(basic_email_help).toBeInTheDocument();
        }, 2000);
    });
    test("should link", async () => {
        render(<ForgotPassword />);

        const links: HTMLAnchorElement[] = screen.getAllByRole("link");

        expect(links[0].textContent).toEqual("Back to Sign In");
        expect(links[0].href).toContain("/");
    });
    test("should be able to submit the form", async () => {
        const { getByTestId, queryByText } = render(<ForgotPassword />);
        const email = screen.getByPlaceholderText("Enter email");
        const btnList = screen.getByRole("button", { name: /Send/i });
        // Simulate a user input
        await waitFor(async () => {
            userEvent.type(email, "test@gmail.com");
        });
        // Wait for success message or any other confirmation element
        await waitFor(async () => {
            userEvent.click(btnList);
            expect(queryByText("Email is required")).not.toBeInTheDocument();
        });
    });

    // Add test cases for api call when user submit form
});
