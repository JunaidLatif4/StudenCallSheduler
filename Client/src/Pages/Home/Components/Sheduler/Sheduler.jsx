import React from 'react'

import { Button, TextField } from "@mui/material"
import Autocomplete from '@mui/material/Autocomplete';
import { alpha, styled } from '@mui/material/styles';

import { AiFillCaretRight } from "react-icons/ai";
import IMG from "../../../../Assets/img.png"

import { useSelector } from "react-redux"

import "./Sheduler.scss"
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';



const CssTextField = styled(TextField)({
    "& .MuiInputBase-root": {
        backgroundColor: "#a52a2ac4",
        "&.Mui-focused": {
            backgroundColor: "#a52a2ac4",
        }
    },
    '& label.Mui-focused': {
        color: '#3A56F1',
    },
    '& label': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#3A56F1',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'red',
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
    },
});

const Sheduler = () => {

    const InstituteData = useSelector((state) => state.InstituteData)
    const ScheduleData = useSelector((state) => state.ScheduleData)

    const [currentSchedules, setCurrentSchedule] = useState([])

    const [enteredData, setEnteredData] = useState({
        schedule: ""
    })

    const [enteredInstitute, setEnteredInstitute] = useState()
    const [enteredSchedule, setEnteredSchedule] = useState()

    const enteringInstitute = (event, newVal) => {
        setEnteredInstitute(newVal)
    }
    const enteringSchedule = (event, newVal) => {
        setEnteredSchedule(newVal)
        setEnteredData({
            schedule: newVal._id
        })
    }

    const saveBooking =()=>{
        setTimeout(() => {
            toast.success("Call Sheduled Success", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }, 1000);
        setTimeout(() => {
            window.location.href=""
        }, 2000);
    }

    useEffect(() => {
        if (enteredInstitute) {
            const allSchedules = ScheduleData.filter((data) => data.institute._id == enteredInstitute._id)
            setCurrentSchedule(allSchedules)
        }
    }, [enteredInstitute])

    return (
        <>
            <div className="sheduler_container">
                <div className="heading">SHEDULE A CALL</div>
                <div className="sheduler_box">
                    <div className="detail_box">
                        <div className="title">
                            India’s most active student community with
                            <span> 100,000+ </span>
                            members.
                        </div>
                        <div className="details">
                            Learn from experts and network through events, join clubs and learn real life skills, hang out on our discord server to make new friends and have fun!
                        </div>
                    </div>
                    <div className="call_book_box">
                        <div className="title">
                            Talk to an iitian now!
                        </div>
                        <div className="line">
                            <div className="input_box">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    value={enteredInstitute}
                                    options={InstituteData}
                                    getOptionLabel={(option) => option?.name}
                                    fullWidth
                                    onChange={(event, newValue) => enteringInstitute(event, newValue)}
                                    renderInput={(params) => <CssTextField {...params} variant="filled" label="Select Institute" />}
                                />
                            </div>
                        </div>
                        <div className="line">
                            <div className="input_box">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    value={enteredSchedule}
                                    options={currentSchedules}
                                    getOptionLabel={(option) => {
                                        return (
                                            <>
                                                {
                                                    new Date(option?.time).toLocaleDateString()
                                                }
                                                &nbsp; || &nbsp;
                                                {
                                                    new Date(option?.time).toLocaleTimeString()
                                                }
                                            </>
                                        )
                                    }}
                                    fullWidth
                                    onChange={(event, newValue) => enteringSchedule(event, newValue)}
                                    renderInput={(params) => <CssTextField {...params} variant="filled" label="Select Time" />}
                                />
                            </div>
                        </div>
                        <div className="line">
                            <div className="input_box">
                                <CssTextField variant='filled' fullWidth label="Name" />
                            </div>
                        </div>
                        <div className="line">
                            <div className="input_box">
                                <CssTextField variant='filled' fullWidth label="Number" />
                            </div>
                        </div>
                        <div className="line">
                            {/* <div className="btn_box"> */}
                            <Button style={{ backgroundColor: "#3A56F1", color: "black" }} fullWidth onClick={saveBooking}> Book </Button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sheduler