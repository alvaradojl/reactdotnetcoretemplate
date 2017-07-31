import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export class FlashMessage extends React.Component{

constructor(props){
    super(props);
    this.onClick= this.onClick.bind(this);
}

onClick(){
    this.props.deleteMessage(this.props.message.id);
}

    render(){
        const { id, type, text } = this.props.message;
        return (
            <div className={classnames("alert",{"alert-success": type === 'success'},{"alert-danger": type === 'error'})}>
                <button onClick={this.onClick} className="close"><span>&times;</span></button>
                {text}
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteMessage: PropTypes.func.isRequired
}

export default FlashMessage;