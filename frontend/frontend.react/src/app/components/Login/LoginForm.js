import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "./../../actions/LoginActions";
import mystore from "./../../store";

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
    
    this.props.login(loginData)
    .then(response => { 
        console.log("the jwt token received is: " + response.data.jwt);
          mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"You have logged in"}});

    }
    )
    .catch(result=>{ 
        if(result.response){
            console.log("ended up in catch with error.response: " + JSON.stringify(result.response.data));
            this.setState({ isLoading:false });
        }   
    });

  this.setState({errors:{}, isLoading:false});

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
                    <input type="text" name="identifier" className="form-control" value={identifier} onChange={this.onChange}/>

                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>

                </div>

                <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router : PropTypes.object.isRequired
}

export default connect(null, {login})(LoginForm);