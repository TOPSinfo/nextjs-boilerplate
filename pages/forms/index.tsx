import Layout from "@/components/Layout";
import React from "react";
import withAuth from "@/helpers/withAuth";
import Forms from "@/components/Forms";

const FormsPage: React.FC = () => {
    return (
        <Layout title="Forms">
            <Forms  />
        </Layout>
    );
};

export default withAuth(FormsPage);
