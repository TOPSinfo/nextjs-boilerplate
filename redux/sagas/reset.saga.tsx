import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosError } from "axios";
import { RESET_PASSWORD_REQUEST } from "../constant";
import { toast } from "react-toastify";
import { resetFail, resetRequest, resetSuccess } from "../actions/reset.action";
import { hideLoader, showLoader } from "../actions/login.action";

// call axios method for forgot api call
export const apiCall = async (
    password: string,
    cnfPassword: string,
    token: string | string[]
) => {
    const userData = { password: password, confirmPassword: cnfPassword };
    // add the api URL & parameters
    return await axios
        .put(`/api/auth/reset/${token}`, userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
// create a forgot Request saga
export function* resetRequestSaga(
    action: ReturnType<typeof resetRequest>
): unknown {
    try {
        yield put(showLoader());
        const response = yield call(
            apiCall,
            action.payload.password,
            action.payload.cnfPassword,
            action.payload.token
        );

        yield put(resetSuccess());
        toast.success(response.message);
        window.location.href = "/";
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.response?.data?.message);

                yield put(resetFail(err?.response?.data?.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}

export function* watchResetRequest() {
    console.log("watchResetRequest!");
    yield takeEvery(RESET_PASSWORD_REQUEST, resetRequestSaga);
}
