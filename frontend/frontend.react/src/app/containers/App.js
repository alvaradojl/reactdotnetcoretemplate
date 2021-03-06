import React from "react";
import { render } from "react-dom"; 
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider, connect } from "react-redux";
import Header from "./../components/Header";
import  SignupPage from "./../components/Signup/SignupPage";
import Greetings from   "./../components/Greetings";
import FlashMessagesList from "./../components/Flash/FlashMessagesList";
import { addMessageDispatcher, deleteMessageDispatcher } from "./../actions/MessagesActions";
import LoginPage from "./../components/Login/LoginPage";
import setAuthorizationToken from "./../utils/setAuthorizationToken";
import EventsPage from "./../components/Events/EventsPage";
import Authenticate from "./../utils/Authenticate";


const newHistory = createBrowserHistory();

setAuthorizationToken(localStorage.jwtToken);
 
export class App extends React.Component {
  
    render(){
      
        return(  
            <div className="container">
                <Header/>
                <FlashMessagesList messages={this.props.messages} deleteMessage={deleteMessageDispatcher} />
                <div className="row marketing">

                    <Route exact path="/" component={Greetings}/>   
                    <Route exact path="/home" component={Greetings}/>
                    <Route exact path="/greetings" component={Greetings}/>
                    <Route exact path="/events" component={Authenticate(EventsPage)}/>
                    <Route exact path="/signup" component={SignupPage}/> 
                    <Route exact path="/login" component={LoginPage}/>
                
                </div>
                <footer className="footer">
                    <p>&copy; Jorge Alvarado 2017</p>
                </footer>
            </div>
               
        );
    }
} 

const mapStateToProps = (state)=>{
    return {
        messages:state.messages,
        user:state.user,
        events:state.events
    }
}

export default connect(mapStateToProps)(App);