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
    payload: { user: object };
}

interface LoginFailAction {
    type: typeof LOGIN_FAIL;
    payload: { error: string };
}
interface Logout {
    type: typeof LOGOUT;
}
interface ShowLoaderAction {
    type: typeof SHOW_LOADER;
}
interface HideLoaderAction {
    type: typeof HIDE_LOADER;
}
export type AuthActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailAction | ShowLoaderAction | HideLoaderAction;

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

export const loginSuccess = (user: object): LoginSuccessAction => ({
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

export const showLoader = (): ShowLoaderAction => ({
    type: SHOW_LOADER,
});

export const hideLoader = (): HideLoaderAction => ({
    type: HIDE_LOADER,
});
