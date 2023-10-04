import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UserModal from "./UserModal"; // Import your UserModal component
import "@testing-library/jest-dom";
import "../../mockMatchMedia";
import userEvent from "@testing-library/user-event";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
    },
}));

describe("UserModal Component", () => {
    // Your test cases will go here
    test("should display alert if error", async () => {
        // Render the UserModal component
        const { getByPlaceholderText, getByRole } = render(
            <UserModal
                setOpen={() => {}}
                isEdit={false}
                setEditUser={() => {}}
                open={true}
                id=""
                setIsEdit={() => {}}
            />
        );

        // Find input fields and Save button
        const ageInput = getByPlaceholderText("Enter Age");
        const saveButton = getByRole("button", { name: "Save" });

        // Fill in the other fields except for First Name
        userEvent.type(ageInput, "30");

        // Click the Save button to trigger validation
        fireEvent.click(saveButton);
        // Verify that the validation error message is displayed for First Name, Email, Phone Number
        expect(await screen.findByText("First Name is required")).toBeVisible();
        expect(await screen.findByText("Email is required")).toBeVisible();
        expect(
            await screen.findByText("Phone Number is required")
        ).toBeVisible();
    });
    test("adds a new user", async () => {
        // Render the UserModal component
        const { getByRole } = render(
            <UserModal
                setOpen={() => {}}
                isEdit={false}
                setEditUser={() => {}}
                open={true}
                id=""
                setIsEdit={() => {}}
            />
        );

        // Find input fields and buttons
        const firstNameInput = screen.getByText("FirstName");
        const emailInput = screen.getByText("Email");
        const ageInput = screen.getByText("Age");
        const phoneInput = screen.getByText("Phone Number");
        const saveButton = getByRole("button", { name: "Save" });

        // Fill in user information
        userEvent.type(firstNameInput, "John");
        userEvent.type(emailInput, "john@example.com");
        userEvent.type(ageInput, "30");
        userEvent.type(phoneInput, "123-456-7890");

        // Click the Save button
        fireEvent.click(saveButton);

        // You can add assertions here to verify the user was added successfully

        setTimeout(() => {
            const toastText = screen.findByText(/User created successfully/i);
            expect(toastText).toBeVisible();
        }, 1000);
        // Verify that the user is added to the store or database
        // You may need to access your Redux store or mock API calls here
        // For example, you can check if the user's data is in the Redux store
    });

    test("updates an existing user", async () => {
        // Define a mock user to edit
        const userToEdit = {
            id: "1",
            firstName: "Existing User",
            email: "existing@example.com",
            age: 25,
            phone: "987-654-3210",
        };

        // Render the UserModal component with the userToEdit and isEdit flag
        const { getByPlaceholderText, getByRole } = render(
            <UserModal
                open={true}
                setIsEdit={() => {}}
                userToEdit={userToEdit}
                isEdit={true}
                setOpen={() => {}}
                setEditUser={() => {}}
                id="1"
            />
        );

        // Find input fields and buttons
        const firstNameInput = getByPlaceholderText("Enter FirstName");
        const emailInput = getByPlaceholderText("Enter Email");
        const ageInput = getByPlaceholderText("Enter Age");
        const phoneInput = getByPlaceholderText("Enter Phone Number");
        const saveButton = getByRole("button", { name: "Save" });

        // Verify that the user's information is pre-populated in the input fields
        expect(firstNameInput).toHaveValue(userToEdit.firstName);
        expect(emailInput).toHaveValue(userToEdit.email);
        expect(ageInput).toHaveValue(userToEdit.age.toString());
        expect(phoneInput).toHaveValue(userToEdit.phone);

        // Modify user information
        userEvent.type(firstNameInput, "Updated User");
        userEvent.type(emailInput, "updated@example.com");

        // Click the Save button to update the user
        fireEvent.click(saveButton);

        // You can add assertions here to verify the user was updated successfully

        setTimeout(() => {
            const toastText = screen.findByText(/User updated successfully/i);
            expect(toastText).toBeInTheDocument();
        }, 1000);
    });
});
