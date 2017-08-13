import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, setCurrentUser } from "./../../actions/AuthActions";
import mystore from "./../../store";
import jwtDecode from "jwt-decode";
import setAuthorizationToken from "./../../utils/setAuthorizationToken";
import Validator from "validator"; 
import isEmpty from "lodash/isEmpty";
import { Field, reduxForm } from 'redux-form'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid'; 
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';  
import styleSheet from "./styleSheet";
import { validateErrorsOnLoginForm, validateWarningsOnLoginForm } from "./loginFormValidations";
import { RenderTextField } from "./../MaterialUi/RenderField";


class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            isLoading:false
        };
       this.onSubmit=this.onSubmit.bind(this);
    }

    
onSubmit(values){
   
    this.setState({errors:{}, isLoading:true});
    
    let loginData = {
        identifier : values.identifier,
        password : values.password
    }
    
    mystore.dispatch({type:"TOGGLE_LOADING", status: true});

    let self = this;
    
    this.props.login(loginData)
    .then(response => { 
        let token = response.data.jwt;
        localStorage.setItem("jwtToken", token);
        mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"You have logged in"}});
        mystore.dispatch({type:"TOGGLE_LOADING", status: false});
        mystore.dispatch(setCurrentUser(jwtDecode(token)));
        self.setState({errors:{}, isLoading:false});
        setAuthorizationToken(token);
        self.context.router.history.push("/events"); 

    }).catch(function(result){ 
            mystore.dispatch({type:"TOGGLE_LOADING", status: false}); 
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to log in."}});
             self.setState({errors:{}, isLoading:false});
        if(result.response){ 
            self.setState({ errors:result.response.data.errors, isLoading:false}); 
        }   
    });
}

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props
        const {errors, identifier, password, isLoading} = this.state;
        const { classes } = this.props;
        
        return( 
       

                <Grid container className={classes.container}>
                <Grid item md={3}>

                </Grid>
                <Grid item md={6}> 
                    <Typography type="display2" gutterBottom>
                        Login
                    </Typography>

                    <form onSubmit={ handleSubmit(this.onSubmit) }>
                    

                        <Field
                        name="identifier"
                        type="text"
                        component={RenderTextField}
                        className={classes.textField}
                        label="Username/Email"
                        placeholder="email@email.com" />

                        <br/>
                        <br/>

                        <Field
                        name="password"
                        type="password"
                        className={classes.textField}
                        component={RenderTextField}
                        label="Password"
                        placeholder=""  />
                        <br/>
                        <br/>



                        <Grid container className={classes.root}>
                            <Grid item md={12}>
                                <Grid
                                container
                                className={classes.demo}
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
                                    Login
                                    </Button>


                                </Grid>
                            </Grid>
                        </Grid>
                    </form> 
                        
                 
                </Grid>
                <Grid item md={3}>
                  
                </Grid>
            </Grid>
    
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

LoginForm.contextTypes = {
    router : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {
        messages:state.messages, 
        auth:state.auth,
        isLoading:state.isLoading
    }
}

LoginForm = connect(mapStateToProps, {login, setCurrentUser})(withStyles(styleSheet)(LoginForm));

export default reduxForm({
    form:'login',
    validate:validateErrorsOnLoginForm,
    warn:validateWarningsOnLoginForm
})(LoginForm);
 