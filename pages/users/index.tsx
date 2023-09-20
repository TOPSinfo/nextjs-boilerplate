import Dashboard from "@/components/Dashboard";
import Layout from "@/components/Layout";
import React from "react";
import withAuth from "@/helpers/withAuth";

const UsersPage: React.FC = () => {
    return (
        <Layout title="Dashboard">
            <h1>Hello World</h1>
        </Layout>
    );
};

export default withAuth(UsersPage);
