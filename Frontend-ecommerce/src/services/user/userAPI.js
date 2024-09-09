import axios from "../../config/axiosConfig";

const API_URL_USER = "http://localhost:8080/user";
const API_URL_PROTECTED = "http://localhost:8080/user/protectedRoute"

export const api= axios.create({
    baseURL: API_URL_USER,
    withCredentials: true
})

export const apiProtected = axios.create({
    baseURL: API_URL_PROTECTED,
    withCredentials: true
})