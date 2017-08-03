import { combineReducers } from "redux";
import messagesReducer from "./MessagesReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";

export default combineReducers({
    messages:messagesReducer, 
    auth:authReducer
});