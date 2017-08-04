import React from "react";

export default class Greetings extends React.Component{

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Greetings</h1>
                <p className="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, 
                    tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                </p> 
            </div>
        );
    }
}