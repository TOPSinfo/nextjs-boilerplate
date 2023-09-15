import { combineReducers } from "redux";
import loginReducer from "./login.reducers";
import signupReducer from "./signup.reducers";

const rootReducer = combineReducers({ loginReducer, signupReducer });

export default rootReducer;
