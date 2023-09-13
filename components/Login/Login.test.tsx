import Login, { validateEmail } from "./index";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import '../../mockMatchMedia';

const onSubmit = jest.fn();

describe("Test the Login Component", () => {
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

    test("should display alert if error", () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        const password = screen.getByPlaceholderText("Password");
        const buttonList = screen.getAllByRole("button");

        userEvent.type(email, "test");
        userEvent.type(password, "123456");
        userEvent.click(buttonList[0]);
        const error = screen.getByText("Please provide a valid email");
        expect(error).toBeInTheDocument();
    });

    test("should be able to submit the form", () => {
        const component = render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        const password = screen.getByPlaceholderText("Password");
        const btnList = screen.getAllByRole("button");

        userEvent.type(email, "test@gmail.com");
        userEvent.type(password, "123456");
        userEvent.click(btnList[0]);

        const user = screen.getByText((_, element:any) => element.textContent === 'some text');
        expect(user).toBeInTheDocument();
    });
});
