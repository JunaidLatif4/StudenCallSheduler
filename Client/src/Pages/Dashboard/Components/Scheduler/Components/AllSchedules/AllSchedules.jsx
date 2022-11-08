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
import { TextField } from '@mui/material';

import { AddReviewDataAPI, GetReviewDataAPI, UpdateReviewDataAPI } from "../../../../../../API/Reviews";
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


function createData(date, name, details) {
    return { date, name, details };
}

const AllReviews = ({ tabs, selectedTab, setSelectedTab }) => {

    const [fullPageLoading, setFullPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [reviewData, setReviewData] = useState(null)

    const gettingReviewSectionData = async () => {
        setFullPageLoading(true)
        const res = await GetReviewDataAPI()
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
            setReviewData(res.data.data)
        }
    }

    useEffect(() => {
        gettingReviewSectionData()
    }, [])
    useEffect(() => {
        if (reviewData && reviewData.length >= 1) {
            let rowData = reviewData.map((data) => {
                return (
                    createData(data?.createdAt.substring(0, 10), data.name, data.details)
                )
            })
            setRows(rowData)
        }
    }, [reviewData])

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
                                        <StyledTableCell align="left">Details</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.date}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.date}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                                            <StyledTableCell align="left">{row.details}</StyledTableCell>
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
                                        <StyledTableCell align="left">Details</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <StyledTableRow key={row.date}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.date}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{row.name}</StyledTableCell>
                                            <StyledTableCell align="left">{row.details}</StyledTableCell>
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

export default AllReviews