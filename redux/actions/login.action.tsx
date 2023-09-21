import {
    HIDE_LOADER,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    SHOW_LOADER,
} from "../constant";

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: { email: string; password: string };
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: { user: Object };
}

interface LoginFailAction {
    type: typeof LOGIN_FAIL;
    payload: { error: string };
}
interface Logout {
    type: typeof LOGOUT;
}
interface showLoader {
    type: typeof SHOW_LOADER;
}
interface hideLoader {
    type: typeof HIDE_LOADER;
}
export type AuthActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailAction | showLoader | hideLoader;

export const loginRequest = (
    email: string,
    password: string
): LoginRequestAction => ({
    type: LOGIN_REQUEST,
    payload: {
        email,
        password,
    },
});

export const loginSuccess = (user: Object): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: {
        user,
    },
});

export const loginFail = (error: string): LoginFailAction => ({
    type: LOGIN_FAIL,
    payload: {
        error,
    },
});

export const logout = (): Logout => ({
    type: LOGOUT,
});

export const showLoader = (): showLoader => ({
    type: SHOW_LOADER,
});

export const hideLoader = (): hideLoader => ({
    type: HIDE_LOADER,
});
