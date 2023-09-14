import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constant";

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
export type AuthActionTypes =
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailAction;

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
