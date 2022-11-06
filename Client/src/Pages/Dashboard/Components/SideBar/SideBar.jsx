import React from 'react'
import { useNavigate } from 'react-router-dom'

import Union from "../../../../Assets/Union.png"
import Logo from "../../../../Assets/logo.png"
import { MdReviews } from 'react-icons/md';
import { GiCartwheel } from 'react-icons/gi';
import { AiFillSchedule } from 'react-icons/ai';

import "./SideBar.scss"



const SideBar = () => {
    let history = useNavigate()

    return (
        <>
            <div className="sidebar_container">
                <div className="logo_box" onClick={() => history("/")}>
                    <img src={Logo} alt="" />
                </div>
                <div className="links_box">
                    <div className="link" onClick={() => history("/dashboard")}>
                        <img src={Union} alt="" />
                        <p>Dashboard</p>
                    </div>
                    <div className="link" onClick={() => history("/dashboard/reviews")}>
                        <MdReviews className='icon' />
                        <p>Reviews</p>
                    </div>
                    <div className="link" onClick={() => history("/dashboard/schedules")}>
                        <AiFillSchedule className='icon' />
                        <p>Schedules</p>
                    </div>
                    <div className="link" onClick={() => history("/dashboard/addproduct")}>
                        <GiCartwheel className='icon' />
                        <p>Add Spareparts</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar