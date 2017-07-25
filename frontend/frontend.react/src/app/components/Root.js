import React from "react";
import {Home} from "./Home";
import { User }  from "./User";
import { Header } from "./Header";
import { BrowserRouter, Router, Route, Switch, withRouter } from "react-router-dom";

import createBrowserHistory from "history/createBrowserHistory";
const newHistory = createBrowserHistory();

export class Root extends React.Component{


    onGreet(){
        alert("Hello");
    }

    onChangeLink(newName){
        this.setState(
            {
                homeLink:newName
            }
        );
    }
 

    render(){
        return(
        <div className="container">
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <Header homeLink="Home"/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <BrowserRouter>
                        <Switch>     
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route path="/user/:id" component={User} />
                            <Route path="/user" component={User} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </div>
        );
    }
  
}