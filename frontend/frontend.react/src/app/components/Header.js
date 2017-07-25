import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {

    return(
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><NavLink activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/home/">Home</NavLink></li>
                        <li><NavLink activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/user/">User</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}