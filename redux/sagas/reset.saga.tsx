import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { RESET_PASSWORD_REQUEST } from "../constant";
import { toast } from "react-toastify";
import { resetFail, resetRequest, resetSuccess } from "../actions/reset.action";

// call axios method for forgot api call
export const apiCall = async (password: string, cnfPassword: string) => {
    const userData = { password: password, cnfPassword: cnfPassword };
    // add the api URL & parameters
    return await axios
        .post("/reset", userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
// create a forgot Request saga
export function* resetRequestSaga(
    action: ReturnType<typeof resetRequest>
): any {
    try {
        const response = yield call(
            apiCall,
            action.payload.password,
            action.payload.cnfPassword
        );
        const data = yield response.json();
        if (response.status === 200) {
            yield put(resetSuccess());
            // change message a/c to response coming from api
            toast.success("Password updated successfully");
        } else {
            toast.error(data?.message);
            yield put(resetFail(data));
        }
    } catch (err: any) {
        console.log("Error");
        toast.error(err.message);
        yield put(resetFail(err.message));
    }
}

export function* watchResetRequest() {
    console.log("watchResetRequest!");
    yield takeEvery(RESET_PASSWORD_REQUEST, resetRequestSaga);
}
