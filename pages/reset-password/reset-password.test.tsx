import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../mockMatchMedia";
import ResetPasswordPage from ".";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
describe("ResetPasswordPage Component", () => {
    test("renders ResetPasswordPage", () => {
        const { getByText } = render(<ResetPasswordPage />);

        // You can add more specific assertions here if needed
        expect(getByText("Reset Password")).toBeInTheDocument();
    });
});
