import React  from "react";
import SignupForm from "./SignupForm";
import {connect}  from "react-redux";
import userSignupRequest  from "./../../actions/signupActions";
import PropTypes from "prop-types";

export class SignupPage extends React.Component{

constructor(props){
    super(props);
  //  console.log(this.props);

}

    render(){

        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <SignupForm userSignupRequest={userSignupRequest}/>
                </div>
            </div>
        );
    }
} 
 
// SignupPage.propTypes = {
//     userSignupRequest: PropTypes.func.isRequired
// }

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        userSignupRequest: (userData) => {
            userSignupRequest(userData);
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
//console.log("connectedSignupPage:" + ConnectedSignupPage);
//export default ConnectedSignupPage;