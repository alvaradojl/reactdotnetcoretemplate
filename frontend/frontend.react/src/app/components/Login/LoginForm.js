import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, setCurrentUser } from "./../../actions/AuthActions";
import mystore from "./../../store";
import jwtDecode from "jwt-decode";
import setAuthorizationToken from "./../../utils/setAuthorizationToken";
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


export class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            identifier:"",
            password:"",
            errors:{},
            isLoading:false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

onSubmit(e){
    e.preventDefault();
    this.setState({errors:{}, isLoading:true});
    
    let loginData = {
        identifier : this.state.identifier,
        password : this.state.password
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
 
    }
    )
    .catch(result=>{ 
        if(result.response){
            this.setState({ isLoading:false}); 
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to log in."}});
            console.log(JSON.stringify(result));
              mystore.dispatch({type:"TOGGLE_LOADING", status: false});
        }   
    });



}

onChange(e){
    this.setState({[e.target.name]: e.target.value});
}

    render(){
const { classes } = this.props;

const {errors, identifier, password, isLoading} = this.state;

        return(
            <div className={classes.container}>

            <Grid container gutter={24}>
                <Grid item md={3}>
                  
                </Grid>
                <Grid item md={6}> 
                     <Typography type="display2" gutterBottom>
                        Login
                    </Typography>
                     <form onSubmit={this.onSubmit}>
             
                       
                        <TextField
                            required
                            id="identifier"
                            name="identifier"
                            label="Username/Email"
                            className={classes.textField}
                            value={this.state.identifier} 
                            onChange={this.onChange} 
                            margin="normal"
                            helperText="username or email to login"
                            InputProps={{ placeholder: 'email@email.com' }}
                            fullWidth
                        />
                        <br/>
                    
                        <TextField
                        id="password"
                        name="password"
                        label="Password"
                        className={classes.textField}
                         value={this.state.password} 
                            onChange={this.onChange} 
                        type="password" 
                        margin="normal"
                        helperText="password for login"
                        fullWidth
                        />
                        <br/>

                        <br/>
                        <Button type="submit" disabled={this.state.isLoading}  color="accent" className={classes.button}>Login</Button>
                    
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

export default connect(mapStateToProps, {login, setCurrentUser})(withStyles(styleSheet)(LoginForm));
 