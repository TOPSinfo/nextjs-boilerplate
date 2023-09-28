import Login from "../components/Login";
import React from "react";
import Head from "next/head";

const LoginPage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Login</title>
                {/* Add other meta tags here */}
            </Head>

            <Login />
        </div>
    );
};

export default (LoginPage);
