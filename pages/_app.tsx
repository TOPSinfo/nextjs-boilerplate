import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import ToastHelper from "@/helpers/toast.helper";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <ToastHelper>
                <Component {...pageProps} />
            </ToastHelper>
        </Provider>
    );
};

export default App;
