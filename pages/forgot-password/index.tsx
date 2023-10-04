import React from "react";
import ForgotPassword from "@/components/ForgotPassword/index";
import Head from "next/head";

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
