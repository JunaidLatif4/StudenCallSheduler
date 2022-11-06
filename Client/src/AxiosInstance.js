import axios from "axios";




const Instance = axios.create({
    baseURL: process.env.REACT_APP_ENV == "development" ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL
})



export default Instance