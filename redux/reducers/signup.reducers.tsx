import { SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constant";
import { AuthActionTypes } from "../actions/signup.action";
export interface AuthState {
    user: Object | null;
    error: string | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    error: null,
    isLoading: false,
};

const signupReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                error: null,
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                isLoading: false,
                user: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default signupReducer;
