import React from 'react'
import { useNavigate } from 'react-router-dom'

import Union from "../../../../Assets/Union.png"
import Logo from "../../../../Assets/logo.png"
import { RiCarLine } from 'react-icons/ri';
import machine from "../../../../Assets/machine.png"
import { GiCartwheel } from 'react-icons/gi';
import { GiShoppingBag } from 'react-icons/gi';

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
                    <div className="link" onClick={() => history("/dashboard/addcar")}>
                        <RiCarLine className='icon' />
                        <p>Add Car</p>
                    </div>
                    <div className="link" onClick={() => history("/dashboard/products")}>
                        <GiShoppingBag className='icon' />
                        <p>Available Spareparts</p>
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