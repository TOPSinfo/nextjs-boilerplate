import { FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_FAIL } from "../constant";

// type of request action
interface ForgotRequestAction {
    type: typeof FORGOT_REQUEST;
    payload: { email: string;};
}
// change type a/c to api success response
interface ForgotSuccessAction {
    type: typeof FORGOT_SUCCESS;
    payload: { user: object };
}

// type of fail action
interface ForgotFailAction {
    type: typeof FORGOT_FAIL;
    payload: { error: string };
}

export type AuthActionTypes =
    | ForgotRequestAction
    | ForgotSuccessAction
    | ForgotFailAction;

export const forgotRequest = (
    email: string,
): ForgotRequestAction => ({
    type: FORGOT_REQUEST,
    payload: {
        email,
        
    },
});

export const forgotSuccess = (user: object): ForgotSuccessAction => ({
    type: FORGOT_SUCCESS,
    payload: {
        user,
    },
});

export const forgotFail = (error: string): ForgotFailAction => ({
    type: FORGOT_FAIL,
    payload: {
        error,
    },
});
