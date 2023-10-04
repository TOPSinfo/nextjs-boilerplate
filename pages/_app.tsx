import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import ToastHelper from "@/helpers/toast.helper";
import { ConfigProvider } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider from "@/helpers/AuthProvider";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router: any;
}
const App = ({ Component, pageProps }: CustomAppProps) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastHelper>
                    <AuthProvider>
                        <ConfigProvider
                            theme={{
                                token: {
                                    fontFamily: "Poppins",
                                },
                            }}
                        >
                            <Component {...pageProps} />
                        </ConfigProvider>
                    </AuthProvider>
                </ToastHelper>
            </PersistGate>
        </Provider>
    );
};

export default App;
