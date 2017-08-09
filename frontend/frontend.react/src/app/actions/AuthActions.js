import axios from "axios";
import setAuthorizationToken from "./../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import mystore from "./../store";

export function logout(){
    return dispatch =>{
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        mystore.dispatch(setCurrentUser({}));
    }
}

export function setCurrentUser(user){
    return {
        type: "SET_CURRENT_USER",
        user
    };
}

export function login(data){
    return dispatch => {
        return axios.post("http://localhost:5000/api/auth/", data);
    }
}