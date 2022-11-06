import React from 'react'
import { useNavigate } from "react-router-dom"

import { FiLogOut } from "react-icons/fi"

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
                                    <div className="tab" style={selectedTab == data ? { color: "brown", borderBottom: "2px solid brown" } : null} onClick={() => setSelectedTab(data)}>
                                        {data}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className="action_box">
                    <div className="action" onClick={() => Navigate("/")}>
                        <FiLogOut />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar