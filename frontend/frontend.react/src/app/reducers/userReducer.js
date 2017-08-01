//import axios from "axios";
//import Promise from "bluebird";
export function userReducer (state = {}, action){ 
  

    

switch(action.type){

    case "USER_REGISTER":
        // var config = {
        //     headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        // };
    //   Promise.all([axios.post('http://localhost:60868/api/users/', state, config)
    //     .then(response => 
    //         {
    //             console.log("response obtained in reducer: " + response);
    //         })
    //     .catch(result=>{ 
    //         if(result.response){
    //             console.log("ended up in catch with error.response: " + JSON.stringify(result.response.data));
    //             return {
    //                 ...state, 
    //                 errors:result.response.data.errors, 
    //                 isLoading:false
    //             };
    //         }   
    //         })]);

   // console.log("will request to server with action: " + JSON.stringify(action) + " state: " + JSON.stringify(state));


        return {
            ...state,
            username:action.registrationData.username,
            email:action.registrationData.email,
            password:action.registrationData.password,
            passwordConfirmation:action.registrationData.passwordConfirmation,
            timezone:action.registrationData.timezone,
            errors:[],
            success:"registration has been succesful",
            isLoading:false 
        };
        
    default:
        return state
 
}

}

export default userReducer;
 