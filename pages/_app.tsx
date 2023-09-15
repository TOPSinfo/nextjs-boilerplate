import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ToastHelper from "@/helpers/toast.helper";
import { NextRouter, Router } from "next/router";

interface CustomAppProps extends Omit<AppProps, "Component"> {
    Component: AppProps["Component"];
    router: any;
  }
const App = ({ Component, pageProps }: CustomAppProps) => {
    return (
        <Provider store={store}>
            <ToastHelper>
                <Component {...pageProps} />
            </ToastHelper>
        </Provider>
    );
};

export default App;
