import React from "react";
import timezones from "./../../data/timezones";
import map from "lodash/map";
import PropTypes from "prop-types";
import classnames from "classnames";

export default class SignupForm extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            username:"",
            email:"",
            password:"",
            passwordConfirmation:"",
            timezone:"",
            errors: {}
        }
//console.log("props SignupForm: " + this.props.userSignupRequest);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
       // console.log("this.props.userSignupRequest(this.state);");
       this.props.userSignupRequest(this.state).then(function(response){
            console.log(response.data);
            console.log(response.status);
        }).catch(error=>{
            console.log("errors found: " + error.response.data.errors);
            this.setState({errors:error.response.data.errors});
        });


    }

    render(){

    const options = map(timezones, (val,key)=> <option key={val} value={val}>{key}</option>);

        return(
            <form onSubmit={this.onSubmit}>
                <h1>Join our community</h1>
                <div className="help-block">
                   <ul className="help-block">{this.state.errors.map((item)=>{ <li>{item}</li> })}</ul>
                </div>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input type="text" name="username" className="form-control" value={this.state.username} onChange={this.onChange}/>

                </div>

                 <div className="form-group">
                    <label className="control-label">Email</label>
                    <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange}/>

                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>

                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input type="password" name="passwordConfirmation" className="form-control" value={this.state.passwordConfirmation} onChange={this.onChange}/>

                </div>

               <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select  name="timezone" className="form-control" value={this.state.timezone} onChange={this.onChange}>
                        <option value="" disabled>Choose your timezone</option>
                        {options}
                    </select>

                </div>

                
                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Sign up</button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}
