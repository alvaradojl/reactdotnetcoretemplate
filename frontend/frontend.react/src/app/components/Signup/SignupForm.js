import React from "react";
//import timezones from "./../../data/timezones";
import map from "lodash/map";
import PropTypes from "prop-types";
import classnames from "classnames"; 
import isEmpty from "lodash/isEmpty";
import Validator from "validator"; 
import mystore from "./../../store.js";
import {connect}  from "react-redux";  
import {register}  from "./../../actions/RegisterActions";
import TextField from 'material-ui/TextField';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button'; 
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import IntegrationAutosuggest from "./../TimezoneSuggestion/TimezoneSuggestion";
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styleSheet = createStyleSheet(theme => ({
  container: {
     flexGrow: 1,
      marginTop: 30,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  } 
}));


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
        // const { errors, isValid } = this.validateInput(this.state);

        // if(!isValid){
        //     this.setState({errors});
        // }

        // return isValid;
        return true;
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
                    this.setState({ isLoading:false}); 
                    mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to register."}});
                    console.log(JSON.stringify(result));
                }   
            });
  
        }
    }

    render(){

        const errorsRetrieved = map(this.state.errors, (item, index)=> <li key={index}>{item}</li>);

        const { classes } = this.props;

        return(

            <div className={classes.container}>

            <Grid container gutter={24}>
                <Grid item md={3}>
                  
                </Grid>
                <Grid item md={6}>
                   
                     <Typography type="display2" gutterBottom>
                        Join our community
                    </Typography>

                    <form onSubmit={this.onSubmit}  >

 
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username"
                            className={classes.textField}
                            value={this.state.username} 
                            onChange={this.onChange} 
                            margin="normal"
                            helperText="username for login"
                            fullWidth
                        />
                        <br/>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email} 
                            onChange={this.onChange} 
                            margin="normal"
                            helperText="email to confirm"
                            InputProps={{ placeholder: 'email@email.com' }}
                            fullWidth
                        />
                        <br/>
                    
                        <TextField
                        id="password"
                        name="password"
                        label="Password"
                        className={classes.textField}
                            onChange={this.onChange} 
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        helperText="password for login"
                        fullWidth
                        />
                        <br/>
                        <TextField
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        label="PasswordConfirmation"
                            onChange={this.onChange} 
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        helperText="password for double checking"
                        fullWidth={true}
                        />
                        <br/>
                        <br/>
                        <IntegrationAutosuggest id="timezone" name="timezone"     onChange={this.onChange} />
                        <br/>
                        <Button disabled={this.state.isLoading}  color="accent" className={classes.button}>Sign up</Button>
                    
                
                    </form>

                </Grid> 
                <Grid item xs={3}>
                     
                </Grid>
                
            </Grid> 
      </div>
 
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
    register: PropTypes.func.isRequired,
      classes: PropTypes.object.isRequired
}

 
export default connect(mapStateToProps, {register})(withStyles(styleSheet)(SignupForm));


