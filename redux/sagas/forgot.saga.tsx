import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { FORGOT_REQUEST } from "../constant";
import { toast } from "react-toastify";
import {
    forgotFail,
    forgotRequest,
    forgotSuccess,
} from "../actions/forgot.action";
import { hideLoader, showLoader } from "../actions/login.action";

// call axios method for forgot api call
export const apiCall = async (email: string) => {
    const userData = { email: email };
    // add the api URL & parameters
    return await axios
        .post("/forgot", userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
// create a forgot Request saga
export function* forgotRequestSaga(
    action: ReturnType<typeof forgotRequest>
): any {
    yield put(showLoader());
    try {
        const response = yield call(apiCall, action.payload.email);
        const data = yield response.json();
        if (response.status === 200) {
            yield put(forgotSuccess(data));
            // change message a/c to response coming from api
            toast.success("Sent Email Successfully to reset your password");
        } else {
            toast.error(data?.message);
            yield put(forgotFail(data));
        }
        
    } catch (err: any) {
        console.log("Error");
        toast.error(err.message);
        yield put(forgotFail(err.message));
    } finally {
        yield put(hideLoader());
    }
}

export function* watchForgotRequest() {
    console.log("watchForgotRequest!");
    yield takeEvery(FORGOT_REQUEST, forgotRequestSaga);
}
