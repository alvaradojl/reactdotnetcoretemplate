import React  from "react";
import SignupForm from "./SignupForm";
import {connect}  from "react-redux";
import PropTypes from "prop-types";
import {addMessageDispatcher } from "./../../actions/MessagesActions";
import {registerUserDispatcher}  from "./../../actions/UserActions";

export class SignupPage extends React.Component{

    render(){
 
        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <SignupForm 
                    registerUser={this.props.registerUser} 
                    addMessage={this.props.addMessage}
                    user={this.props.user}
                      />
                </div>
            </div>
        );
    }
} 
 
SignupPage.propTypes = {
    registerUser: PropTypes.func.isRequired,
    addMessage : PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
 

const mapStateToProps = (state) =>{
    return {
        messages:state.messages,
        user:state.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{ 
        addMessage: (text) =>{
            dispatch(addMessageDispatcher(text));
        },
   
        registerUser: (userData) =>{
            dispatch(registerUserDispatcher(userData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);