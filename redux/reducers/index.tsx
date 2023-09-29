import { combineReducers } from "redux";
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
});

const rootReducer = (state: undefined, action: AuthActionTypes) => {
    if (action.type === "LOGOUT") {
        return appReducers(undefined, action);
    }

    return appReducers(state, action);
};
export default rootReducer;
