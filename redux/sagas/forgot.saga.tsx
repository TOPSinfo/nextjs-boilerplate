import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosError } from "axios";
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
        .post("/api/auth/forgot", userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
// create a forgot Request saga
export function* forgotRequestSaga(
    action: ReturnType<typeof forgotRequest>
): unknown {
    yield put(showLoader());
    try {
        const response = yield call(apiCall, action.payload.email);

        yield put(forgotSuccess(response));
        // change message a/c to response coming from api
        toast.success(response.message);
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.response?.data?.message);
                yield put(forgotFail(err?.response?.data?.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}

export function* watchForgotRequest() {
    console.log("watchForgotRequest!");
    yield takeEvery(FORGOT_REQUEST, forgotRequestSaga);
}
