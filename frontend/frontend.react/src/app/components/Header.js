import React from "react";
import { NavLink, Redirect } from "react-router-dom";

export default class Header extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header"> 
                       <NavLink className="navbar-brand" activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/" exact>Home</NavLink> 
                       <NavLink className="navbar-brand" activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/greetings" exact>Greetings</NavLink> 
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/signup">Sign Up</NavLink></li>
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
};
 