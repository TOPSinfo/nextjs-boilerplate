import Signup from "@/components/Signup";
import Head from "next/head";
import React from "react";

const SignupPage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Signup</title>
                {/* Add other meta tags here */}
            </Head>

            <Signup />
        </div>
    );
};

export default SignupPage;
