import { render } from "@testing-library/react";
import ForgotPasswordPage from "@/pages/forgot-password"; // Adjust the import path as needed
import "@testing-library/jest-dom";
import "../../mockMatchMedia";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    useRouter: jest.fn(),
}));
describe("ForgotPasswordPage Component", () => {
    test("renders ForgotPasswordPage without errors", () => {
        const { getByText } = render(<ForgotPasswordPage />);

        // You can add more specific assertions here if needed
        expect(getByText("Forgot Password?")).toBeInTheDocument();
    });
});
