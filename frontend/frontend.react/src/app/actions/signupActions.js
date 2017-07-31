import axios from "axios";

export function userSignupRequest(registrationData){
    
     var config = {
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    };
    return  axios.post('http://localhost:60868/api/users/', registrationData, config);

}

export default userSignupRequest;