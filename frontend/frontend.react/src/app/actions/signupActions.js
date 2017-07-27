import axios from "axios";

export default function userSignupRequest(userData){
   
    var config = {
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    };


        return  axios.post('http://localhost:60867/api/users/', userData, config);
 
}