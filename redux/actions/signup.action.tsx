import {
    SIGNUP_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from "../constant";
type User = {
    email: string;
    password: string;
    username: string;
    phone: string;
    gender: string;
    cnfPassword: string;
    agreement: boolean;
};

interface SignupRequest {
    type: typeof SIGNUP_REQUEST;
    payload: { user: User };
}

interface SignupSuccessAction {
    type: typeof SIGNUP_SUCCESS;
    payload: { user: Object };
}

interface SignupFailAction {
    type: typeof SIGNUP_FAIL;
    payload: { error: string };
}

export type AuthActionTypes =
    | SignupRequest
    | SignupSuccessAction
    | SignupFailAction;

export const signupRequest = (user: User): SignupRequest => ({
    type: SIGNUP_REQUEST,
    payload: {
        user,
    },
});

export const signupSuccess = (user: Object): SignupSuccessAction => ({
    type: SIGNUP_SUCCESS,
    payload: {
        user,
    },
});

export const signupFail = (error: string): SignupFailAction => ({
    type: SIGNUP_FAIL,
    payload: {
        error,
    },
});
