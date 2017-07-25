import React from "react";
import { Link } from "react-router-dom";

export class Header extends React.Component {


render(){
    return(
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><Link to="/home/">Home</Link></li>
                        <li><Link to="/user/">User</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

}