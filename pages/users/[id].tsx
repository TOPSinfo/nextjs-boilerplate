import Layout from "@/components/Layout";
import React from "react";
import withAuth from "@/helpers/withAuth";
import ViewUsers from "@/components/Users/ViewUsers";

const ViewUsersPage: React.FC = () => {
    return (
        <Layout title="User Details">
            <ViewUsers />
        </Layout>
    );
};

export default withAuth(ViewUsersPage);
