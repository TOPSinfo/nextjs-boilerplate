import Layout from "@/components/Layout";
import React from "react";
import CreateUsers from "@/components/Users/CreateUsers";

const CreateUsersPage: React.FC = () => {
    return (
        <Layout title="Create Users">
            <CreateUsers />
        </Layout>
    );
};

export default CreateUsersPage;
