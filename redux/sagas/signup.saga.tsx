import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
    signupFail,
    signupRequest,
    signupSuccess,
} from "../actions/signup.action";
import { SIGNUP_REQUEST } from "../constant";
import { toast } from "react-toastify";

type User = {
    email: string;
    password: string;
    username: string;
    phone: string;
    gender: string;
    cnfPassword: string;
    agreement: boolean;
};
// call the signup api here
export const apiCall = async (user: User) => {
    const userData = user;
    // add the api URL & parameters
    return await axios
        .post("/signup", userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};

// create a signup Request saga
export function* signupRequestSaga(
    action: ReturnType<typeof signupRequest>
): any {
    try {
        const response = yield call(apiCall, action.payload.user);
        const data = yield response.json();
        if (response.status === 200) {
            yield put(signupSuccess(data));
            toast.success("Registration Successfully");
        } else {
            toast.error(data?.message);
            yield put(signupFail(data));
        }
    } catch (err: any) {
        console.log("Error");
        toast.error(err.message);
        yield put(signupFail(err.message));
    }
}

export function* watchSignupRequest() {
    console.log("watchSignupRequest!");
    yield takeEvery(SIGNUP_REQUEST, signupRequestSaga);
}
