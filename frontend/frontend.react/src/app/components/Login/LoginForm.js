import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, setCurrentUser } from "./../../actions/AuthActions";
import mystore from "./../../store";
import jwtDecode from "jwt-decode";
import setAuthorizationToken from "./../../utils/setAuthorizationToken";
import Validator from "validator"; 
import isEmpty from "lodash/isEmpty";

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

validateInput(data){
        let errors = {};

        if(Validator.isEmpty(data.identifier)){
            errors.identifier="identifier is required.";
        }
 
        if(Validator.isEmpty(data.password)){
            errors.password="password is required.";
        }
 
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
        
   this.setState({errors:{}, isLoading:true});
    
    let loginData = {
        identifier : this.state.identifier,
        password : this.state.password
    }
    
    this.props.login(loginData)
    .then(response => { 
        let token = response.data.jwt;
        console.log("the jwt token received is: " + token);
        localStorage.setItem("jwtToken", token);
        console.log("decoded jwt: " + JSON.stringify(jwtDecode(token)));
       
        mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"You have logged in"}});
 
        mystore.dispatch(setCurrentUser(jwtDecode(token)));
          this.setState({errors:{}, isLoading:false});
        setAuthorizationToken(token);
        this.context.router.history.push("/"); 
 
    }
    )
    .catch(result=>{ 
        if(result.response){
            this.setState({ errors:result.response.data.errors, isLoading:false}); 
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to log in."}});
            console.log(JSON.stringify(result));
        }   
    });

        }
  
}

onChange(e){
    this.setState({[e.target.name]: e.target.value});
}

    render(){

const {errors, identifier, password, isLoading} = this.state;

        return(
        
        <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                    <div className="form-group">
                    <label className="control-label">Username/Email</label>
                    <input type="text" name="identifier" className="form-control" value={identifier || ''} onChange={this.onChange}/>
                    {this.state.errors.identifier && <span>{this.state.errors.identifier}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input type="password" name="password" className="form-control" value={password || ''} onChange={this.onChange}/>
                    {this.state.errors.password && <span>{this.state.errors.password}</span>}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {
        messages:state.messages, 
        auth:state.auth
    }
}

export default connect(mapStateToProps, {login, setCurrentUser})(LoginForm);