import React from 'react'
import { useNavigate } from "react-router-dom"

import User from '../../../../Assets/User.png'
import Collapse from '../../../../Assets/collapse.png'
import { FiLogOut } from "react-icons/fi"
// import Bell from '../../Assets/bell.png'

import "./TopBar.scss"

const TopBar = ({ tabs, selectedTab, setSelectedTab }) => {
    let Navigate = useNavigate()

    return (
        <>
            <div className="topbar_container">
                <div className="tabs_box">
                    {
                        tabs.map((data) => {
                            return (
                                <>
                                    <div className="tab" style={selectedTab == data ? { color: "#274C7E", borderBottom: "2px solid #274C7E" } : null} onClick={() => setSelectedTab(data)}>
                                        {data}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="action_box">
                    <div className="action">
                        <img src={Collapse} alt="" />
                    </div>
                    <div className="action">
                        <img src={User} alt="" />
                    </div>
                    <div className="action" onClick={() => Navigate("/")}>
                        <FiLogOut />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar