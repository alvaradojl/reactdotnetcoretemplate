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
import "./images/favicon.ico";
import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import blue from 'material-ui/colors/blue'; 
import pink from 'material-ui/colors/pink';


const newHistory = createBrowserHistory();
 

if(localStorage.jwtToken){
      setAuthorizationToken(localStorage.jwtToken);
      mystore.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

const theme = createMuiTheme({
  palette: createPalette({
    primary: pink,  
    accent: green,
    error: red,
  }),
});

render(
<Provider store={mystore}> 
  <MuiThemeProvider theme={theme}>
     <BrowserRouter history={newHistory}>
            <Route component={App} /> 
      </BrowserRouter>
    </MuiThemeProvider> 
</Provider>, document.getElementById("app"));