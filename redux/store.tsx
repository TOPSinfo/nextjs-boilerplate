import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

// initial states here
const initalState = {};

// middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// creating store
export const store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;
sagaMiddleware.run(rootSaga);
export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof store.getState>
