import { call, put, takeEvery } from "redux-saga/effects";

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
import { signIn, signOut } from "next-auth/react";

// create a login Request saga
export function* loginRequestSaga(
    action: ReturnType<typeof loginRequest>
): unknown {
    yield put(showLoader());
    const apiCall = async () => {
        const userData = {
            email: action.payload.email,
            password: action.payload.password,
        };
        const res = await signIn("credentials", {
            email: userData.email,
            password: userData.password,
            redirect: false,
        });
        return res;
    };
    try {
        const response = yield call(apiCall);
        // const data = yield response.json();
        console.log("response: ", response);

        if (response.status === 200) {
            yield put(loginSuccess(response));
            // change the message a/c to the api response message
            toast.success("Login Successfully");
        } else {
            // change the data a/c to api response
            yield put(loginFail(response));
            toast.error(response?.error);
        }
    } catch (err: unknown) {
        console.log("Error", err);
        const error = err as { message: string };
        toast.error(error?.message);
        yield put(loginFail(error?.message));
    } finally {
        yield put(hideLoader());
    }
}

export function* watchLoginRequest() {
    console.log("watchLoginRequest!");
    yield takeEvery(LOGIN_REQUEST, loginRequestSaga);
}

export function* logoutSaga(action: ReturnType<typeof logout>) {
    yield action;
    signOut({ callbackUrl: "/" });
}

export function* watchLogout() {
    console.log("LOGOUT");
    yield takeEvery(LOGOUT, logoutSaga);
}
