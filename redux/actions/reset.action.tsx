import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from "../constant";

interface ResetRequestAction {
    type: typeof RESET_PASSWORD_REQUEST;
    payload: {
        password: string;
        cnfPassword: string;
        token: string | string[];
    };
}
// add the payload a/c to the api response
interface ResetSuccessAction {
    type: typeof RESET_PASSWORD_SUCCESS;
}

interface ResetFailAction {
    type: typeof RESET_PASSWORD_FAIL;
    payload: { error: string };
}
export type AuthActionTypes =
    | ResetRequestAction
    | ResetSuccessAction
    | ResetFailAction;

export const resetRequest = (
    cnfPassword: string,
    password: string,
    token: string | string[]
): ResetRequestAction => ({
    type: RESET_PASSWORD_REQUEST,
    payload: {
        cnfPassword,
        password,
        token,
    },
});

export const resetSuccess = (): ResetSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS,
});

export const resetFail = (error: string): ResetFailAction => ({
    type: RESET_PASSWORD_FAIL,
    payload: {
        error,
    },
});
