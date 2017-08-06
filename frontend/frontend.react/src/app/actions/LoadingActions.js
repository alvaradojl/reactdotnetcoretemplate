import axios from "axios";
import setAuthorizationToken from "./../utils/setAuthorizationToken";
import jwtDecode from "jwt-decode";
import mystore from "./../store";

 

export function setCurrentUser(status){
    return {
        type: "TOGGLE_LOADING",
        status
    };
}
