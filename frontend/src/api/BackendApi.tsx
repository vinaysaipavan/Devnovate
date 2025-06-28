import axios from "axios"

const backendAPI = axios.create({
    baseURL: "http://localhost:3000"
})

export default backendAPI