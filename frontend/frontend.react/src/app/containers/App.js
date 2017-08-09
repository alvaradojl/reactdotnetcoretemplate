import React from "react";
import { render } from "react-dom"; 
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider, connect } from "react-redux";
import Header from "./../components/Header/Header";
import  SignupPage from "./../components/Signup/SignupPage";
import Greetings from   "./../components/Greetings/Greetings";
import FlashMessagesList from "./../components/Flash/FlashMessagesList";
import { addMessageDispatcher, deleteMessageDispatcher } from "./../actions/MessagesActions";
import LoginPage from "./../components/Login/LoginPage";
import setAuthorizationToken from "./../utils/setAuthorizationToken";
import EventsPage from "./../components/Events/EventsPage";
import Authenticate from "./../utils/Authenticate";
import Footer from "./../components/Footer/Footer";
import InfinitePage from "./../components/Infinite/InfinitePage";
import TopProgress from "./../components/TopProgress/TopProgress";

const newHistory = createBrowserHistory();

setAuthorizationToken(localStorage.jwtToken);
 
export class App extends React.Component {
  
    render(){
      
        return(  
            <div>
              
                <Header/>
                <TopProgress/>
                <FlashMessagesList messages={this.props.messages} deleteMessage={deleteMessageDispatcher} />
                <div> 
                    <Route exact path="/" component={Greetings}/>   
                    <Route exact path="/home" component={Greetings}/>
                    <Route exact path="/greetings" component={Greetings}/>
                    <Route exact path="/events" component={Authenticate(EventsPage)}/>
                    <Route exact path="/infinite" component={InfinitePage}/>
                    <Route exact path="/signup" component={SignupPage}/> 
                    <Route exact path="/login" component={LoginPage}/> 
                </div>
                 <Footer/>
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