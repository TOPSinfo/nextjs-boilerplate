import ResetPassword from "@/components/ResetPassword";
import Head from "next/head";
import React from "react";

const ResetPasswordPage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Reset Password</title>
                {/* Add other meta tags here */}
            </Head>

            <ResetPassword />
        </div>
    );
};

export default ResetPasswordPage;
