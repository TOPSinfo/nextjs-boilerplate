import { CombinedState, Reducer, combineReducers } from "redux";
import { loginReducer, loaderReducer } from "./login.reducers";
import signupReducer from "./signup.reducers";
import forgotReducer from "./forgot.reducers";
import resetReducer from "./reset.reducers";
import {
    userReducer,
    createUserReducer,
    updateUserReducer,
    deleteUserReducer,
    viewUserReducer,
} from "./user.reducers";
import { AuthActionTypes } from "../actions/login.action";
import { RootState } from "../store";
import { LOGOUT } from "../constant";
import { getProfileReducer, updateProfileReducer, updateImageReducer } from "./profile.reducers";

const appReducers = combineReducers({
    loginReducer,
    signupReducer,
    loaderReducer,
    forgotReducer,
    resetReducer,
    userReducer,
    createUserReducer,
    updateUserReducer,
    deleteUserReducer,
    viewUserReducer,
    getProfileReducer,
    updateProfileReducer,
    updateImageReducer,
});

const rootReducer: Reducer = (
    state: CombinedState<RootState> | undefined,
    action: AuthActionTypes
) => {
    if (action.type === LOGOUT) {
        localStorage.clear();
        return appReducers(undefined, action);
    }
    return appReducers(state, action);
};
export default rootReducer;
