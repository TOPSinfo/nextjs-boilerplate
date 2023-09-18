import { combineReducers } from "redux";
import loginReducer from "./login.reducers";
import signupReducer from "./signup.reducers";
import forgotReducer from "./forgot.reducers";

const rootReducer = combineReducers({
    loginReducer,
    signupReducer,
    forgotReducer,
});

export default rootReducer;
