import React from "react";
import PropTypes from "prop-types"; 

export class Home extends React.Component{

    constructor(props){
        super();
        this.state = { 
            age: props.initialAge, 
            username:props.initialUsername,
            homeLink : props.initialHomeLink
        }; 
    }

    onMakeOlder(){
        this.setState(
            {
                age:this.state.age +3
            }
        );
    }

    onHandleChange(event){
        this.setState(
            {
                homeLink: event.target.value
            }
        );
    }

    onChangeLink(){
        console.log("button clicked");
        this.props.changeLink(this.state.homeLink);
    }

    render(){
        return(
                <div>
                    <p>Home Component</p>
                    <p>Name: {this.state.username}</p>
                    <p>Age: {this.state.age}</p>
                    
                    <button onClick={this.onMakeOlder.bind(this)} className="btn btn-primary">Make me older!</button>
                    <br/>
                    <br/>
                    <button onClick={this.props.greet} className="btn btn-primary">Greet</button>
                    <br/>
                    <br/>
                    <input type="text" value={this.state.homeLink} onChange={(event) => this.onHandleChange(event)}/>
                    <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change link</button>
                </div>
        );
    }

}

Home.propTypes = {
    initialUsername:PropTypes.string,
    initialAge:PropTypes.number,
    greet: PropTypes.func,
    initialHomeLink: PropTypes.string
}