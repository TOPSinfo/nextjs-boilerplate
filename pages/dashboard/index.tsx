import Dashboard from "@/components/Dashboard";
import Layout from "@/components/Layout";
import React from "react";
import withAuth from "@/helpers/withAuth";

const DashboardPage: React.FC = () => {
    return (
        <Layout title="Dashboard">
            <Dashboard />
        </Layout>
    );
};

export default withAuth(DashboardPage);
