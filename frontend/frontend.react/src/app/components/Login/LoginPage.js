import React from "react";
import LoginForm from "./LoginForm";

export class LoginPage extends React.Component{
    render(){
        return(
            <div className="col-md-12" >
                <LoginForm/>
            </div>  
        );
    }
}

export default LoginPage;