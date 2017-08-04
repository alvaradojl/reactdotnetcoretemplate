import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; 
import mystore from "./../store";
import { addMessageDispatcher } from "./../actions/MessagesActions";

export default function(ComposedComponent){
    class Authenticate extends React.Component{

        componentWillMount(){
            if(!this.props.isAuthenticated){
                mystore.dispatch(addMessageDispatcher({type:"error", text:"You need to login to access this page"}));
                this.context.router.history.push("/login");
            }   
        } 

        render(){
            return (
                <ComposedComponent {...this.props}/>
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired 
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    function mapStateToProps(state){
        return{
            isAuthenticated:state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps)(Authenticate);
}