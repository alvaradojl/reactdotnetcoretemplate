import shortid from "shortid";
import findIndex from "lodash/findIndex";

export function messagesReducer (state = [], action){ 
  
switch(action.type){

    case "ADD_MESSAGE":
        return [ 
                ...state,{
                    id:shortid.generate(),
                    type:action.message.type,
                    text:action.message.text}
            ];
        
    case "DELETE_MESSAGE":
    const index = findIndex(state, {id: action.id});
    if(index >=0){
        return [
            ...state.slice(0,index),
            ...state.slice(index+1)
        ];
    }
    return state;
    
    default:
        return state
 
}

}

export default messagesReducer;
 