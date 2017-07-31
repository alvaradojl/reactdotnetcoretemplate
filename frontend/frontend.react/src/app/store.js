import flashMessagesReducer from "./reducers/FlashMessagesReducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger({
  // ...options
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const mystore = createStore(flashMessagesReducer, composeEnhancers(applyMiddleware(thunk,logger)));

export default mystore;