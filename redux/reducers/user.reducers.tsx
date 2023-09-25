import { CreateUserActionTypes, UserActionTypes } from "../actions/user.action";
import {
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
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
const initialState: UserState = {
    users: [],
    total: 0,
    limit: 0,
    skip: 0,
    error: null,
};

export interface addUser {
    user: Object | null;
    error: string | null;
}
export interface deleteUser {
    success: boolean;
    error: string | null;
}
// Define the initial  state
const createinitialState: addUser = {
    user: null,
    error: null,
};
const deleteinitialState: deleteUser = {
    success: false,
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

//create reducer function
export const createUserReducer = (
    state = createinitialState,
    action: CreateUserActionTypes
): addUser => {
    switch (action.type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                error: null,
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                error: null,
            };

        case CREATE_USER_FAIL:
            return {
                ...state,
                user: null,
                error: action.error,
            };

        default:
            return state;
    }
};

//update reducer function
export const updateUserReducer = (
    state = createinitialState,
    action: CreateUserActionTypes
): addUser => {
    switch (action.type) {
        case UPDATE_USER_REQUEST:
            return {
                ...state,
                error: null,
            };

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                error: null,
            };

        case UPDATE_USER_FAIL:
            return {
                ...state,
                user: null,
                error: action.error,
            };

        default:
            return state;
    }
};

//delte reducer function
export const deleteUserReducer = (
    state = deleteinitialState,
    action: CreateUserActionTypes
): deleteUser => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return {
                ...state,
                success: false,
                error: null,
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                success: true,
                error: null,
            };

        case DELETE_USER_FAIL:
            return {
                ...state,
                success: false,
                error: action.error,
            };

        default:
            return state;
    }
};
