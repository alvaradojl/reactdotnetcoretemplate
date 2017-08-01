export function registerUserDispatcher(data){
 
    let result ={
            type:"USER_REGISTER",
            registrationData:data
        };


    return result;
}
