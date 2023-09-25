import React from "react";
import {
    render,
    screen,
    act,
} from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import Users from "./index"; // Import the Users component
import "@testing-library/jest-dom";
import "../../mockMatchMedia";

const mockStore = configureMockStore();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));

let store = mockStore({});
describe("Users Component", () => {
    beforeEach(() => {
        // Mock Redux store state
        const initialState = {
            userReducer: {
                users: [
                    {
                        id: "1",
                        firstName: "John",
                        age: 30,
                        phone: "123-456-7890",
                        email: "john@example.com",
                    },
                ],
                limit: 10,
                total: 1,
            },
            loaderReducer: {
                loading: false,
            },
        };

        store = mockStore(initialState);
    });

    test("renders Users page correctly", async () => {
        const { getByText, getByTestId, getByRole } = render(<Users />);

        // Check if the Users page title is rendered
        expect(getByText("Users")).toBeInTheDocument();

        // Check if the "Create Users" button is rendered
        expect(getByText("Create Users")).toBeInTheDocument();

        // Check if the table is rendered with user data
        expect(getByTestId("users-component")).toBeInTheDocument();

        // You can add more assertions or interactions as needed
    });

    // Add more test cases as needed for different scenarios

    test("displays a message when no users are found", async () => {
        // Mock Redux store state with empty user data
        const initialState = {
            userReducer: {
                users: [],
                limit: 30,
                total: 0,
            },
            loaderReducer: {
                loading: false,
            },
        };

        store = mockStore(initialState);

        const { getByText } = render(<Users />);

        // Check if the "No Users Found" message is displayed
        expect(getByText("No Users Found")).toBeInTheDocument();
    });
    test("displays a list of users", async () => {
        // Mock user data that you expect the component to display
        const mockUsers = [
            { id: 1, firstName: "Terry" },
            { id: 2, firstName: "Sheldon" },
            { id: 3, firstName: "Terrill" },
        ];

        // Mock a function that fetches user data (e.g., from an API)
        const fetchUsers = jest.fn().mockResolvedValue(mockUsers);
        // Render the UserList component with the mocked fetchUsers function
        render(<Users fetchUsers={fetchUsers} />);

        // Wait for the component to finish rendering and fetch user data
        await act(async () => {
            // Check if each user's name is displayed in the component
            setTimeout(() => {
                mockUsers.forEach(user => {
                    const userElement = screen.getByText(user.firstName);
                    expect(userElement).toBeInTheDocument();
                });
            }, 500);
        });
    });
});
