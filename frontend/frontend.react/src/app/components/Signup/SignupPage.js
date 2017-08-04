import React  from "react";
import SignupForm from "./SignupForm";


export class SignupPage extends React.Component{

    render(){
 
        return(
        <div className="col-md-12" >
            <SignupForm/>
        </div> 
        );
    }
} 
 


export default SignupPage;