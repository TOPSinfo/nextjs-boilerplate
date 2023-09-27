import ResetPassword from "./index";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
jest.mock("../../redux/sagas/reset.saga", () => ({
    apiCall: jest.fn(),
}));
const onSubmit = jest.fn();

describe("Test the Reset Password Component", () => {
    test("render the reset form on the screen", async () => {
        render(<ResetPassword />);
        expect(screen.getByText("Reset Password")).toBeInTheDocument();
        const text = screen.getByText("New Password");
        expect(text).toBeInTheDocument();
        expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    });

    test("should display alert if error", async () => {
        const { getByRole } = render(<ResetPassword />);
        const saveButton = getByRole("button", { name: "Submit" });

        fireEvent.click(saveButton);
        expect(await screen.findByText("Password is required")).toBeVisible();
        expect(
            await screen.findByText("Confirm Password is required")
        ).toBeVisible();
    });
    test("should be able to submit the form", async () => {
        const { queryByText } = render(<ResetPassword />);
        const password = screen.getByPlaceholderText("Enter new password");
        const cnfPassword = screen.getByPlaceholderText(
            "Enter confirm password"
        );

        // Simulate a user input
        await act(async () => {
            userEvent.type(password, "Test@123");
            userEvent.type(cnfPassword, "Test@123");
        });
        // Wait for success message or any other confirmation element
        await act(async () => {
            userEvent.type(screen.getByText("Submit"), "Enter");
            expect(queryByText("Password is required")).not.toBeInTheDocument();
            expect(
                queryByText("Confirm Password is required")
            ).not.toBeInTheDocument();
        });
    });
});
