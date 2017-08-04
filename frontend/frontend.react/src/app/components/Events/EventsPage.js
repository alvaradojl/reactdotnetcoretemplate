import React from "react";
import EventsForm from "./EventsForm";

export class EventsPage extends React.Component{
    render(){
        return(
             <div className="row">
                <div className="col-md-6 col-md-offset-2">
                    <EventsForm/>
                </div>
            </div>
          
        );
    }
}

export default EventsPage;