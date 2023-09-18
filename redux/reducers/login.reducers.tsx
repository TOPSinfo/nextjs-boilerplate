import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constant";
import { AuthActionTypes } from "../actions/login.action";
export interface AuthState {
    isLoggedIn: boolean;
    loading: boolean;
    user: Object | null;
    error: string | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    error: null,
    loading: false,
};
// login reducer function
const loginReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loading: false,
                user: action.payload.user,
                error: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default loginReducer;
