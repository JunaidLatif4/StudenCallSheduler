import axios from "../AxiosInstance";


const GetUserDetailsAPI = async () => {
    let resolved = {
        data: null,
        error: null
    }

    let token = localStorage.getItem("token")

    try {
        const res = await axios({
            url: "api/auth/",
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        resolved.data = res.data
    } catch (err) {
        if (err.response) {
            resolved.error = err.response?.data?.message || "Error"
        } else {
            resolved.error = "SomeThing Went Wrong"
        }
    }
    return resolved
}
const GenrateOtoAPI = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/auth/otp/genrate",
            method: 'POST',
            data
        })
        resolved.data = res.data
    } catch (err) {
        if (err.response) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "SomeThing Went Wrong"
        }
    }
    return resolved
}
const VerifyOtpAPI = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/auth/otp/verify",
            method: 'POST',
            data
        })
        resolved.data = res.data
    } catch (err) {
        if (err.response) {
            resolved.error = err.response.data.message
        } else {
            resolved.error = "SomeThing Went Wrong"
        }
    }
    return resolved
}




export { GetUserDetailsAPI, GenrateOtoAPI, VerifyOtpAPI }