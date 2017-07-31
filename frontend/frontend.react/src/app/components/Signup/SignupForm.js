import React from "react";
import timezones from "./../../data/timezones";
import map from "lodash/map";
import PropTypes from "prop-types";
import classnames from "classnames";
import isNullOrWhitespace from "./../../Utilities";
import isEmpty from "lodash/isEmpty";
import Validator from "validator"; 
import mystore from "./../../store.js";

export class SignupForm extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            username:"",
            email:"",
            password:"",
            passwordConfirmation:"",
            timezone:"",
            errors: {},
            success:"",
            isLoading:false
        }

//console.log("props SignupForm: " + this.props.userSignupRequest);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.isValid= this.isValid.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    validateInput(data){
        let errors = [];

        if(Validator.isEmpty(data.username)){
            errors.push("username is required.");
        }

        if(Validator.isEmpty(data.email)){
            errors.push("email is required.");
        }
        else{ 
            if(!Validator.isEmail(data.email)){
                errors.push("not a valid email.");
            }
        }

        if(Validator.isEmpty(data.password)){
            errors.push("password is required.");
        }

        if(Validator.isEmpty(data.passwordConfirmation)){
            errors.push("passwordConfirmation is required.");
        }
        else{
            if(!Validator.equals(data.password, data.passwordConfirmation)){
                errors.push("Passwords must match.");
            }
        }

        if(Validator.isEmpty(data.timezone)){
            errors.push("timezone is required.");
        }
 
     

        //TODO: more validations

        return { errors, 
            isValid: isEmpty(errors) 
        }
    }

    isValid(){
        const { errors, isValid } = this.validateInput(this.state);

        if(!isValid){
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e){
       
        e.preventDefault();

        if(this.isValid()){
             
            this.setState(
                { 
                errors:{},
                isLoading:true
                }
            )
 
            var self = this; //necessary, to call 'this' within the axios callback

            let registrationData = { 
                username:this.state.username,
                email:this.state.email,
                password:this.state.password,
                passwordConfirmation:this.state.passwordConfirmation,
                timezone:this.state.timezone,
                
            };

            this.props.userSignupRequest(registrationData)
            .then(response => { 

                let newState = {
                        username:"", 
                        email:"", 
                        password:"", 
                        passwordConfirmation:"",
                        timezone: "",
                        errors:{},
                        success:"User has been registered.",
                        isLoading:false
                    };

                self.setState(newState);

                //this.context.router.push('/');

              self.props.addMessage({type:"ADD_MESSAGE", text:"You signed up succesfully. Welcome"}); 
            
            }
            ).catch(result=>{ 
                if(result.response){
                    console.log("ended up in catch with error.response: " + JSON.stringify(result.response.data));
                    this.setState({errors:result.response.data.errors, isLoading:false}); 
                }
                
                }
            ); 
            }
    }

    render(){

    const options = map(timezones, (val,key)=> <option key={val} value={val}>{key}</option>);

    const errorsRetrieved = map(this.state.errors, (item, index)=> <li key={index}>{item}</li>);

    const errorMessage = (
        <div className={classnames({"alert alert-danger visible" : this.state.errors.length>0},{"collapsed": this.state.errors.length<=0})}>
            {this.state.errors.length>0 ? <ul>{errorsRetrieved}</ul> : <span/>} 
        </div>
    );

    const successMessage = (
        <div className={classnames({"alert alert-success visible" : this.state.success.length>0}, {"collapsed": this.state.success.length<=0})}>
            <span>{this.state.success}</span>
        </div>
    );
 
        return(
            <form onSubmit={this.onSubmit}>
                <h1>Join our community</h1>
                {errorMessage}
                {successMessage}
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.onChange}/>

                </div>

                 <div className="form-group">
                    <label className="control-label">Email</label>
                    <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>

                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>

                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input type="password" name="passwordConfirmation" className="form-control" value={this.state.passwordConfirmation} onChange={this.onChange}/>

                </div>

               <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select  name="timezone" className="form-control" value={this.state.timezone} onChange={this.onChange}>
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </select>

                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
                </div>
            </form>
        );
    }
}

export default SignupForm;

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired,
    removeMessage: PropTypes.func.isRequired
}
