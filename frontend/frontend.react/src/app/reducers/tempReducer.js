import shortid from "shortid";

export function tempReducer (state = [], action = {}){

    console.log("in reducer, the state is: " + state);

    switch(action.type){
        case "ADD_MESSAGE":
        return [
            ...state,
            {
                id:shortid.generate(),
                type:action.message.type,
                text:action.message.text
            }
        ];
        default : return state;
    }
    return state;
}

export default tempReducer;
 