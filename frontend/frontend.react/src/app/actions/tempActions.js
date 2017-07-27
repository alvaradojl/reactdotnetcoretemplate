
export function addMessage(message){

    console.log("addMessage was called.");

    return {
        type:"ADD_MESSAGE",
        message
    }
}

export default addMessage;