import React from "react";
import { render } from "react-dom";
import  App from "./containers/App";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from "react-redux";
import mystore from "./store";
const newHistory = createBrowserHistory();


mystore.subscribe(() =>
  console.log("mystore state callback on subscription:" + JSON.stringify(mystore.getState()))
);

render(
<Provider store={mystore}>
      <BrowserRouter history={newHistory}>
            <Route component={App} /> 
      </BrowserRouter>
</Provider>, document.getElementById("app"));