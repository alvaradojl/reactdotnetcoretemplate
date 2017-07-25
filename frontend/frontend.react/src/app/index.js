import React from "react";
import { render } from "react-dom"; 
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { Root } from "./components/Root";
// import createBrowserHistory from "history/createBrowserHistory";

// const newHistory = createBrowserHistory();
  
export class App extends React.Component {
 
    render(){
        return( 
            <BrowserRouter>
                <Switch>    
                    <Route path="/" component={Root} /> 
                </Switch>
            </BrowserRouter> 
        );
    }
}

render(<App />,
    window.document.getElementById("app")
);