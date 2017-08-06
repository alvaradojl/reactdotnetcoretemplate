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

    isValid(){
        const { errors, isValid } = this.validateInput(this.state);

        if(!isValid){
            this.setState({errors});
        }

        return isValid;
        //return true;
    }

    onSubmit(e){
       
        e.preventDefault();

        if(this.isValid()){
             
            this.setState({errors:{},isLoading:true});
             
            let registrationData = { 
                username:this.state.username,
                email:this.state.email,
                password:this.state.password,
                passwordConfirmation:this.state.passwordConfirmation,
                timezone:this.state.timezone
            };
 
            this.props.register(registrationData) 
            .then(response => { 
                console.log("the new user has been registered as: " + JSON.stringify(response.data));

                this.setState({
                    username:"",
                    email:"",
                    password:"",
                    passwordConfirmation:"",
                    timezone:""
                });

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

        return(
            <form onSubmit={this.onSubmit}>
                <h1>Join our community</h1> 
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input type="text" name="username" className="form-control" value={username || ''} onChange={this.onChange}/>
                    {this.state.errors.username && <span>{this.state.errors.username}</span>}
                </div>

                 <div className="form-group">
                    <label className="control-label">Email</label>
                    <input type="text" name="email" className="form-control" value={email || ''} onChange={this.onChange}/>
                    {this.state.errors.email && <span>{this.state.errors.email}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input type="password" name="password" className="form-control" value={password || ''} onChange={this.onChange}/>
                    {this.state.errors.password && <span>{this.state.errors.password}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input type="password" name="passwordConfirmation" className="form-control" value={passwordConfirmation || ''} onChange={this.onChange}/>
                     {this.state.errors.passwordConfirmation && <span>{this.state.errors.passwordConfirmation}</span>}
                </div>

               <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select  name="timezone" className="form-control" value={timezone || ''} onChange={this.onChange}>
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </select>
                     {this.state.errors.timezone && <span>{this.state.errors.timnezone}</span>}
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

export default connect(mapStateToProps, {register})(SignupForm);