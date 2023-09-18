import Login from "../components/Login";
import React from "react";
import Layout from "@/components/Layout";

const Home: React.FC = () => {
    {/* add the title a/c to your project name */}
    return (
        <Layout title="Login Page">
            <div>
                <Login />
            </div>
        </Layout>
    );
};

export default Home;
