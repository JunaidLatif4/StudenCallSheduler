import React from 'react';

import {AiFillCaretRight} from "react-icons/ai";

import "./NavBar.scss"





const NavBar = () => {
    return (
        <>
            <div className="navbar_container">
            <div className="navbar_box">
                <div className="logo_box">
                    <span>Call</span>Sheduller
                </div>
                <div className="link_box">
                    <div className="links">
                    <div className="link">Home</div>
                    <div className="link">About</div>
                    <div className="link">Shedule</div>
                    <div className="link">Reviews</div>
                    </div>
                    <div className="btn_box">
                        <div className="login_btn">
                            LogIn <span> <AiFillCaretRight className='icon'/></span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default NavBar