import React from "react";
import timezones from "./../../data/timezones";
import map from "lodash/map";
import PropTypes from "prop-types";
import classnames from "classnames"; 
import isEmpty from "lodash/isEmpty"; 
import mystore from "./../../store.js";
import {connect}  from "react-redux";  
import {register}  from "./../../actions/RegisterActions";
import { Field, reduxForm } from 'redux-form';
import  styleSheet  from "./styleSheet";
import { validateErrorsOnSignupForm, validateWarningsOnSignupForm } from "./signupFormValidations";
import { RenderTextField, RenderAutosuggestion } from "./../MaterialUi/RenderField";
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid'; 
import Button from 'material-ui/Button';  



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

        let self = this;
        
        mystore.dispatch({type:"TOGGLE_LOADING", status: true});
        this.props.register(registrationData) 
        .then(response => { 
            
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"You have signed in"}});
            self.setState({isLoading:false});
            mystore.dispatch({type:"TOGGLE_LOADING", status: false});
            self.context.router.history.push("/login");
        })
        .catch(result => { 
                mystore.dispatch({type:"TOGGLE_LOADING", status: false});
                self.setState({isLoading:false});
                mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to register."}});
            if(result.response){
                self.setState({ errors:result.response.data.errors});  
            }   
        });
      
    }

    render(){

    const options = map(timezones, (val,key)=> <option key={val} value={val}>{key}</option>);
 
    const { errors, username, email, password, passwordConfirmation, timezone, isLoading} = this.state;

    const { handleSubmit, pristine, reset, submitting } = this.props
   
    const { classes } = this.props;

        return(


            <div className={classes.container}>

                <Grid container>
                    <Grid item md={3}>
                    
                    </Grid>
                    <Grid item md={6}>
                        
                    
                        <Typography type="display2" gutterBottom>
                            Sign up
                        </Typography>

                       <form onSubmit={ handleSubmit(this.onSubmit) }>
    
                            <Field
                            name="username"
                            type="text"
                            component={RenderTextField}
                            className={classes.textField}
                            label="Username"
                            placeholder="user1" />
    
                            <br/>
                            <Field
                            name="email"
                            type="text"
                            component={RenderTextField}
                            className={classes.textField}
                            label="Email"
                            placeholder="user1@email.com" />
                            <br/>
                        
                            <Field
                            name="password"
                            type="password"
                            component={RenderTextField}
                            className={classes.textField}
                            label="Password"
                            placeholder="" />
                            <br/>

                             <Field
                            name="passwordConfirmation"
                            type="password"
                            component={RenderTextField}
                            className={classes.textField}
                            label="Password Confirmation"
                            placeholder="" />
                          
                            <br/>
                            <br/>
                            <Field 
                            id="timezone" 
                            name="timezone"   
                            component={RenderAutosuggestion}
                            label="Timezone"  
                            />
                            <br/>

                            <Grid container className={classes.root}>
                                <Grid item md={12}>
                                    <Grid
                                        container 
                                        align="center"
                                        direction="row"
                                        justify="center">


                                       <Button 
                                        type="submit" 
                                        raised 
                                        disabled={pristine || submitting || this.state.isLoading}
                                        color="accent" 
                                        className={classes.button}
                                        style = {{  
                                        width:'100px'    
                                        }}>
                                        Signup
                                        </Button>

                                    </Grid>
                                </Grid>
                            </Grid>

                        
                        </form>

                    </Grid> 
                    <Grid item md={3}>
                        
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

SignupForm = connect(mapStateToProps, {register})(withStyles(styleSheet)(SignupForm));

export default reduxForm({
    form:'signup',
    validate:validateErrorsOnSignupForm,
    warn:validateWarningsOnSignupForm
})(SignupForm);

