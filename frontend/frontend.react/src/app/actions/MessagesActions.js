
export function addMessageDispatcher(message){


    let result ={
            type:'ADD_MESSAGE',
            message
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
