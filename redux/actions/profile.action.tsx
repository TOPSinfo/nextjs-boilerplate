import { Action } from "redux";
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
} from "../constant";

type updateProfile = {
    id: string;
    username: string;
    email: string;
    birth_date: string;
    address: string;
    gender: string;
    state: string;
    city: string;
    zip: string;
    profile_pic: File;
};

// type of request action for update profile
export interface UpdateProfileRequestAction
    extends Action<typeof UPDATE_PROFILE_REQUEST> {
    payload: { user: updateProfile }; // Replace 'updateProfile' with your actual user data type
}

export interface UpdateProfileSuccessAction
    extends Action<typeof UPDATE_PROFILE_SUCCESS> {
    payload: { user: object }; // Replace 'object' with your actual user data type
}

export interface UpdateProfileFailureAction
    extends Action<typeof UPDATE_PROFILE_FAIL> {
    error: string;
}

// type of request action for get profile details
export interface GetProfileRequestAction
    extends Action<typeof GET_PROFILE_REQUEST> {
    payload: { id: string | undefined | string[] }; // Replace 'payload' with your actual payload type
}

export interface GetProfileSuccessAction
    extends Action<typeof GET_PROFILE_SUCCESS> {
    payload: { user: null | object }; // Replace 'object' with your actual user data type
}

export interface GetProfileFailureAction
    extends Action<typeof GET_PROFILE_FAIL> {
    error: string;
}

export type ProfileActionTypes =
    | UpdateProfileRequestAction
    | UpdateProfileSuccessAction
    | UpdateProfileFailureAction
    | GetProfileRequestAction
    | GetProfileSuccessAction
    | GetProfileFailureAction;

// Export action creators for Update Profile
export const updateProfileRequest = (
    user: updateProfile
): UpdateProfileRequestAction => ({
    type: UPDATE_PROFILE_REQUEST,
    payload: {
        user,
    },
});

export const updateProfileSuccess = (
    user: object
): UpdateProfileSuccessAction => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload: {
        user,
    },
});

export const updateProfileFailure = (
    error: string
): UpdateProfileFailureAction => ({
    type: UPDATE_PROFILE_FAIL,
    error,
});

// Export action creators for get Profile
export const getProfileRequest = (
    id: string | undefined
): GetProfileRequestAction => ({
    type: GET_PROFILE_REQUEST,
    payload: {
        id,
    },
});

export const getProfileSuccess = (user: object): GetProfileSuccessAction => ({
    type: GET_PROFILE_SUCCESS,
    payload: {
        user,
    },
});

export const getProfileFailure = (error: string): GetProfileFailureAction => ({
    type: GET_PROFILE_FAIL,
    error,
});
