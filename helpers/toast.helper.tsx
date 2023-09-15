"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ToastHelperProps {
    children: React.ReactNode;
}

export default function ToastHelper({ children }: ToastHelperProps) {
    return (
        <div>
            {children}
            <ToastContainer />
        </div>
    );
}
