import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

// initial states here
const initalState = {};
const persistConfig = {
    key: "root",
    storage, // This is the storage engine you imported earlier
    // Optionally, you can blacklist or whitelist specific reducers
    // blacklist: ["reducerToExclude"],
    // whitelist: ["reducerToPersist"],
  };
// middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating store
 const store = createStore(
    persistedReducer, 
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);
export { store, persistor };

// assigning store to next wrapper
const makeStore = () => store;
sagaMiddleware.run(rootSaga);
export const wrapper = createWrapper(makeStore);
export type RootState = ReturnType<typeof store.getState>
