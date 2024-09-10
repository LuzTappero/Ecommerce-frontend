import axios from "../../config/axiosConfig";

const API_URL_USER = "http://localhost:8080/user";

export const api= axios.create({
    baseURL: API_URL_USER,
    withCredentials: true
})
