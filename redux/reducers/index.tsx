import { combineReducers } from "redux";
import { loginReducer, loaderReducer } from "./login.reducers";
import signupReducer from "./signup.reducers";
import forgotReducer from "./forgot.reducers";
import resetReducer from "./reset.reducers";
import {userReducer} from "./user.reducers";
const rootReducer = combineReducers({
    loginReducer,
    signupReducer,
    loaderReducer,
    forgotReducer,
    resetReducer,
    userReducer,
});

export default rootReducer;
