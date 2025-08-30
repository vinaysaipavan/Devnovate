import axios from "axios"

const backendAPI = axios.create({
    baseURL: "http://localhost:5000"
})

export default backendAPI