import { UserActionTypes } from "../actions/user.action";
import {
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAIL,
} from "../constant";

type User = {
    users: [];
    total: number;
    limit: number;
    skip: number;
};

type UserState = {
    users: User[] | [];
    total: number;
    limit: number;
    skip: number;
    error: string | null;
};
// Define the initial state
const initialState: UserState = {
    users: [],
    total: 0,
    limit: 0,
    skip: 0,
    error: null,
};

// Reducer function
export const userReducer = (
    state = initialState,
    action: UserActionTypes
): UserState => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return {
                ...state,
                error: null,
            };

        case USERS_LIST_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                error: null,
                total: action.payload.total,
                limit: action.payload.limit,
                skip: action.payload.skip,
            };

        case USERS_LIST_FAIL:
            return {
                ...state,
                users: [],
                error: action.error,
            };

        default:
            return state;
    }
};

export const createUserReducer = (
    state = initialState,
    action: UserActionTypes
): UserState => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return {
                ...state,
                error: null,
            };

        case USERS_LIST_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                error: null,
                total: action.payload.total,
                limit: action.payload.limit,
                skip: action.payload.skip,
            };

        case USERS_LIST_FAIL:
            return {
                ...state,
                users: [],
                error: action.error,
            };

        default:
            return state;
    }
};