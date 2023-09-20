import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AppHeader from "./AppHeader"; // Adjust the import path as needed
import { logout } from "@/redux/actions/login.action";
import "@testing-library/jest-dom";
import * as redux from "react-redux";
import { act } from "react-dom/test-utils";

// Mock useRouter and useDispatch
jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
}));

// Create a mock Redux store
const mockStore = configureStore([]);
const store = mockStore({});

// Write your test suite
describe("AppHeader Component", () => {
    function tree() {
        return render(
            <Provider store={store}>
                <AppHeader />
            </Provider>
        );
    }
    test("renders without errors", () => {
        render(<AppHeader />);
        const headerElement = screen.getByTestId("app-header");
        expect(headerElement).toBeInTheDocument();
    });

    test("logs out when the 'Logout' link is clicked", async () => {
        const mockDispatch = jest.fn();
        const useDispatchSpy = jest.spyOn(redux, "useDispatch");
        useDispatchSpy.mockReturnValue(mockDispatch);

        const store = mockStore({});
        const { getByTestId } = render(<AppHeader />);
        const profileDropdown = screen.getByTestId("profile-dropdown");
        fireEvent.click(profileDropdown);
        await act(async () => {
            const logoutLink = screen.getByText("Logout");
            console.log(screen.getByText("Logout"));
            fireEvent.click(logoutLink);

            console.log(mockDispatch.mock.calls);
            const expected = {
                type: "LOGOUT",
            };
            expect(logout()).toEqual(expected);
        });
    });
    test("redirect to profile page when the Profile is clicked", async () => {
        const { getByTestId } = render(<AppHeader />);
        const profileDropdown = screen.getByTestId("profile-dropdown");
        fireEvent.click(profileDropdown);
        await act(async () => {
            const profile = screen.getByRole("link", { name: "Profile" });
            expect(profile).toHaveAttribute("href", "/dashboard");
        });
    });
});
