import React from "react";
import { render } from "react-dom"; 
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider, connect } from "react-redux";
import  "./../components/Home";
import Header from "./../components/Header";
import  SignupPage from "./../components/Signup/SignupPage";
import Greetings from   "./../components/Greetings";
import NoMatch from  "./../components/NoMatch";
import FlashMessagesList from "./../components/Flash/FlashMessagesList";
const newHistory = createBrowserHistory();
 
export default class App extends React.Component {
  
    render(){
      
        return(  
            <div className="container">
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <Header/>
                </div>
            </div>
            <div className="row">
                <FlashMessagesList />
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