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
import TextField from 'material-ui/TextField';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';  


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


 const validateErrorsOnLoginForm = (values) => {
    let errors = {};

    if(!values.identifier){
        errors.identifier="identifier is required.";
    }

    if(!values.password){
        errors.password="password is required.";
    }

    return errors;
}

const validateWarningsOnLoginForm = values => {
  const warnings = {}
  if (values.password && values.password.length<3) {
    warnings.password = 'Password to short'
  }
  return warnings
}


const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning },
 ...custom
}) =>{
    return (
 



                    //  <TextField
                    //         required
                    //         id="identifier"
                    //         name="identifier"
                    //         label={label}
                    //         className={classes.textField}
                    //         value={this.state.identifier} 
                    //         onChange={this.onChange} 
                    //         margin="normal" 
                    //         InputProps={{ placeholder: {placeholder} }}
                    //         fullWidth
                    //         helperText={this.state.errors.identifier}
                    //         error={!isEmpty(this.state.errors.identifier)}
                    //     />
            <div>
                   <TextField  
                    {...input} 
                    {...custom}
                    label={label}  
                    margin="normal"   
                    type={type}
                    InputProps={{ placeholder }} 
                    helperText={error && touched && error} 
                    fullWidth /> 

                    {touched &&   
                    (warning && <span className="text-warning"> {warning}  </span>)}
            </div>
    );
}


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
    
    this.props.login(loginData)
    .then(response => { 
        let token = response.data.jwt;
        console.log("the jwt token received is: " + token);
        localStorage.setItem("jwtToken", token);
        console.log("decoded jwt: " + JSON.stringify(jwtDecode(token)));
    
        mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"You have logged in"}});
        mystore.dispatch({type:"TOGGLE_LOADING", status: false});
        mystore.dispatch(setCurrentUser(jwtDecode(token)));
        this.setState({errors:{}, isLoading:false});
        setAuthorizationToken(token);
        this.context.router.history.push("/events"); 

    }).catch(result=>{ 
        if(result.response){
            mystore.dispatch({type:"TOGGLE_LOADING", status: false});
            this.setState({ errors:result.response.data.errors, isLoading:false}); 
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to log in."}});
            console.log(JSON.stringify(result));
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


            <div className={classes.container}>

                <Grid container >
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
                            component={renderField}
                            className={classes.textField}
                            label="Username/Email"
                            placeholder="email@email.com" />
                        <br/>
                        <br/>
                        <Field
                            name="password"
                            type="password"
                            className={classes.textField}
                            component={renderField}
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
       </div>

        
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
 