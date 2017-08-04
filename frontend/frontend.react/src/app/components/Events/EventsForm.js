import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEvent } from "./../../actions/EventsActions";
import mystore from "./../../store"; 

export class EventsForm extends React.Component{
      constructor(props){
        super(props);
        this.state = {
            description:"", 
            errors:{},
            isLoading:false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({errors:{}, isLoading:true});
        
        let newEvent = {
            description : this.state.description, 
        }

     

        mystore.dispatch(addEvent(newEvent))
        .then((response) =>{
            console.log(JSON.stringify(response.data));
            mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"success", text:"A new event has been added"}});
            this.setState({errors:{}, isLoading:false}); 
        }).catch(
            (result) =>{
                if(result.response.status==401){
                mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"Please login "}});

                    this.context.router.history.push("/login");
                }
                else{
                    this.setState({errors:{}, isLoading:false}); 
                    mystore.dispatch({type:"ADD_MESSAGE", message:{ type:"error", text:"An error ocurred while attempting to create an event."}});
                    console.log(JSON.stringify(result));
                }
               
            }
        );
 
    }

    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


    render(){

        const { description, isLoading }  = this.state;

        return(
               <form onSubmit={this.onSubmit}>
                <h1>New Event</h1>
                    <div className="form-group">
                    <label className="control-label">Description</label>
                    <input type="text" name="description" className="form-control" value={description} onChange={this.onChange}/>

                </div>
 

                <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Add</button></div>
            </form>
        );
    }
}
 
EventsForm.contextTypes = {
    router : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>{
    return {
        messages:state.messages, 
        events:state.events
    }
}

export default connect(mapStateToProps, {})(EventsForm);