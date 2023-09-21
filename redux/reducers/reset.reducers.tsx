import {
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from "../constant";
import { AuthActionTypes } from "../actions/reset.action";
// change in type a/c to apiAction
export interface AuthState {
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    error: null,
    success: false,
};

// reset password reducer function
const resetPassword = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                error: null,
                success: false,
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                success: true,
                error: null,
            };
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                success: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default resetPassword;
