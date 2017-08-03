import isEmpty from "lodash/isEmpty";

const initialState = {
    isAuthenticated: false,
    user:{}
}

export function authReducer (state = initialState, action = {}){
    switch(action.type){
        case "SET_CURRENT_USER":
        return {
            ...state,
            isAuthenticated: !isEmpty(action.user),
            user: action.user
        }
        default: return state;
    }
}

export default authReducer;