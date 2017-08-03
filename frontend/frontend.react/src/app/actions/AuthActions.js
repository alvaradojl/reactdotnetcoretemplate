import axios from "axios";
import setAuthorizationToken from "./../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";

export function setCurrentUser(user){
    return {
        type: "SET_CURRENT_USER",
        user
    };
}

export function login(data){
    return dispatch => {
        return axios.post("http://localhost:60868/api/auth/", data);
    }
}