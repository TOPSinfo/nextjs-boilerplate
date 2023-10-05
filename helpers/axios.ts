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
        if (sessionData?.user?.accessToken) {
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

        if (
            error?.response?.status === 401 &&
            prevRequest?.headers["Authorization"] &&
            sessionData?.user?.refreshToken
        ) {
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
