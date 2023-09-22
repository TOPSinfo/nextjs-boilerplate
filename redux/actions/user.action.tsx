import { Action } from "redux";
import {
    USERS_LIST_REQUEST,
    USERS_LIST_SUCCESS,
    USERS_LIST_FAIL,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
} from "../constant";

type User = {
    users: [];
    total: number;
    limit: number;
    skip: number;
};

type CreateUser = {
    id: string;
    firstName: string;
    email: string;
    phone: string;
    age?: number;
};

// type of request action
export interface FetchUsersRequestAction
    extends Action<typeof USERS_LIST_REQUEST> {}

export interface FetchUsersSuccessAction
    extends Action<typeof USERS_LIST_SUCCESS> {
    payload: User; // Replace 'User' with your actual user data type
}

export interface FetchUsersFailureAction
    extends Action<typeof USERS_LIST_FAIL> {
    error: string;
}
export interface CreateUsersRequestAction
    extends Action<typeof CREATE_USER_REQUEST> {
    payload: CreateUser; // Replace 'User' with your actual user data type
}

export interface CreateUsersSuccessAction
    extends Action<typeof CREATE_USER_SUCCESS> {
    // Replace 'User' with your actual user data type
}

export interface CreateUsersFailureAction
    extends Action<typeof CREATE_USER_FAIL> {
    error: string;
}
export type UserActionTypes =
    | FetchUsersRequestAction
    | FetchUsersSuccessAction
    | FetchUsersFailureAction;

// Export action creators
export const fetchUsersRequest = (): FetchUsersRequestAction => ({
    type: USERS_LIST_REQUEST,
});

export const fetchUsersSuccess = (users: User): FetchUsersSuccessAction => ({
    type: USERS_LIST_SUCCESS,
    payload: users,
});

export const fetchUsersFailure = (error: string): FetchUsersFailureAction => ({
    type: USERS_LIST_FAIL,
    error,
});

export const createUserRequest = (
    user: CreateUser
): CreateUsersRequestAction => ({
    type: CREATE_USER_REQUEST,
    payload: user,
});

export const createUserSuccess = (): CreateUsersSuccessAction => ({
    type: CREATE_USER_SUCCESS,
});

export const createUserFailure = (error: string): CreateUsersFailureAction => ({
    type: CREATE_USER_FAIL,
    error,
});
