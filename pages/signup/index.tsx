import Layout from "@/components/Layout";
import Signup from "@/components/Signup";
import React from "react";

const SignupPage: React.FC = () => {
    return (
        <Layout title="Signup Page">
            <div>
                <Signup />
            </div>
        </Layout>
    );
};

export default SignupPage;
