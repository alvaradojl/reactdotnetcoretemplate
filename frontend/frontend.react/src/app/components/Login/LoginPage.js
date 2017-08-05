import React from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";

export class LoginPage extends React.Component{
    render(){
        return(
            <div className="col-md-12" >
                <LoginForm/>
            </div>  
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        messages:state.messages, 
        auth:state.auth
    }
}

export default connect(mapStateToProps)(LoginPage);