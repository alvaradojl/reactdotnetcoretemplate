import axios from "axios";

export function login(data){
    return dispatch => {
        return axios.post("http://localhost:60868/api/auth/", data);
    }
}