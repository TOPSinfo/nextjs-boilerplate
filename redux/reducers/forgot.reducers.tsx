import { FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_FAIL } from "../constant";
import { AuthActionTypes } from "../actions/forgot.action";
export interface AuthState {
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    error: null,
    success: false,
};

// forgot reducer function
const forgotReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case FORGOT_REQUEST:
            return {
                ...state,
                error: null,
                success: false,
            };
        case FORGOT_SUCCESS:
            return {
                ...state,
                success: true,
                error: null,
            };
        case FORGOT_FAIL:
            return {
                ...state,
                success: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default forgotReducer;
