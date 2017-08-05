import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer"; 
import authReducer from "./authReducer";
import eventsReducer from "./eventsReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
    messages:messagesReducer, 
    auth:authReducer,
    events:eventsReducer,
    isLoading:loadingReducer
});