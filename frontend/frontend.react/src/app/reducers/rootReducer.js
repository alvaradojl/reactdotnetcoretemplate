import { combineReducers } from "redux";
import messagesReducer from "./MessagesReducer";
import userReducer from "./userReducer";

export default combineReducers({
    messages:messagesReducer,
    user:userReducer
});