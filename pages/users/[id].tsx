import Layout from "@/components/Layout";
import React from "react";
import ViewUsers from "@/components/Users/ViewUsers";

const ViewUsersPage: React.FC = () => {
    return (
        <Layout title="User Details">
            <ViewUsers />
        </Layout>
    );
};

export default ViewUsersPage;
