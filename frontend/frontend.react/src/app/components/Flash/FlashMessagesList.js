import React from "react";
import PropTypes from "prop-types";
import FlashMessage from "./FlashMessage";
import { connect } from "react-redux";
import map from "lodash/map";
import {deleteMessageDispatcher } from "./../../actions/FlashMessagesActions";

export class FlashMessagesList extends React.Component{
    render(){ 
            const messages = map(this.props.messages, (message, index) => 
            <FlasMessage key={message.id} message={message} deleteMessage={this.props.deleteMessage} />
        );

        return (
            <div>{messages}</div>
        );
    }
}

FlashMessagesList.propTypes = {
    messages:PropTypes.array.isRequired,
    deleteMessage : PropTypes.func.isRequired
}

const mapStateToProps = (state) =>{
    return {
        messages:state.messages
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{ 
        addMessage: (text) =>{
            dispatch(addMessageDispatcher(text));
        },
        removeMessage: (id) => {
            dispatch(removeMessageDispatcher(id));
        }
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FlashMessagesList);