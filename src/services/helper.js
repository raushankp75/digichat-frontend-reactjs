import axios from "axios";

export const BASE_URL=['https://chat-app-gcpa.onrender.com' || 'http://localhost:8000'];

export const myAxios=axios.create({
    baseURL:BASE_URL
})