import axios from "../AxiosInstance";


const GetBookingsDataAPI = async () => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/booking",
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
const AddBookingDataAPI = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/booking",
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
const UpdateBookingDataAPI = async (id, data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/booking/${id}`,
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
const DeleteBookingDataAPI = async (id) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/booking/${id}`,
            method: 'DELETE',
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



export { GetBookingsDataAPI, AddBookingDataAPI, UpdateBookingDataAPI, DeleteBookingDataAPI }