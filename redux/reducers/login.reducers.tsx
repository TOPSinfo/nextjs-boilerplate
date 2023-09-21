import {
    HIDE_LOADER,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    SHOW_LOADER,
} from "../constant";
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
// login reducer function
export const loginReducer = (state = initialState, action: AuthActionTypes) => {
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
                user: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

const loaderState = {
    loading: false,
};
export const loaderReducer = (state = loaderState, action: AuthActionTypes) => {
    switch (action.type) {
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        default:
            return state;
    }
};
