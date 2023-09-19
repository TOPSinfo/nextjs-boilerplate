import { combineReducers } from "redux";
import loginReducer from "./login.reducers";
import signupReducer from "./signup.reducers";
import forgotReducer from "./forgot.reducers";
import resetReducer from "./reset.reducers";

const rootReducer = combineReducers({
    loginReducer,
    signupReducer,
    forgotReducer,
    resetReducer,
});

export default rootReducer;
