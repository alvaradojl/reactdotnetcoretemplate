import React from "react";
import { render } from "react-dom";
import  App from "./containers/App";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import tempReducer from "./reducers/tempReducer";
//import mystore from "./store";
const newHistory = createBrowserHistory();

const logger = createLogger({
  // ...options
});


// const mystore = createStore(
//     (state={})=> state,
//     applyMiddleware(logger,thunk)
// );

 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mystore = createStore(tempReducer, composeEnhancers(applyMiddleware(thunk,logger)));

render(
<Provider store={mystore}>
      <BrowserRouter history={newHistory}>
            <Route component={App} /> 
      </BrowserRouter>
</Provider>, document.getElementById("app"));