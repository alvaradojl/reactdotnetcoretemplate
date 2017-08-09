import axios from "axios";

export function register(data){
    return dispatch => {
        return axios.post("http://localhost:5000/api/users/", data);
    }
}