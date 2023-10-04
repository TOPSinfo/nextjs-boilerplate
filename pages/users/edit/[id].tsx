import Layout from "@/components/Layout";
import React from "react";
import CreateUsers from "@/components/Users/CreateUsers";

const EditUsers: React.FC = () => {
    return (
        <Layout title="Edit Users">
            <CreateUsers edit={true} />
        </Layout>
    );
};

export default EditUsers;
