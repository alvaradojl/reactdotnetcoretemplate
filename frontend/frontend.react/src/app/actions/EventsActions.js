import axios from "axios";

export function addEvent(data){
    return dispatch => {
        return axios.post("http://localhost:5000/api/events/", data);
    }
}