import { SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constant";
import { AuthActionTypes } from "../actions/signup.action";
export interface AuthState {
    user: Object | null;
    error: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    error: null,
    loading: false,
};

const signupReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                error: null,
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default signupReducer;
