import ResetPassword from "./index";
import {
    act,
    fireEvent,
    queryByText,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "../../mockMatchMedia";
import { apiCall } from "@/redux/sagas/reset.saga";
import { useDispatch, useSelector } from "react-redux";
import { resetRequest } from "@/redux/actions/reset.action";
const mockDispatch = jest.fn();

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
    test("render the forgot form on the screen", async () => {
        render(<ResetPassword />);
        expect(screen.getByText("Reset Password")).toBeInTheDocument();
        const text = screen.getByText("New Password");
        expect(text).toBeInTheDocument();
        expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    });

    test("should display alert if error", async () => {
        render(<ResetPassword />);
        const newpassword = screen.getByPlaceholderText("Enter new password");
        const cnfpassword = screen.getByPlaceholderText(
            "Enter confirm password"
        );
        const buttonList = screen.getAllByRole("button");

        userEvent.type(newpassword, "");
        userEvent.type(cnfpassword, "");
        userEvent.click(buttonList[0]);
        setTimeout(async () => {
            const password_err = await screen.getByText("Password is required");
            expect(password_err).toBeInTheDocument();
            const cnf_password_err = await screen.getByText(
                "Confirm Password is required"
            );
            expect(cnf_password_err).toBeInTheDocument();
        }, 2000);
    });
    test("should be able to submit the form", async () => {
        const { getByTestId, queryByText } = render(<ResetPassword />);
        const password = screen.getByPlaceholderText("Enter new password");
        const cnfPassword = screen.getByPlaceholderText(
            "Enter confirm password"
        );

        const btnList = screen.getByRole("button");
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

    // Add test cases for api call when user submit form
    //     test("dispatches RESET_REQUEST action on form submission", async () => {
    //     // Mock the useDispatch function to capture dispatched actions
    //     const mockDispatch = jest.fn();
    //     (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    //     // Mock useSelector to return the initial state or necessary data
    //     (useSelector as jest.Mock).mockReturnValue({ loading: false });

    //     render(<ResetPassword />);

    //     // Simulate user input
    //     userEvent.type(screen.getByText("New Password"), "newpassword");
    //     userEvent.type(screen.getByText("Confirm Password"), "newpassword");

    //     // Simulate form submission
    //     fireEvent.click(screen.getByText("Submit"));

    //     // Use waitFor to wait for the RESET_REQUEST action to be dispatched
    //     await waitFor(() => {
    //       expect(resetRequest).toHaveBeenCalledWith("newpassword", "newpassword");
    //     });

    //     // Add assertions for handling the API response in your saga
    //     // For example:
    //     // expect(mockDispatch).toHaveBeenCalledWith(resetSuccess(/* response data */));
    //   });
});
