// Loader.tsx

import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

// common loader file
const Loader: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.loaderReducer);
    console.log("isLoading: " + isLoading.loading);

    return isLoading.loading ? (
        <div
            data-testid="loader"
            className="loader-container h-screen flex justify-center items-center text-center rounded-[4px] bg-[rgba(0, 0, 0, 0.05)]"
        >
            <Spin indicator={antIcon} size="large" />
        </div>
    ) : null;
};

export default Loader;
