import axios from "axios"

const backendAPI = axios.create({
    baseURL: "https://devnovate-backend.onrender.com/"
})

export default backendAPI