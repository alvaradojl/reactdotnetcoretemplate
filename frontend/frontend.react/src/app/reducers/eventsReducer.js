import shortid from "shortid";
import findIndex from "lodash/findIndex";

export function eventsReducer (state = [], action){ 
  
switch(action.type){

    case "ADD_EVENT":
        return [ 
                ...state,
               { description : action.event.description}
            ];
        
    
    default:
        return state
 
}

}

export default eventsReducer;
