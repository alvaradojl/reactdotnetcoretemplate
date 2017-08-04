import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "./../actions/AuthActions";

export class Header extends React.Component{

    logout(e){
        e.preventDefault();
        this.props.logout();
        this.context.router.history.push("/"); 
    }

    render(){

        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><NavLink className="navbar-brand" activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/events" exact>Events</NavLink> </li>
                <li><a className="navbar-brand" onClick={this.logout.bind(this)}  href="/logout">Log out</a></li> 
            
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                    <li><NavLink activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/signup">Sign Up</NavLink></li>
                    <li><NavLink activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/login">Login</NavLink></li>
            </ul>
        );

        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header"> 
                      <NavLink className="navbar-brand" activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/" exact>Home</NavLink>  
                        <NavLink className="navbar-brand" activeStyle={{fontWeight: 'bold', color: 'red'}}  to="/greetings" exact>Greetings</NavLink> 
                  </div>
                    <div className="collapse navbar-collapse">
                       { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    auth:PropTypes.object.isRequired,
    logout : PropTypes.func.isRequired
}

Header.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state){
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(Header);