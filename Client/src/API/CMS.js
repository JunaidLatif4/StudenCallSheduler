import axios from "../AxiosInstance";



const GetHeroSectionDataAPI = async () => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/cms/hero",
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

const AddHeroSectionDataAPI = async (data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: "api/cms/hero",
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

const UpdateHeroSectionDataAPI = async (id, data) => {
    let resolved = {
        data: null,
        error: null
    }

    try {
        const res = await axios({
            url: `api/cms/hero/${id}`,
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



export { GetHeroSectionDataAPI, AddHeroSectionDataAPI, UpdateHeroSectionDataAPI }