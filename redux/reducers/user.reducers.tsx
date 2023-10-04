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
    VIEW_USER_SUCCESS,
    VIEW_USER_REQUEST,
    VIEW_USER_FAIL,
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
type ViewUser = {
    firstName: string;
    lastname: string;
    email: string;
    gender: string;
    phone: string;
    _id: string;
};
export interface AddUser {
    user: object | null | undefined;
    error: string | null;
}

export interface ViewUserState {
    user: ViewUser | null | undefined;
    error: string | null;
}
export interface DeleteUser {
    success: boolean;
    error: string | null;
}
// Define the initial  state
const createinitialState: AddUser = {
    user: null,
    error: null,
};
const viewInitialState: ViewUserState = {
    user: null,
    error: null,
};
const deleteinitialState: DeleteUser = {
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
): AddUser => {
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
): AddUser => {
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

//delete reducer function
export const deleteUserReducer = (
    state = deleteinitialState,
    action: CreateUserActionTypes
): DeleteUser => {
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

//user details reducer function
export const viewUserReducer = (
    state = viewInitialState,
    action: CreateUserActionTypes
): ViewUserState => {
    switch (action.type) {
        case VIEW_USER_REQUEST:
            return {
                ...state,
                error: null,
            };

        case VIEW_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                error: null,
            };

        case VIEW_USER_FAIL:
            return {
                ...state,
                user: null,
                error: action.error,
            };

        default:
            return state;
    }
};
