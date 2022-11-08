import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Backdrop from '@mui/material/Backdrop';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { AddScheduleDataAPI, GetInstitutesDataAPI, UpdateScheduleDataAPI } from "../../../../../../API/Schedules";
import { toast } from "react-toastify"





const AddSchedule = ({ tabs, selectedTab, setSelectedTab }) => {
    let Navigate = useNavigate()
    let location = useLocation()

    const [fullPageLoading, setFullPageLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const [instituteData, setInstituteData] = useState([])

    const [enteredData, setEnteredData] = useState({
        name: '',
        institute: "",
        time: null
    })
    const [enteredInstitute, setEnteredInstitute] = useState()
    const [value, setValue] = useState(dayjs('2022-04-07'));

    const enteringData = (event) => {
        let { name, value } = event.target

        setEnteredData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })

    }
    const enteringInstitute = (event, newValue) => {
        setEnteredInstitute(newValue)
        setEnteredData((preVal) => {
            return {
                ...preVal,
                institute: newValue._id
            }
        })
    };
    const enteringTime = (event) => {
        setValue(event)
        setEnteredData((preVal) => {
            return {
                ...preVal,
                time: event.$d
            }
        })
    };

    const SaveScheduleData = async () => {
        setLoading(true)
        let res;
        let data = enteredData

        if (data._id) {
            res = await UpdateScheduleDataAPI(data._id, data)
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
            res = await AddScheduleDataAPI(data)
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

    const gettingInstituteData = async () => {
        setFullPageLoading(true)
        const res = await GetInstitutesDataAPI()
        setFullPageLoading(false)
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
            setInstituteData(res.data.data)
        }
    }
    useEffect(() => {
        gettingInstituteData()
    }, [])

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
                    Add Schedule
                </div>
                <div className="interior_content">
                    <div className="interior_input">
                        <TextField fullWidth id="filled-basic" label="Name :" variant="filled" name="name" onChange={enteringData} value={enteredData.name} />
                    </div>
                    <div className="interior_input">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={enteredInstitute}
                            options={instituteData}
                            getOptionLabel={(option) => option?.name}
                            fullWidth
                            onChange={(event, newValue) => enteringInstitute(event, newValue)}
                            renderInput={(params) => <TextField {...params} label="Select Institute" />}
                        />
                    </div>
                    <div className="interior_input">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="DateTimePicker"
                                value={value}
                                onChange={enteringTime}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="btn_sec">
                    <button onClick={SaveScheduleData}>Save</button>
                </div>
            </div>
        </>
    )
}

export default AddSchedule