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
import "./styles/styles.scss";
import "./images/favicon.ico";
import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import {themePalette} from "./styles/MaterialUi/themePalette";

const newHistory = createBrowserHistory();
 

if(localStorage.jwtToken){
      setAuthorizationToken(localStorage.jwtToken);
      mystore.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

const theme = createMuiTheme({
  palette: themePalette
});

render(
<Provider store={mystore}> 
  <MuiThemeProvider theme={theme}>
     <BrowserRouter history={newHistory}>
            <Route component={App} /> 
      </BrowserRouter>
    </MuiThemeProvider> 
</Provider>, document.getElementById("app"));