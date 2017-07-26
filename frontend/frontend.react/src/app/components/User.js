import React from "react";
import { isNullOrWhitespace } from "../utilities";
import { Router, withRouter, Link, NavLink, Redirect, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
const newHistory = createBrowserHistory();


export class User extends React.Component 
{
 
constructor(props){
    super();
}

 displayNoUserMessage() {
    return(
        <span>No User specified</span>
    );
}

displayUserId(id) {
    return(
        <span>UserID: {id}</span>
    );
}

navigateHome() {
    console.log("going home");
    this.props.history.push("/home");
}
 
render(){ 
        return(
            <div>
                <h3>The User Page</h3>
               {(isNullOrWhitespace(this.props.match.params.id)) ? this.displayNoUserMessage() : this.displayUserId(this.props.match.params.id)}
                <br/>
                <br/>
                <button onClick={this.navigateHome.bind(this)} className="btn btn-primary">Go Home</button>
            </div>
        );
}
}