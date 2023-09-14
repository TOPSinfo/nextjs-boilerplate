import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constant";
import { AuthActionTypes } from "../actions/login.action";
export interface AuthState {
    isLoggedIn: boolean;
    user: Object | null;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,

    error: null,
};

const loginReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                email: null,
                password: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default loginReducer;
