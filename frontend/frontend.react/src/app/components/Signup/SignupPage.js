import React  from "react";
import SignupForm from "./SignupForm";
import {connect}  from "react-redux";
import userSignupRequest  from "./../../actions/signupActions";
import PropTypes from "prop-types";
import addMessage from "./../../actions/tempActions";

export class SignupPage extends React.Component{

constructor(props){
    super(props);
  //  console.log(this.props);

}

    render(){

      

        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <SignupForm userSignupRequest={userSignupRequest} addMessage={addMessage} />
                </div>
            </div>
        );
    }
} 
 
SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addMessage : PropTypes.func.isRequired
}

const mapStateToProps = (state) =>{
    return {
        id: state.id,
        type: state.type,
        text:state.text
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        userSignupRequest: (userData) => {
            userSignupRequest(userData);
        },
        addMessage: (message) =>{
            addMessage(message);
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
//console.log("connectedSignupPage:" + ConnectedSignupPage);
//export default ConnectedSignupPage;