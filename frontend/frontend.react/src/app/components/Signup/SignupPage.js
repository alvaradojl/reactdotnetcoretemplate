import React  from "react";
import SignupForm from "./SignupForm";
import {connect}  from "react-redux";
import PropTypes from "prop-types";
import {addMessageDispatcher, removeMessageDispatcher } from "./../../actions/FlashMessagesActions";
import userSignupRequestDispatcher  from "./../../actions/signupActions";

export class SignupPage extends React.Component{

    render(){
 
        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <SignupForm userSignupRequest={this.props.userSignupRequest} addMessage={this.props.addMessage} removeMessage={this.props.removeMessage}  />
                </div>
            </div>
        );
    }
} 
 
SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addMessage : PropTypes.func.isRequired,
    removeMessage : PropTypes.func.isRequired
}
 

const mapStateToProps = (state) =>{
    return {
        messages:state.messages
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{ 
        addMessage: (text) =>{
            dispatch(addMessageDispatcher(text));
        },
        removeMessage: (id) => {
            dispatch(removeMessageDispatcher(id));
        },
        userSignupRequest: (userData) =>{
            dispatch(userSignupRequestDispatcher(userData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);