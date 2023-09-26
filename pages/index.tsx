import Login from "../components/Login";
import React from "react";
import Head from "next/head";
import withAuth from "@/helpers/withAuth";

const Home: React.FC = () => {
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

export default  withAuth(Home);
