export function registerUserDispatcher(data){
  
    return {
            type:"USER_REGISTER",
            registrationData:data
        };
}

export function receiveNewlyRegisteredUserDispatcher(data){
    return {
            type:"USER_RECEIVE_NEWLY_REGISTERED",
            registrationData:data
        };
}

