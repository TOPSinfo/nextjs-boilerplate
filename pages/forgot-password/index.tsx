import ForgotPassword from "@/components/ForgotPassword/index";
import Head from "next/head";
import React from "react";

const ForgotPasswordPage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Forgot Password</title>
                {/* Add other meta tags here */}
            </Head>

            <ForgotPassword />
        </div>
    );
};

export default ForgotPasswordPage;
