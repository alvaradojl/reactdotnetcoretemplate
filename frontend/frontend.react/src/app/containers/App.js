import React from "react";
import { render } from "react-dom"; 
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";


import createBrowserHistory from "history/createBrowserHistory";
import { Provider, connect } from "react-redux";
//import { mystore } from "./store";
//import { setName, setAge } from "./actions/userActions";
//import { addNumber, subtractNumber } from "./actions/mathActions";
//import { mathReducer } from "./reducers/mathReducer";
//import userReducer  from "./reducers/userReducer";
import  routes from "./../routes"
//import { createStore, combineReducers, applyMiddleware} from "redux";


import {Home} from "./../components/Home";
import { User }  from "./../components/User";
import Header from "./../components/Header";
import { SignupPage } from "./../components/SignupPage";
import { Greetings } from "./../components/Greetings";
import { NoMatch } from "./../components/NoMatch";

const newHistory = createBrowserHistory();
 
export class App extends React.Component {
  
    render(){
      
        return(  
            <div className="container">
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <Header/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">  
                    <Route exact path="/" component={Greetings}/>   
                    <Route exact path="/home" component={Greetings}/>
                    <Route exact path="/greetings" component={Greetings}/>
                    <Route exact path="/signup" component={SignupPage}/> 
                </div>
            </div>
        </div>
               
        );
    }
}
 