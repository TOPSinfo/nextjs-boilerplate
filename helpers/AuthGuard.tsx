import React, { useEffect } from "react";
import { useRouter } from "next/router";

interface AuthGuardProps {
    children: React.ReactNode; // Use React.ReactNode for children
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const router = useRouter();

    // Check if the user is logged in by accessing local storage or your authentication state.
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        // If the user is not logged in and is on the login page, redirect to the dashboard.
        if (
            isLoggedIn &&
            (router.pathname === "/" ||
                router.pathname === "/signup" ||
                router.pathname === "/forgot-password" ||
                router.pathname === "/reset-password")
        ) {
            router.push("/dashboard");
        }
    }, [isLoggedIn, router]);

    // Render the child components if the user is logged in or if it's not the login page.
    return <>{children}</>;
};

export default AuthGuard;
