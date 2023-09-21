import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    hideLoader,
    loginFail,
    loginRequest,
    loginSuccess,
    logout,
    showLoader,
} from "../actions/login.action";
import { LOGIN_REQUEST, LOGOUT } from "../constant";
import { toast } from "react-toastify";

// create a login Request saga
export function* loginRequestSaga(
    action: ReturnType<typeof loginRequest>
): any {
    yield put(showLoader());
    const apiCall = async () => {
        const userData = {
            email: action.payload.email,
            password: action.payload.password,
        };
        return await axios
            .post("/login", userData)
            .then(response => response.data)
            .catch(err => {
                throw err;
            });
    };
    try {
        const response = yield call(apiCall);
        const data = yield response.json();
        if (response.status === 200) {
            yield put(loginSuccess(data));
            // change the message a/c to the api response message
            toast.success("Login Successfully");
        } else {
            // change the data a/c to api response
            yield put(loginFail(data));
            toast.error(data?.error);
        }
    } catch (err: any) {
        toast.error(err?.message);
        yield put(loginFail(err?.message));
    } finally {
        yield put(hideLoader());
    }
}

export function* watchLoginRequest() {
    console.log("watchLoginRequest!");
    yield takeEvery(LOGIN_REQUEST, loginRequestSaga);
}

export function* logoutSaga(action: ReturnType<typeof logout>) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
}

export function* watchLogout() {
    console.log("LOGOUT");
    yield takeEvery(LOGOUT, logoutSaga);
}
