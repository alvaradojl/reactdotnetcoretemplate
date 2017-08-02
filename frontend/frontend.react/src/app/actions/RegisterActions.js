import axios from "axios";

export function register(data){
    return dispatch => {
        return axios.post("http://localhost:60868/api/users/", data);
    }
}