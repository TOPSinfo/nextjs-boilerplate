// Loader.tsx

import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

// common loader file
const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <Spin indicator={antIcon} size="large" />
        </div>
    );
};

export default Loader;
