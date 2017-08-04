import React from "react";
import EventsForm from "./EventsForm";

export class EventsPage extends React.Component{
    render(){
        return(
            <div className="col-md-12" >
               <EventsForm/>
            </div>
        );
    }
}

export default EventsPage;