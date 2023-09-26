import React from "react";
import {
    render,
    fireEvent,
    waitFor,
    screen,
} from "@testing-library/react";
import Forms from "./index"; // Import your Forms component
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import "../../mockMatchMedia";

describe("Forms Component", () => {
    test("render the form on the screen", async () => {
        render(<Forms />);
        expect(screen.getByText("Forms")).toBeInTheDocument();
    });
    test("should display alert if error", async () => {
        // Render the UserModal component
        const { getByPlaceholderText, getByText, getByRole } = render(
            <Forms />
        );

        // Find input fields and Save button
        const addressInput = getByPlaceholderText("Enter Address");
        const saveButton = getByRole("button", { name: "Submit" });

        // Fill in the other fields except for First Name
        userEvent.type(addressInput, "test test");

        // Click the Save button to trigger validation
        fireEvent.click(saveButton);
        // Verify that the validation error message is displayed for First Name, Email, Phone Number
        expect(await screen.findByText("Username is required")).toBeVisible();
        expect(await screen.findByText("Email is required")).toBeVisible();
        expect(
            await screen.findByText("Phone number is required")
        ).toBeVisible();
    });
    test("submits the form with valid data", async () => {
        // Render the Forms component
        const { getByLabelText, getByText, getByTestId } = render(<Forms />);

        // Fill in the form fields with valid data
        userEvent.type(getByText("Username"), "john_doe");
        userEvent.type(getByText("Email"), "john.doe@example.com");
        userEvent.type(getByText("Phone Number"), "1234567890");
        userEvent.type(getByText("Address"), "123 Main St, City");
        fireEvent.click(getByText("Male")); // Assuming "Male" radio button is selected
        userEvent.type(getByText("Birth Date"), "1990-01-01");
        fireEvent.click(getByText("React JS")); // Select a skill
        userEvent.type(getByText("Password"), "Password@123");
        userEvent.type(getByText("Confirm Password"), "Password@123");
        fireEvent.click(
            getByText("I have read the Agreement of Terms & Policies")
        );
        const questionDropdown = await screen.getByTestId("select-multiple");

        fireEvent.click(questionDropdown);
        // basically, you should be able to find the elements of the
        // dropdown after you fire the click even on the select
        setTimeout(async () => {
            const questionOneEle = await screen.getByText("MEAN STACK");
            fireEvent.click(questionOneEle);
            expect(questionDropdown).toHaveValue("mean");
        }, 100);

        // you can consider using jest-dom to run an assertion here
        // at the top of your test file -> import '@testing-library/jest-dom'

        // Submit the form
        fireEvent.click(getByText("Submit"));

        // Wait for success message or navigate to a new page (if applicable)
        await waitFor(() => {
            // You can add assertions here for success messages or page navigation
        });
    });
});
