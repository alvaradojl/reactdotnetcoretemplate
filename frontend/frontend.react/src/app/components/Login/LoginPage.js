import React from "react";
import LoginForm from "./LoginForm";

export class LoginPage extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

export default LoginPage;