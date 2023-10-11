import { Action } from "redux";
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
} from "../constant";

type updateProfile = {
    _id: string;
    username: string;
    email: string;
    birth_date: string;
    address: string;
    gender: string;
    state: string;
    city: string;
    zip: string;
};

type uploadImage = {
    _id: string;
    profilePic: File;
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

// type of action to upload image
export interface UploadImageRequestAction
    extends Action<typeof UPLOAD_IMAGE_REQUEST> {
    payload: { profile: uploadImage }; // Replace 'updateProfile' with your actual user data type
}

export interface UploadImageSuccessAction
    extends Action<typeof UPLOAD_IMAGE_SUCCESS> {
    payload: { profile: object }; // Replace 'object' with your actual user data type
}

export interface UploadImageFailureAction
    extends Action<typeof UPLOAD_IMAGE_FAIL> {
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
    | GetProfileFailureAction
    | UploadImageRequestAction
    | UploadImageSuccessAction
    | UploadImageFailureAction;

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

export const uploadImageRequest = (
    profile: uploadImage
): UploadImageRequestAction => ({
    type: UPLOAD_IMAGE_REQUEST,
    payload: {
        profile,
    },
});

export const uploadImageSuccess = (
    profile: object
): UploadImageSuccessAction => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: {
        profile,
    },
});

export const uploadImageFailure = (
    error: string
): UploadImageFailureAction => ({
    type: UPLOAD_IMAGE_FAIL,
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
