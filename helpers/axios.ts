// helpers/authenticatedAxios.ts
import axios from "axios";

const authenticatedAxios = axios.create({
    baseURL: process.env.NEXTAUTH_URL,
    // Other Axios configuration options
});

let sessionData: { user: { accessToken: string; refreshToken: string } } = {
    user: { accessToken: "", refreshToken: "" },
};
let refreshToken: () => void;

authenticatedAxios.interceptors.request.use(
    config => {
        console.log(sessionData?.user?.accessToken, "sessionData");
        console.log(
            config.headers["Authorization"],
            "configconfigconfigconfigconfig"
        );
        if (sessionData?.user?.accessToken) {
            console.log(
                sessionData?.user?.accessToken,
                "sessionData in if ===============>"
            );
            config.headers[
                "Authorization"
            ] = `${sessionData?.user?.accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

authenticatedAxios.interceptors.response.use(
    response => response,
    async error => {
        const prevRequest = error?.config;
        console.log("test request", error?.response?.status, sessionData?.user);

        if (
            error?.response?.status === 401 &&
            prevRequest?.headers["Authorization"] &&
            sessionData?.user?.refreshToken
        ) {
            console.log("in if");
            if (!prevRequest.sent) {
                prevRequest.sent = true;
                await refreshToken();
                prevRequest.headers[
                    "Authorization"
                ] = `${sessionData?.user?.accessToken}`;

                return authenticatedAxios(prevRequest);
            }
        }
        return Promise.reject(error);
    }
);

export const initializeAuthenticatedAxios = (
    initialSession: { user: { accessToken: string; refreshToken: string } },
    initialRefreshToken: () => void
) => {
    sessionData = initialSession;
    refreshToken = initialRefreshToken;
};

export default authenticatedAxios;
