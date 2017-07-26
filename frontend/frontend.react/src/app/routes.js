import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

import { App } from "./containers/App";
import { SignupPage} from "./components/SignupPage.js";

export default (
    <Switch>
        <Route component={App} /> 
    </Switch> 
)