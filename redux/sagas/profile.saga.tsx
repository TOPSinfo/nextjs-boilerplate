import { call, put, takeEvery } from "redux-saga/effects";
import {
    GET_PROFILE_REQUEST,
    UPDATE_PROFILE_REQUEST,
    UPLOAD_IMAGE_REQUEST,
} from "../constant";
import axios from "@/helpers/axios";
import { hideLoader, showLoader } from "../actions/login.action";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
    getProfileFailure,
    getProfileRequest,
    getProfileSuccess,
    updateProfileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    uploadImageFailure,
    uploadImageRequest,
    uploadImageSuccess,
} from "../actions/profile.action";

type UserState = {
    user: UpdateProfile;
};
type UpdateProfile = {
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
//  Replace with your API call function to update profile
const updateProfile = async (user: UpdateProfile): Promise<UserState> => {
    const userData = {
        email: user.email,
        username: user.username,
        birth_date: user.birth_date,
        gender: user.gender,
        address: user.address,
        state: user.state,
        city: user.city,
        zip: user.zip,
        id: user._id,
    };

    return await axios
        .put(`/api/auth/profile`, userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
function* updateProfileSaga(
    action: ReturnType<typeof updateProfileRequest>
): unknown {
    yield put(showLoader());
    try {
        const user = yield call(updateProfile, action.payload.user);
        yield put(updateProfileSuccess(user));
        toast.success("Profile updated successfully");
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.response?.data.message);
                yield put(updateProfileFailure(err?.response?.data.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}
const uploadImage = async (profile: uploadImage) => {
    const formData = new FormData();
    formData.append("profilePic", profile.profilePic);
    formData.append("id", profile?._id as string);

    return await axios
        .post(`/api/uploadImage`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
function* uploadImageSaga(
    action: ReturnType<typeof uploadImageRequest>
): unknown {
    yield put(showLoader());
    try {
        const profileData = yield call(uploadImage, action.payload.profile);
        yield put(uploadImageSuccess(profileData));
        toast.success("Profile Image updated successfully");
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.response?.data.message);
                yield put(uploadImageFailure(err?.response?.data.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}

const profileDetails = async (
    id: string | undefined | string[]
): Promise<UserState> => {
    return await axios
        .get(`/api/auth/profile?id=${id}`)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
function* GetProfileSaga(
    action: ReturnType<typeof getProfileRequest>
): unknown {
    console.log("testetst");
    yield put(showLoader());
    try {
        const user = yield call(profileDetails, action.payload.id);
        yield put(getProfileSuccess(user));
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.response?.data.message);
                yield put(getProfileFailure(err?.response?.data.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}

// Saga watcher function
function* profileSaga() {
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileSaga);
    yield takeEvery(GET_PROFILE_REQUEST, GetProfileSaga);
    yield takeEvery(UPLOAD_IMAGE_REQUEST, uploadImageSaga);
}

export default profileSaga;
