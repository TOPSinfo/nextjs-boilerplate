import Layout from "@/components/Layout";
import React from "react";
import Users from "@/components/Users";

const UsersPage: React.FC = () => {
    return (
        <Layout title="Users List">
            <Users />
        </Layout>
    );
};

export default UsersPage;
