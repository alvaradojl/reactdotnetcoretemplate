import React from "react";
import timezones from "./../../data/timezones";
import map from "lodash/map";
import PropTypes from "prop-types";
import classnames from "classnames"; 
import isEmpty from "lodash/isEmpty";
import Validator from "validator"; 
import mystore from "./../../store.js";
import {connect}  from "react-redux";  
import {register}  from "./../../actions/RegisterActions";
import { Field, reduxForm } from 'redux-form'

class SignupForm extends React.Component{

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

        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.isValid= this.isValid.bind(this);
    }

    validateInput(data){
        let errors = {};

        if(Validator.isEmpty(data.username)){
            errors.username="username is required.";
        }

        if(Validator.isEmpty(data.email)){
            errors.email="email is required.";
        }
        else{ 
            if(!Validator.isEmail(data.email)){
                errors.email="not a valid email.";
            }
        }

        if(Validator.isEmpty(data.password)){
            errors.password="password is required.";
        }

        if(Validator.isEmpty(data.passwordConfirmation)){
            errors.passwordConfirmation="passwordConfirmation is required.";
        }
        else{
            if(!Validator.equals(data.password, data.passwordConfirmation)){
                errors.password="Passwords must match.";
            }
        }

        if(Validator.isEmpty(data.timezone)){
            errors.timezone="timezone is required.";
        }
  

        return { errors, 
            isValid: isEmpty(errors) 
        }
    }

    isValid(values){
        const { errors, isValid } = this.validateInput(values);

        if(!isValid){
            this.setState({errors});
        }

        return isValid;
        //return true;
    }

    onSubmit(values){
        
        console.log("values obtained: " + JSON.stringify(values));
        
        let valuesToValidate={
            username:'',
            email:'',
            password:'',
            passwordConfirmation:'',
            timezone:'',
            ...values
        };
        
        if(this.isValid(valuesToValidate)){
             
            this.setState({errors:{},isLoading:true});
             
            let registrationData = { 
                username:values.username,
                email:values.email,
                password:values.password,
                passwordConfirmation:values.passwordConfirmation,
                timezone:values.timezone
            };
 
            this.props.register(registrationData) 
            .then(response => { 
                console.log("the new user has been registered as: " + JSON.stringify(response.data));


                mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"You have signed in"}});
                this.setState({isLoading:false});
            })
            .catch(result=>{ 
                if(result.response){
                     this.setState({ errors:result.response.data.errors, isLoading:false}); 
                    mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to register."}});
                    console.log(JSON.stringify(result));
                }   
            });
 
        
 
           }
    }

    render(){

    const options = map(timezones, (val,key)=> <option key={val} value={val}>{key}</option>);
 
    const { username, email, password, passwordConfirmation, timezone} = this.state;

    const { handleSubmit } = this.props;

        return(
             <form onSubmit={ handleSubmit(this.onSubmit) }>
                <h1>Sign up</h1> 

 
                <div className="form-group">
                    <label className="control-label">Username</label>

                    <Field name="username" className="form-control" component="input" type="text" />
                    {this.state.errors.username && <span>{this.state.errors.username}</span>}
                </div>

                 <div className="form-group">
                    <label className="control-label">Email</label>
                    
                    <Field name="email" className="form-control" component="input" type="text" />
 
                    {this.state.errors.email && <span>{this.state.errors.email}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    
                   <Field name="password" className="form-control" component="input" type="text" />

                   
                    {this.state.errors.password && <span>{this.state.errors.password}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    
                     <Field name="passwordConfirmation" className="form-control" component="input" type="text" />
 
                     {this.state.errors.passwordConfirmation && <span>{this.state.errors.passwordConfirmation}</span>}
                </div>

               <div className="form-group">
                    <label className="control-label">Timezone</label>
                    
                    <Field name="timezone" className="form-control" component="select" >
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </Field>
  

                     {this.state.errors.timezone && <span>{this.state.errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button type="submit" disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign up</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        messages:state.messages,
        user:state.user
    }
}
 
SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

SignupForm.propTypes = {
    register: PropTypes.func.isRequired
}

SignupForm = connect(mapStateToProps, {register})(SignupForm);

export default reduxForm({
    form:'signup'
})(SignupForm);