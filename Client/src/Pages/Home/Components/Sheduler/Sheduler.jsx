import React, { useState, useEffect, useCallback } from 'react'

// import useRazorPay from "react-razorpay"

import { Button, TextField } from "@mui/material"
import Autocomplete from '@mui/material/Autocomplete';
import { alpha, styled } from '@mui/material/styles';


import { AddBookingDataAPI } from "../../../../API/Booking"
import { useSelector } from "react-redux"
import { toast } from 'react-toastify';

import "./Sheduler.scss"



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
    // let razor = useRazorPay()


    const UserData = useSelector((state) => state.UserData)
    const InstituteData = useSelector((state) => state.InstituteData)
    const ScheduleData = useSelector((state) => state.ScheduleData)

    const [currentSchedules, setCurrentSchedule] = useState([])

    const [enteredData, setEnteredData] = useState({
        name: "",
        number: "",
        shedule: ""
    })

    const [enteredInstitute, setEnteredInstitute] = useState()
    const [enteredSchedule, setEnteredSchedule] = useState()

    const enteringInstitute = (event, newVal) => {
        setEnteredInstitute(newVal)
    }
    const enteringSchedule = (event, newVal) => {
        setEnteredSchedule(newVal)
        setEnteredData((preVal) => {
            return {
                ...preVal,
                shedule: newVal._id
            }
        })
    }

    const enteringData = (event) => {
        let { name, value } = event.target;
        setEnteredData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
    }

    const saveBooking = () => {
        const options = {
            key: "rzp_test_rRRSC5zUGayRAK",
            amount: "20000",
            currency: "INR",
            name: "IIT Club",
            description: "Test Transaction",
            handler: async (response) => {
                console.log(response);
                let data = {
                    ...enteredData,
                    user: UserData._id
                }
                let res = await AddBookingDataAPI(data)
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
                    setTimeout(() => {
                        window.location.href = ""
                    }, 2000);
                }
            },
            prefill: {
                  name: enteredData.name,
                //   email: "youremail@example.com",
                contact: enteredData.number,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
            console.log("---------RAZOR ERROR -----------", response);
            toast.error("Payment Failed", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
        rzp.open()
    }

    useEffect(() => {
        if (enteredInstitute) {
            const allSchedules = ScheduleData.filter((data) => data.institute._id == enteredInstitute._id && data.filledSeats < data.totalSeats)
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
                                    getOptionLabel={(option) => `${new Date(option?.time).toLocaleDateString()} || ${new Date(option?.time).toLocaleTimeString()}`}
                                    fullWidth
                                    onChange={(event, newValue) => enteringSchedule(event, newValue)}
                                    renderInput={(params) => <CssTextField {...params} variant="filled" label="Select Time" />}
                                />
                            </div>
                        </div>
                        <div className="line">
                            <div className="input_box">
                                <CssTextField variant='filled' fullWidth label="Name" name='name' value={enteredData.name} onChange={enteringData} />
                            </div>
                        </div>
                        <div className="line">
                            <div className="input_box">
                                <CssTextField variant='filled' fullWidth label="Number" name='number' value={enteredData.number} onChange={enteringData} />
                            </div>
                        </div>
                        <div className="line">
                            <Button style={{ backgroundColor: "#3A56F1", color: "black" }} fullWidth onClick={saveBooking}> Book </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sheduler