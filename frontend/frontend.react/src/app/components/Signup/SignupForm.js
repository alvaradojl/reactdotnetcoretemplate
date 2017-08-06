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
import { Field, reduxForm } from 'redux-form';


 const validateErrorsOnLoginForm = (values) => {
    let errors = {};

    if(!values.username){
        errors.username="username is required.";
    }

      if(!values.email){
        errors.email="email is required.";
    }

    if(!values.password){
        errors.password="password is required.";
    }
 
    if(!values.passwordConfirmation){
        errors.passwordConfirmation="passwordConfirmation is required.";
    }
    else{
        if(!Validator.equals(values.password, values.passwordConfirmation)){
            errors.passwordConfirmation="Passwords must match.";
        }
    }

    if(!values.timezone){
        errors.timezone="timezone is required.";
    }

    return errors;
};

const validateWarningsOnLoginForm = values => {
  const warnings = {}
  if (values.password && values.password.length<4) {
    warnings.password = 'Password to short'
  }
  return warnings
};

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) =>{
    return (
        <div className="form-group">
            <label>{label}</label>
            <div>
                <input className="form-control" placeholder={placeholder && placeholder} {...input} type={type} />
                {touched &&  
                ((error &&  <span className="text-danger">  {error}  </span>) || 
                (warning && <span className="text-warning"> {warning}  </span>))}
            </div>
        </div>
    );
}

class SignupForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {  
            errors: {}, 
            isLoading:false
        }
        this.onSubmit=this.onSubmit.bind(this);
 
    }
 

    onSubmit(values){
        
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
                this.context.router.history.push("/login");
            })
            .catch(result=>{ 
                if(result.response){
                     this.setState({ errors:result.response.data.errors, isLoading:false}); 
                    mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to register."}});
                    console.log(JSON.stringify(result));
                      this.setState({isLoading:false});
                }   
            });
      
    }

    render(){

    const options = map(timezones, (val,key)=> <option key={val} value={val}>{key}</option>);
 
    const { errors, username, email, password, passwordConfirmation, timezone, isLoading} = this.state;

    const { handleSubmit, pristine, reset, submitting } = this.props
   

        return(
             <form onSubmit={ handleSubmit(this.onSubmit) }>
                <h1>Sign up</h1> 

                    <Field
                    name="username"
                    type="text"
                    component={renderField}
                    label="Username"
                    placeholder="user1" />

                    <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label="Email"
                    placeholder="email@email.com" />

                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Password" />

                <Field
                    name="passwordConfirmation"
                    type="passwordConfirmation"
                    component={renderField}
                    label="Password Confirmation" />

               <div className="form-group">
                    <label className="control-label">Timezone</label>
                    
                    <Field name="timezone" className="form-control" component="select" >
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </Field>
  

                     {this.state.errors.timezone && <span>{this.state.errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>Submit</button>
                    <button type="button" className="btn btn-default btn-lg" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </button>
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
    form:'signup',
    validate:validateErrorsOnLoginForm,
    warn:validateWarningsOnLoginForm
})(SignupForm);