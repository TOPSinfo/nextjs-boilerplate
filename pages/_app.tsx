import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import ToastHelper from "@/helpers/toast.helper";
import { ConfigProvider } from "antd";
import { PersistGate } from "redux-persist/integration/react";
import Loader from "@/components/Loader";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"];
    router: any;
}
const App = ({ Component, pageProps }: CustomAppProps) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
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
            </PersistGate>
        </Provider>
    );
};

export default App;
