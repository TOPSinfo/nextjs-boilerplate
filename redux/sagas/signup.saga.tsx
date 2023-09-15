import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    signupFail,
    signupRequest,
    signupSuccess,
} from "../actions/signup.action";
import { SIGNUP_REQUEST } from "../constant";

type User = {
    email: string;
    password: string;
    username: string;
    phone: string;
    gender: string;
    cnfPassword: string;
    agreement: boolean;
}
// create a signup Request saga
export const  apiCall = async (user: User) => {
    const userData = user;
    return await axios
        .post("https://dummyjson.com/auth/signup", userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
export function* signupRequestSaga(
    action: ReturnType<typeof signupRequest>
): any {
    try {
        const response = yield call(apiCall, action.payload.user);
        const data = yield response.json();
        if (response.status === 200) {
            yield put(signupSuccess(data));
        } else {
            yield put(signupFail(data));
        }
    } catch (err: any) {
        yield put(signupFail(err.message));
    }
}

export function* watchSignupRequest() {
    console.log("watchSignupRequest!");
    yield takeEvery(SIGNUP_REQUEST, signupRequestSaga);
}
