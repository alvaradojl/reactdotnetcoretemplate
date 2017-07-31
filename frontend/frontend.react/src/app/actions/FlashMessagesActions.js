
export function addMessageDispatcher(text){


    let result ={
            type:'ADD_MESSAGE',
            text
        };


    return result;
}

export function deleteMessageDispatcher(id){


    let result ={
            type:'DELETE_MESSAGE',
            id
        };


    return result;
}
