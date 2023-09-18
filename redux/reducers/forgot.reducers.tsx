import { FORGOT_REQUEST, FORGOT_SUCCESS, FORGOT_FAIL } from "../constant";
import { AuthActionTypes } from "../actions/forgot.action";
export interface AuthState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AuthState = {
    loading: false,
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
                loading: true,
                success: false,
            };
        case FORGOT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case FORGOT_FAIL:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default forgotReducer;
