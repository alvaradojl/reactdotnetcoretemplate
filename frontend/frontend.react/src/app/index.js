import React from "react";
import { render } from "react-dom";
import { App } from "./containers/App";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
const newHistory = createBrowserHistory();
//import { routes } from "./routes";
import { SignupPage } from "./components/SignupPage";
import { Greetings } from "./components/Greetings";


render(
<BrowserRouter history={newHistory}>
 
      <Route component={App} /> 
   
</BrowserRouter>, document.getElementById("app"));