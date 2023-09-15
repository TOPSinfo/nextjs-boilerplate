import { all, delay } from "redux-saga/effects";

import { watchLoginRequest, watchLogout } from "./login.saga";
import { watchSignupRequest } from "./signup.saga";

// Our worker Saga: will perform the async increment task
export function* helloSaga() {
    yield delay(1000);
    // tslint:disable-next-line:no-console
    console.log("Hello Sagas!");
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchLoginRequest(),
        watchSignupRequest(),
        watchLogout(),
    ]);
}
