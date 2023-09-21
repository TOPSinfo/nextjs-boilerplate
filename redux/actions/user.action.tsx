import { Action } from "redux";
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
