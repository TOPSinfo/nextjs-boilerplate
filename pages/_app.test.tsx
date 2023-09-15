import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import mockRouter from "next-router-mock"; // Import mockNextRouter
import App from "./_app";
import "@testing-library/jest-dom";

// Mock the ToastHelper component to prevent side effects during testing
// eslint-disable-next-line react/display-name
jest.mock("../helpers/toast.helper", () => () => (
    <div data-testid="toast-helper-mock" />
));

// Create a mock Redux store
const mockStore = configureStore([]);

// Define initial state for your Redux store if needed
const initialState = {};
const componentDiv = () => {
    return <></>;
};
describe("App Component", () => {
    beforeAll(() => {
        // Mock the Next.js router using mockNextRouter
        mockRouter.push("/");
    });
   
    it("should render without errors", () => {
        // Create a mock store with your initial state
        const store = mockStore(initialState);
        const mockPageProps = {
            // Add the properties expected by your App component
            // For example, you might need to add a user object or other data here.
        };
        // Render the App component with the mock store
        const { getByTestId } = render(
            <Provider store={store}>
                <App
                    pageProps={mockPageProps}
                    Component={componentDiv}
                    router={""}
                />
            </Provider>
        );

        // Assert that the App component renders without errors
        expect(getByTestId("toast-helper-mock")).toBeInTheDocument();
    });

    // You can add more test cases here to simulate different scenarios
});
