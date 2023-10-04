import { call, put, takeEvery } from "redux-saga/effects";
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
    viewUserSuccess,
    viewUserFailure,
} from "../actions/user.action";
import {
    CREATE_USER_REQUEST,
    DELETE_USER_REQUEST,
    UPDATE_USER_REQUEST,
    USERS_LIST_REQUEST,
    VIEW_USER_REQUEST,
} from "../constant";
import axios from "@/helpers/axios";
import { hideLoader, showLoader } from "../actions/login.action";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
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
    lastname: string;
    gender: string;
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
    const accessToken = localStorage.getItem("token");
    const headers = {
        headers: { Authorization: `${accessToken}` },
    };

    return await axios
        .get("/api/users", headers)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};

// Saga worker function
export function* fetchUsers(): unknown {
    yield put(showLoader());
    try {
        const users = yield fetchUserData();

        yield put(fetchUsersSuccess(users));
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.response?.data?.message);
                yield put(fetchUsersFailure(err?.response?.data?.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}
//  Replace with your API call function to create user
const createUser = async (user: CreateUser): Promise<UserState> => {
    const userData = {
        email: user.email,
        firstName: user.firstName,
        phone: user.phone,
        lastname: user.lastname,
        gender: user.gender,
    };
    const accessToken = localStorage.getItem("token");
    const headers = {
        headers: { Authorization: `${accessToken}` },
    };
    return await axios
        .post("api/users", userData, headers)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};

function* createUserSaga(
    action: ReturnType<typeof createUserRequest>
): unknown {
    yield put(showLoader());
    try {
        const user = yield call(createUser, action.payload.user);
        yield put(createUserSuccess(user));
        toast.success("User created successfully");
        yield put(fetchUsersRequest());
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.response?.data._message);
                yield put(createUserFailure(err?.response?.data?._message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}
//  Replace with your API call function to update user
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
function* updateUserSaga(
    action: ReturnType<typeof updateUserRequest>
): unknown {
    yield put(showLoader());
    try {
        const user = yield call(updateUser, action.payload.user);
        yield put(updateUserSuccess(user));
        toast.success("User updated successfully");
        yield put(fetchUsersRequest());
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.message);
                yield put(updateUserFailure(err?.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}
//  Replace with your API call function to delete user

const deleteUser = async (id: string): Promise<UserState> => {
    return await axios
        .delete(`https://dummyjson.com/users/${id}`)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
function* deleteUserSaga(
    action: ReturnType<typeof deleteUserRequest>
): unknown {
    yield put(showLoader());
    try {
        yield call(deleteUser, action.payload.id);
        yield put(deleteUserSuccess());
        toast.success("User deleted successfully");
        yield put(fetchUsersRequest());
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.message);
                yield put(deleteUserFailure(err?.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}
//  Replace with your API call function to show user details

const userDetails = async (id: string | undefined): Promise<UserState> => {
    return await axios
        .get(`api/users/${id}`)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
};
function* UserDetailSaga(
    action: ReturnType<typeof deleteUserRequest>
): unknown {
    yield put(showLoader());
    try {
        const user = yield call(userDetails, action.payload.id);
        yield put(viewUserSuccess(user));
    } catch (err: unknown) {
        if (err instanceof AxiosError) {
            // Now TypeScript recognizes err as AxiosError, and you can access err.response
            if (err.response) {
                toast.error(err?.message);
                yield put(viewUserFailure(err?.message));
            }
        }
    } finally {
        yield put(hideLoader());
    }
}

// Saga watcher function
function* userSaga() {
    yield takeEvery(USERS_LIST_REQUEST, fetchUsers);
    yield takeEvery(UPDATE_USER_REQUEST, updateUserSaga);
    yield takeEvery(DELETE_USER_REQUEST, deleteUserSaga);
    yield takeEvery(VIEW_USER_REQUEST, UserDetailSaga);
    yield takeEvery(CREATE_USER_REQUEST, createUserSaga);
}

export default userSaga;
