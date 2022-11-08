import axios from "../AxiosInstance";


const GetSchedulesDataAPI = async () => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/schedule",
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
const AddScheduleDataAPI = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/schedule",
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
const UpdateScheduleDataAPI = async (id, data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/schedule/${id}`,
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
const DeleteScheduleDataAPI = async (id) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/schedule/${id}`,
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


const GetInstitutesDataAPI = async () => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/institute",
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
const AddInstituteDataAPI = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/institute",
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
const UpdateInstituteDataAPI = async (id, data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/institute/${id}`,
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
const DeleteInstituteDataAPI = async (id) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/institute/${id}`,
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



export { GetSchedulesDataAPI, AddScheduleDataAPI, UpdateScheduleDataAPI, DeleteScheduleDataAPI, GetInstitutesDataAPI, AddInstituteDataAPI, UpdateInstituteDataAPI, DeleteInstituteDataAPI }