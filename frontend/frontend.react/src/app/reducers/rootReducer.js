import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer"; 
import authReducer from "./authReducer";
import eventsReducer from "./eventsReducer";
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    messages:messagesReducer, 
    auth:authReducer,
    events:eventsReducer,
    form: formReducer
});