import { call, put, take, takeEvery, delay } from "redux-saga/effects";
import axios from "axios";
import {
    loginFail,
    loginRequest,
    loginSuccess,
    logout,
} from "../actions/login.action";
import { LOGIN_REQUEST, LOGOUT } from "../constant";
interface loginSaga {
    user: Object;
    error: string;
}
// create a login Request saga
export function* loginRequestSaga(
    action: ReturnType<typeof loginRequest>
): any {
    const apiCall = async () => {
        const userData = {
            email: action.payload.email,
            password: action.payload.password,
        };
        return await axios
            .post("/posts", userData)
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
        } else {
            yield put(loginFail(data));
        }
    } catch (err: any) {
        yield put(loginFail(err.message));
    }
}

export function* watchLoginRequest() {
    console.log("watchLoginRequest!");
    yield takeEvery(LOGIN_REQUEST, loginRequestSaga);
}

export function* watchLogout() {
    yield takeEvery(LOGOUT, logout);
    console.log("LOGOUT");
}
