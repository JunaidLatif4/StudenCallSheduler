import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

import { AiFillCaretRight } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa"
import { HiMenu } from "react-icons/hi"

import "./NavBar.scss"

// ***** mui modal ********

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

// ***** mobile input ********


import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import 'react-phone-input-2/lib/bootstrap.css'



const PhoneComponet = ({ enteredData, setEnteredData, genrateOtp }) => {

    const enteringData = (number) => {
        setEnteredData((preVal) => {
            return {
                ...preVal,
                phone: number
            }
        })
    }

    return (
        <>
            <DialogTitle id="alert-dialog-title">
                {"Sign in to continue"}
            </DialogTitle>
            <PhoneInput
                onlyCountries={['in']}
                country={"in"}
                countryCodeEditable={false}
                value={enteredData.phone}
                onChange={(phone) => enteringData(phone)}
            />
            <Button fullWidth className='btn' variant="contained" onClick={genrateOtp}> Next </Button>
        </>
    )
}
const OtpComponet = ({ enteredData, setEnteredData, login }) => {

    const enteringData = (event) => {
        let { name, value } = event.target;
        setEnteredData((preVal) => {
            return {
                ...preVal,
                otp: value
            }
        })
    }

    return (
        <>
            <DialogTitle id="alert-dialog-title">
                {"Enter OTP to continue"}
            </DialogTitle>
            <TextField
                value={enteredData.otp}
                placeholder="OTP"
                onChange={enteringData}
            />
            <Button fullWidth className='btn' variant="contained" onClick={login}> Next </Button>
        </>
    )
}


const NavBar = () => {
    let Navigate = useNavigate()

    const token = localStorage.getItem("token")

    const [anchorEl, setAnchorEl] = useState(null);
    const [enteredData, setEnteredData] = useState({
        phone: "",
        otp: ""
    });
    const [position, setPosition] = useState("phone")

    const [openSlider, setOpenSlider] = useState(false)

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const genrateOtp = () => {
        setPosition("otp")
    }
    const login = () => {
        localStorage.setItem("token", "temp_token")
        window.location.href = "/"
    }


    const openMenu = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpenSlider(open);
    };
    const MobileMenu = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
          fljdlkfjslfjlksdjflskjd
        </Box>
    );

    const logOut = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <>
            <div className="navbar_container">
                <div className="navbar_box">
                    <div className="logo_box">
                        <span>IIT</span>Club
                    </div>
                    <div className="link_box">
                        <div className="links">
                            <div className="link">Home</div>
                            <div className="link">About</div>
                            <div className="link">Shedule</div>
                            <div className="link">Reviews</div>
                        </div>
                        <div className="btn_box">
                            {
                                token ?
                                    <>
                                        <IconButton
                                            id="basic-button"
                                            aria-controls={openMenu ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMenu ? 'true' : undefined}
                                            onClick={handleClickMenu}
                                        >
                                            <FaUserAlt color='white' />
                                        </IconButton>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={openMenu}
                                            onClose={handleCloseMenu}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={logOut}>Logout</MenuItem>
                                        </Menu>
                                    </>
                                    :
                                    <div className="login_btn" onClick={handleClickOpen}>
                                        LogIn <span> <AiFillCaretRight className='icon' /></span>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="mbl_menu_btn_box" onClick={toggleDrawer(true)}>
                        <HiMenu />
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className="signup_container">
                        {
                            position == "phone" ?
                                <PhoneComponet enteredData={enteredData} setEnteredData={setEnteredData} genrateOtp={genrateOtp} />
                                :
                                <OtpComponet enteredData={enteredData} setEnteredData={setEnteredData} login={login} />
                        }
                    </div>
                </Dialog>
                <SwipeableDrawer
                    anchor={"right"}
                    open={openSlider}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <MobileMenu/>
                </SwipeableDrawer>
            </div>
        </>
    )
}

export default NavBar