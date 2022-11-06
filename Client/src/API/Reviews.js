import axios from "../AxiosInstance";


const GetReviewDataAPI = async () => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/cms/review",
            method: 'GET'
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
const AddReviewDataAPI = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/cms/review",
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
const UpdateReviewDataAPI = async (id, data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/cms/review/${id}`,
            method: 'PATCH',
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



export { GetReviewDataAPI, AddReviewDataAPI, UpdateReviewDataAPI }