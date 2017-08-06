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
  if (values.password && values.password.length<4) {
    warnings.password = 'Password to short'
  }
  return warnings
}


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


class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            isLoading:false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    
onSubmit(values){
   
    this.setState({errors:{}, isLoading:true});
    
    let loginData = {
        identifier : values.identifier,
        password : values.password
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

onChange(e){
    this.setState({[e.target.name]: e.target.value});
}

    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props
        const {errors, identifier, password, isLoading} = this.state;
       
        
        return(
        
            <form onSubmit={ handleSubmit(this.onSubmit) }>
                <h1>Login</h1>
                  
                <Field
                    name="identifier"
                    type="text"
                    component={renderField}
                    label="Username/Email"
                    placeholder="email@email.com" />

                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Password" />
 
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>Login</button>
                    <button type="button" className="btn btn-default btn-lg" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </button>
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

LoginForm = connect(mapStateToProps, {login, setCurrentUser})(LoginForm);

export default reduxForm({
    form:'login',
    validate:validateErrorsOnLoginForm,
    warn:validateWarningsOnLoginForm
})(LoginForm);
 