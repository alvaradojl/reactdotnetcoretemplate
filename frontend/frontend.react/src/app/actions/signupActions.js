import axios from "axios";

export function userSignupRequest(userData){
   
    var config = {
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    };
        return  axios.post('http://localhost:60868/api/users/', userData, config);
}

export default userSignupRequest;