import { SIGNUP_FAIL, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../constant";
import { AuthActionTypes } from "../actions/signup.action";
export interface AuthState {
    user: object | null;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    error: null,
};

const signupReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                error: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                error: null,
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                user: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default signupReducer;
