import { Action } from "redux";
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
    VIEW_USER_REQUEST,
    VIEW_USER_SUCCESS,
    VIEW_USER_FAIL,
} from "../constant";

type User = {
    users: [];
    total: number;
    limit: number;
    skip: number;
};

type CreateUser = {
    firstName: string;
    email: string;
    phone: string;
    age?: number;
    image: string;
    lastname: string;
    gender: string;
};
type UpdateUser = {
    id: string;
    firstName: string;
    email: string;
    phone: string;
    lastname: string;
    gender: string;
};

type ViewUser = {
    _id: string;
    firstName: string;
    email: string;
    phone: string;
    lastname: string;
    gender: string;
};

// type of request action for fetch users
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
// type of request action for add users
export interface CreateUsersRequestAction
    extends Action<typeof CREATE_USER_REQUEST> {
    payload: { user: CreateUser }; // Replace 'User' with your actual user data type
}

export interface CreateUsersSuccessAction
    extends Action<typeof CREATE_USER_SUCCESS> {
    payload: { user: object }; // Replace 'User' with your actual user data type
}

export interface CreateUsersFailureAction
    extends Action<typeof CREATE_USER_FAIL> {
    error: string;
}
// type of request action for update users
export interface UpdateUsersRequestAction
    extends Action<typeof UPDATE_USER_REQUEST> {
    payload: { user: UpdateUser }; // Replace 'User' with your actual user data type
}

export interface UpdateUsersSuccessAction
    extends Action<typeof UPDATE_USER_SUCCESS> {
    payload: { user: object }; // Replace 'User' with your actual user data type
}

export interface UpdateUsersFailureAction
    extends Action<typeof UPDATE_USER_FAIL> {
    error: string;
}
// type of request action for delete users

export interface DeleteUsersRequestAction
    extends Action<typeof DELETE_USER_REQUEST> {
    payload: { id: string }; // Replace 'User' with your actual user data type
}

export interface DeleteUsersSuccessAction
    extends Action<typeof DELETE_USER_SUCCESS> {}

export interface DeleteUsersFailureAction
    extends Action<typeof DELETE_USER_FAIL> {
    error: string;
}
// type of request action for view users details
export interface ViewUsersRequestAction
    extends Action<typeof VIEW_USER_REQUEST> {
    payload: { id: string | undefined | string[] }; // Replace 'payload' with your actual payload type
}

export interface ViewUsersSuccessAction
    extends Action<typeof VIEW_USER_SUCCESS> {
    payload: { user: null | ViewUser }; // Replace 'User' with your actual user data type
}

export interface ViewUsersFailureAction extends Action<typeof VIEW_USER_FAIL> {
    error: string;
}
export type UserActionTypes =
    | FetchUsersRequestAction
    | FetchUsersSuccessAction
    | FetchUsersFailureAction;
export type CreateUserActionTypes =
    | CreateUsersRequestAction
    | CreateUsersSuccessAction
    | CreateUsersFailureAction
    | UpdateUsersRequestAction
    | UpdateUsersSuccessAction
    | UpdateUsersFailureAction
    | DeleteUsersRequestAction
    | DeleteUsersSuccessAction
    | DeleteUsersFailureAction
    | ViewUsersRequestAction
    | ViewUsersSuccessAction
    | ViewUsersFailureAction;

// Export action creators for fetch users
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
// Export action creators for create users

export const createUserRequest = (
    user: CreateUser
): CreateUsersRequestAction => ({
    type: CREATE_USER_REQUEST,
    payload: {
        user,
    },
});

export const createUserSuccess = (user: object): CreateUsersSuccessAction => ({
    type: CREATE_USER_SUCCESS,
    payload: {
        user,
    },
});

export const createUserFailure = (error: string): CreateUsersFailureAction => ({
    type: CREATE_USER_FAIL,
    error,
});
// Export action creators for update users

export const updateUserRequest = (
    user: UpdateUser
): UpdateUsersRequestAction => ({
    type: UPDATE_USER_REQUEST,
    payload: {
        user,
    },
});

export const updateUserSuccess = (user: object): UpdateUsersSuccessAction => ({
    type: UPDATE_USER_SUCCESS,
    payload: {
        user,
    },
});

export const updateUserFailure = (error: string): UpdateUsersFailureAction => ({
    type: UPDATE_USER_FAIL,
    error,
});
// Export action creators for delete users
export const deleteUserRequest = (id: string): DeleteUsersRequestAction => ({
    type: DELETE_USER_REQUEST,
    payload: {
        id,
    },
});

export const deleteUserSuccess = (): DeleteUsersSuccessAction => ({
    type: DELETE_USER_SUCCESS,
});

export const deleteUserFailure = (error: string): DeleteUsersFailureAction => ({
    type: DELETE_USER_FAIL,
    error,
});
// Export action creators for view users
export const viewUsersRequest = (
    id: string | undefined | string[]
): ViewUsersRequestAction => ({
    type: VIEW_USER_REQUEST,
    payload: {
        id,
    },
});

export const viewUserSuccess = (user: ViewUser): ViewUsersSuccessAction => ({
    type: VIEW_USER_SUCCESS,
    payload: {
        user,
    },
});

export const viewUserFailure = (error: string): ViewUsersFailureAction => ({
    type: VIEW_USER_FAIL,
    error,
});
