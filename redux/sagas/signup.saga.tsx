import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    signupFail,
    signupRequest,
    signupSuccess,
} from "../actions/signup.action";
import { SIGNUP_REQUEST } from "../constant";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../actions/login.action";

type User = {
    email: string;
    password: string;
    username: string;
};
// call the signup api here
export const apiCall = async (user: User) => {
    const userData = {
        email: user.email,
        password: user.password,
        username: user.username,
    };
    // add the api URL & parameters
    return await axios
        .post("/api/auth/signup", userData)
        .then(response => response)
        .catch(err => {
            throw err;
        });
};

// create a signup Request saga
export function* signupRequestSaga(
    action: ReturnType<typeof signupRequest>
): unknown {
    yield put(showLoader());
    try {
        const response = yield call(apiCall, action.payload.user);
        console.log("response: ", response);

        // const data = yield response.json();
        if (response.status === 200) {
            yield put(signupSuccess(response));
            toast.success("Registration Successfully");
        } else {
            toast.error(response?.message);
            yield put(signupFail(response));
        }
    } catch (err: unknown) {
        console.log("Error", err);
        const error = err as { response: { data: { error: string } } };
        toast.error(error.response.data.error);
        yield put(signupFail(error.response.data.error));
    } finally {
        yield put(hideLoader());
    }
}

export function* watchSignupRequest() {
    console.log("watchSignupRequest!");
    yield takeEvery(SIGNUP_REQUEST, signupRequestSaga);
}
