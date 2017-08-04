import React from "react";
import { render } from "react-dom";
import  App from "./containers/App";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import mystore from "./store";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {setCurrentUser} from "./actions/AuthActions";
import jwtDecode from "jwt-decode"; 
import "./styles/main.scss";

const newHistory = createBrowserHistory();


mystore.subscribe(() =>
  console.log("mystore state callback on subscription:" + JSON.stringify(mystore.getState()))
);

if(localStorage.jwtToken){
      setAuthorizationToken(localStorage.jwtToken);
      mystore.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
<Provider store={mystore}>
      <BrowserRouter history={newHistory}>
            <Route component={App} /> 
      </BrowserRouter>
</Provider>, document.getElementById("app"));