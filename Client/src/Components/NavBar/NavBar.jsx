import React from 'react';

import { AiFillCaretRight } from "react-icons/ai";

import "./NavBar.scss"

// ***** mui modal ********

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ***** mobile input ********


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'






const NavBar = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <div className="navbar_container">
                <div className="navbar_box">
                    <div className="logo_box">
                        <span>Call</span>Sheduler
                    </div>
                    <div className="link_box">
                        <div className="links">
                            <div className="link">Home</div>
                            <div className="link">About</div>
                            <div className="link">Shedule</div>
                            <div className="link">Reviews</div>
                        </div>
                        <div className="btn_box">
                            <div className="login_btn" onClick={handleClickOpen}>
                                LogIn <span> <AiFillCaretRight className='icon' /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Button variant="" onClick={handleClickOpen}>
                    Open alert dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Sign in to continue"}
                    </DialogTitle>


                    <PhoneInput
                        country={'us'}
                    />
                    <DialogActions>
                        <Button variant="contained"  onClick={handleClose} >Contained</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default NavBar