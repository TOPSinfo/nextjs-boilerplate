import { ProfileActionTypes } from "../actions/profile.action";
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
} from "../constant";

export interface UpdateProfile {
    user: object | null | undefined;
    error: string | null;
}

export interface GetProfile {
    user: object | null | undefined;
    error: string | null;
}

// Define the initial  state
const updateProfileState: UpdateProfile = {
    user: null,
    error: null,
};
const getProfileState: GetProfile = {
    user: null,
    error: null,
};

//update profile reducer function
export const updateProfileReducer = (
    state = updateProfileState,
    action: ProfileActionTypes
): UpdateProfile => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                error: null,
            };

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                error: null,
            };

        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                user: null,
                error: action.error,
            };

        default:
            return state;
    }
};

//get profile reducer function
export const getProfileReducer = (
    state = getProfileState,
    action: ProfileActionTypes
): GetProfile => {
    switch (action.type) {
        case GET_PROFILE_REQUEST:
            return {
                ...state,
                error: null,
            };

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                error: null,
            };

        case GET_PROFILE_FAIL:
            return {
                ...state,
                user: null,
                error: action.error,
            };

        default:
            return state;
    }
};
