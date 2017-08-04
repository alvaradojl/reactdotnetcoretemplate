import axios from "axios";

export function addEvent(data){
    return dispatch => {
        return axios.post("http://localhost:60868/api/events/", data);
    }
}