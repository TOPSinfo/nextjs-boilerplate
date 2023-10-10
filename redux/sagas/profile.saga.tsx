import { call, put, takeEvery } from "redux-saga/effects";
import { GET_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST } from "../constant";
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
} from "../actions/profile.action";

type CreateUser = {
    firstName: string;
    email: string;
    phone: string;
    lastname: string;
    gender: string;
    profile_pic: File;
};
type UserState = {
    user: CreateUser;
};
type UpdateProfile = {
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

//  Replace with your API call function to update profile
const updateProfile = async (user: UpdateProfile): Promise<UserState> => {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("username", user.username);
    formData.append("birth_date", user.birth_date);
    formData.append("gender", user.gender);
    formData.append("address", user.address);
    formData.append("state", user.state);
    formData.append("city", user.city);
    formData.append("zip", user.zip);
    formData.append("profile_pic", user.profile_pic);
    formData.append("id", user.id);

    return await axios
        .put(`/api/auth/profile`, formData, {
            headers: { "Content-Type": "multipart/form" },
        })
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
        window.location.href = "/users";
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
}

export default profileSaga;
