import isEmpty from "lodash/isEmpty";

const initialState = false;

export function loadingReducer (state = initialState, action = {}){
    switch(action.type){
        case "TOGGLE_LOADING":
        return action.status;
        default: return state;
    }
}

export default loadingReducer;