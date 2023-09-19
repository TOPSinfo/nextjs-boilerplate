import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ToastHelper from "@/helpers/toast.helper";
import { NextRouter, Router } from "next/router";
import { ConfigProvider } from "antd";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"];
    router: any;
}
const App = ({ Component, pageProps }: CustomAppProps) => {
    return (
        <Provider store={store}>
            <ToastHelper>
                <ConfigProvider
                    theme={{
                        token: {
                            fontFamily: "Poppins",
                        },
                    }}
                >
                    <Component {...pageProps} />
                </ConfigProvider>
            </ToastHelper>
        </Provider>
    );
};

export default App;
