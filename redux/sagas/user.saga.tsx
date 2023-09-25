import { call, put, select, takeEvery } from "redux-saga/effects";
import {
    fetchUsersSuccess,
    fetchUsersFailure,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    fetchUsersRequest,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
} from "../actions/user.action";
import {
    CREATE_USER_REQUEST,
    DELETE_USER_REQUEST,
    UPDATE_USER_REQUEST,
    USERS_LIST_REQUEST,
} from "../constant";
import axios from "axios";
import { hideLoader, showLoader } from "../actions/login.action";
import { toast } from "react-toastify";
type User = {
    users: [];
    total: number;
    limit: number;
    skip: number;
};
type CreateUser = {
    firstName: string;
    email: string;
    phone: string;
    age?: number;
};
type UserState = {
    user: CreateUser;
};
type EditUser = {
    firstName: string;
    email: string;
    phone: string;
    age?: number;
    id: number;
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
    yield put(showLoader());
    try {
        const users = yield call(fetchUserData);
        yield put(fetchUsersSuccess(users));
    } catch (error: any) {
        yield put(fetchUsersFailure(error?.message));
    } finally {
        yield put(hideLoader());
    }
}

const createUser = async (user: CreateUser): Promise<UserState> => {
    const userData = {
        email: user.email,
        firstName: user.firstName,
        phone: user.phone,
        age: user.age,
    };
    return await axios
        .post("https://dummyjson.com/users/add", userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};

function* createUserSaga(action: ReturnType<typeof createUserRequest>): any {
    yield put(showLoader());
    try {
        const user = yield call(createUser, action.payload.user);
        yield put(createUserSuccess(user));
        toast.success("User created successfully");
        yield put(fetchUsersRequest());
    } catch (error: any) {
        toast.error(error);
        yield put(createUserFailure(error));
    } finally {
        yield put(hideLoader());
    }
}
const updateUser = async (user: EditUser): Promise<UserState> => {
    const userData = {
        email: user.email,
        firstName: user.firstName,
        phone: user.phone,
        age: user.age,
    };
    return await axios
        .put(`https://dummyjson.com/users/${user.id}`, userData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
function* updateUserSaga(action: ReturnType<typeof updateUserRequest>): any {
    yield put(showLoader());
    try {
        const user = yield call(updateUser, action.payload.user);
        yield put(updateUserSuccess(user));
        toast.success("User updated successfully");
        yield put(fetchUsersRequest());
    } catch (error: any) {
        toast.error(error);
        yield put(updateUserFailure(error));
    } finally {
        yield put(hideLoader());
    }
}
const deleteUser = async (id: string): Promise<UserState> => {
    return await axios
        .delete(`https://dummyjson.com/users/${id}`)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
function* deleteUserSaga(action: ReturnType<typeof deleteUserRequest>): any {
    yield put(showLoader());
    try {
        const user = yield call(deleteUser, action.payload.id);
        yield put(deleteUserSuccess());
        toast.success("User deleted successfully");
        yield put(fetchUsersRequest());
    } catch (error: any) {
        toast.error(error);
        yield put(deleteUserFailure(error));
    } finally {
        yield put(hideLoader());
    }
}

// Saga watcher function
export function* userSaga() {
    yield takeEvery(USERS_LIST_REQUEST, fetchUsers);
}

export function* createUsersSaga() {
    yield takeEvery(CREATE_USER_REQUEST, createUserSaga);
}

export function* updateUsers() {
    yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
    yield takeEvery(DELETE_USER_REQUEST, deleteUserSaga);
}
