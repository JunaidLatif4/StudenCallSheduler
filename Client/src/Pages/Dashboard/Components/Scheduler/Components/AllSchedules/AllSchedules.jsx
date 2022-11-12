import React, { useEffect, useState } from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { MdRateReview } from "react-icons/md"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button } from '@mui/material';

import { GetInstitutesDataAPI, AddInstituteDataAPI, GetSchedulesDataAPI } from "../../../../../../API/Schedules";
import { toast } from "react-toastify"

import "./AllSchedules.scss"



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: "#121212",
        color: theme.palette.common.white,
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function createInstituteData(date, name) {
    return { date, name };
}
function createScheduleData(date, name, institute, time) {
    return { date, name, institute, time };
}

const AllReviews = ({ tabs, selectedTab, setSelectedTab }) => {

    const [fullPageLoading, setFullPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    const [instituteRows, setInstituteRows] = useState([])
    const [instituteData, setInstituteData] = useState(null)

    const [schedulesRows, setSchedulesRows] = useState([])
    const [scheduleData, setScheduleData] = useState(null)

    const [openNewInstituteModal, setOpenNewInstituteModal] = useState(false)
    const [newInstitute, setNewInstitute] = useState("")
    const enteringNewInstitute = (event) => {
        setNewInstitute(event.target.value)
    }
    const handleCloseNewInstituteModal = () => {
        setOpenNewInstituteModal(false)
    }
    const saveInstitute = async () => {
        const res = await AddInstituteDataAPI(newInstitute)
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
            setOpenNewInstituteModal(false)
            gettingInstituteData()
        }
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
    const gettingSchedulesData = async () => {
        setFullPageLoading(true)
        const res = await GetSchedulesDataAPI()
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
            setScheduleData(res.data.data)
        }
    }

    useEffect(() => {
        gettingInstituteData()
        gettingSchedulesData()
    }, [])
    useEffect(() => {
        if (instituteData && instituteData.length >= 1) {
            let rowData = instituteData.map((data) => {
                return (
                    createInstituteData(data?.createdAt.substring(0, 10), data.name)
                )
            })
            setInstituteRows(rowData)
        }
    }, [instituteData])
    useEffect(() => {
        if (scheduleData && scheduleData.length >= 1) {
            let rowData = scheduleData.map((data) => {
                return (
                    createScheduleData(data?.createdAt.substring(0, 10), data.name , data.institute , data.time)
                )
            })
            setSchedulesRows(rowData)
        }
    }, [scheduleData])

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={fullPageLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="allschedules_container">
                <div className="schedule_box">
                    <div className="line_space">
                        <div className="title">
                            All Colleges :
                        </div>
                        <div className="add_icon" onClick={() => setOpenNewInstituteModal(true)}>
                            <MdRateReview />
                        </div>
                    </div>
                    <div className="table_box">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell align="left">Name</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {instituteRows.map((row) => (
                                        <StyledTableRow key={row.date}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.date}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div className="schedule_box">
                    <div className="line_space">
                        <div className="title">
                            All Schedules :
                        </div>
                        <div className="add_icon" onClick={() => setSelectedTab(tabs[1])}>
                            <MdRateReview />
                        </div>
                    </div>
                    <div className="table_box">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell align="left">Name</StyledTableCell>
                                        <StyledTableCell align="left">Institute</StyledTableCell>
                                        <StyledTableCell align="left">Time</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {schedulesRows.map((row) => (
                                        <StyledTableRow key={row.date}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.date}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                                            <StyledTableCell align="left">{row.institute?.name}</StyledTableCell>
                                            <StyledTableCell align="left">{new Date(row.time).toLocaleDateString()} : {new Date(row.time).toLocaleTimeString()}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <Dialog
                open={openNewInstituteModal}
                onClose={handleCloseNewInstituteModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="signup_container">
                    <DialogTitle id="alert-dialog-title">
                        {"Add New Institute"}
                    </DialogTitle>
                    <TextField
                        value={newInstitute}
                        placeholder="Institute"
                        onChange={enteringNewInstitute}
                    />
                    <Button fullWidth className='btn' variant="contained" onClick={saveInstitute}> Save </Button>
                </div>
            </Dialog>
        </>
    )
}

export default AllReviews