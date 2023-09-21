import { call, put, takeEvery } from "redux-saga/effects";
import {
    fetchUsersSuccess,
    fetchUsersFailure,
} from "../actions/user.action";
import { USERS_LIST_REQUEST } from "../constant";
import axios from "axios";
import { hideLoader, showLoader } from "../actions/login.action";
type User = {
    users: [];
    total: number;
    limit: number;
    skip: number;
};
// Replace with your API call function to fetch user data
const fetchUserData = async (): Promise<User> => {
    // Example API call
    return await axios
        .get("https://dummyjson.com/users")
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};

// Saga worker function
export function* fetchUsers(): any {
   yield put(showLoader())
    try {
        const users = yield call(fetchUserData);
        yield put(fetchUsersSuccess(users));
    } catch (error: any) {
        yield put(fetchUsersFailure(error?.message));
    } 
    finally {
        yield put(hideLoader())
    }
}

// Saga watcher function
export function* userSaga() {
    yield takeEvery(USERS_LIST_REQUEST, fetchUsers);
}
