import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { AddReviewDataAPI, GetReviewDataAPI, UpdateReviewDataAPI } from "../../../../../../API/Reviews";
import { toast } from "react-toastify"





const AddReview = ({ tabs, selectedTab, setSelectedTab }) => {
    let Navigate = useNavigate()
    let location = useLocation()

    const [fullPageLoading, setFullPageLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [enteredData, setEnteredData] = useState({
        name: '',
        details: '',
    })


    const enteringData = (event) => {
        let { name, value } = event.target

        setEnteredData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })

    }



    const AddSectionData = async () => {
        setLoading(true)
        let res;
        let data = enteredData

        if (data._id) {
            res = await UpdateReviewDataAPI(data._id, data)
            if (res.error != null) {
                toast.error(res.error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSelectedTab(tabs[0])
            }
        } else {
            res = await AddReviewDataAPI(data)
            if (res.error != null) {
                toast.error(res.error, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setSelectedTab(tabs[0])
            }
        }
        setLoading(false)
    }


    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={fullPageLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="add_sapre_main">
                <div className="main_title">
                    Add Review
                </div>
                <div className="interior_content">
                    <div className="interior_input">
                        <TextField fullWidth id="filled-basic" label="Name :" variant="filled" name="name" onChange={enteringData} value={enteredData.name} />
                    </div>
                    <div className="interior_input">
                        <TextareaAutosize aria-label="Details" minRows={10} placeholder="Details" style={{ width: 450 }} name="details" onChange={enteringData} value={enteredData.details} />
                    </div>
                </div>
                <div className="btn_sec">
                    <button onClick={AddSectionData}>Save</button>
                </div>
            </div>
        </>
    )
}

export default AddReview