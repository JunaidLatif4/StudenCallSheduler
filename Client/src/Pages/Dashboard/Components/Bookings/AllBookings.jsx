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

import { GetBookingsDataAPI, AddBookingDataAPI, UpdateBookingDataAPI, DeleteBookingDataAPI } from "../../../../API/Booking";
import { toast } from "react-toastify"

import "./AllBookings.scss"



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


function createBookingsData(date, name, shedule, institute, time, number) {
    return { date, name, shedule, institute, time, number };
}

const AllBookings = ({ tabs, selectedTab, setSelectedTab }) => {

    const [fullPageLoading, setFullPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)

    const [bookingsRow, setBookingsRow] = useState([])
    const [bookingsData, setBookingsData] = useState(null)

    const gettingSchedulesData = async () => {
        setFullPageLoading(true)
        const res = await GetBookingsDataAPI()
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
            setBookingsData(res.data.data)
        }
    }

    useEffect(() => {
        gettingSchedulesData()
    }, [])
    useEffect(() => {
        if (bookingsData && bookingsData.length >= 1) {
            let rowData = bookingsData.map((data) => {
                return (
                    createBookingsData(data?.createdAt.substring(0, 10), data.name, data?.shedule?.name, data?.shedule?.institute?.name, `${new Date(data.shedule?.time).toLocaleDateString()} || ${new Date(data.shedule?.time).toLocaleTimeString()}`, data.number)
                )
            })
            setBookingsRow(rowData)
        }
    }, [bookingsData])

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
                            All Bookings :
                        </div>
                    </div>
                    <div className="table_box">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell align="left">Name</StyledTableCell>
                                        <StyledTableCell align="left">Shedule</StyledTableCell>
                                        <StyledTableCell align="left">Institute</StyledTableCell>
                                        <StyledTableCell align="left">Call Time</StyledTableCell>
                                        <StyledTableCell align="left">Number</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookingsRow.map((row) => (
                                        <StyledTableRow key={row.date}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.date}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                                            <StyledTableCell align="left">{row.shedule}</StyledTableCell>
                                            <StyledTableCell align="left">{row.institute}</StyledTableCell>
                                            <StyledTableCell align="left">{row.time}</StyledTableCell>
                                            <StyledTableCell align="left">{row.number}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllBookings