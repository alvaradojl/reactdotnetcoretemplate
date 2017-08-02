import React  from "react";
import SignupForm from "./SignupForm";


export class SignupPage extends React.Component{

    render(){
 
        return(
            <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <SignupForm/>
                </div>
            </div>
        );
    }
} 
 


export default SignupPage;