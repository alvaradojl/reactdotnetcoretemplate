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
           <ul className="nav nav-pills float-right">
                <li className="nav-item"><NavLink className="nav-link" activeStyle={{fontWeight: 'bold', color: 'yellow'}}  to="/events" exact>Events</NavLink> </li>
                <li className="nav-item"><a className="nav-link" onClick={this.logout.bind(this)}  href="/logout">Log out</a></li> 
            
            </ul>
        );

        const guestLinks = (
            <ul className="nav nav-pills float-right">
                   <li className="nav-item"><NavLink className="nav-link" activeStyle={{fontWeight: 'bold', color: 'yellow'}}  to="/signup">Sign Up</NavLink></li>
                   <li className="nav-item"><NavLink className="nav-link" activeStyle={{fontWeight: 'bold', color: 'yellow'}}  to="/login">Login</NavLink></li>
            </ul>
        );

        return(
            <div className="row">
                <div className="header col-md-6">
                    <nav>
                        <ul className="nav nav-pills">
                            <li className="nav-item"><NavLink className="nav-link" activeStyle={{fontWeight: 'bold', color: 'yellow'}}  to="/" exact>Home</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" activeStyle={{fontWeight: 'bold', color: 'yellow'}}  to="/greetings" exact>Greetings</NavLink></li>
                        
                        </ul> 
                    </nav>
                </div>
                <div className="header col-md-6">
                    <nav>
                     { isAuthenticated ? userLinks : guestLinks }
                    </nav>
                </div>
                <h3 className="text-muted">React App</h3>
            </div>
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