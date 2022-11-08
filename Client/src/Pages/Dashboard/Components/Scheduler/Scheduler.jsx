import React, { useState } from 'react'

import Topbar from "../TabsBar/TopBar"
import AddSchedule from './Components/AddSchedule/AddSchedule'
import AllSchedules from './Components/AllSchedules/AllSchedules'

import "./Scheduler.scss"





let Tabs = ['All Reviews', 'Add Schedule']
const Scheduler = () => {
    const [selectedTab, setSelectedTab] = useState('All Reviews')

    const currentComponent = (CTAB) => {
        switch (CTAB) {
            case Tabs[0]:
                return <AllSchedules tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                break;
            case Tabs[1]:
                return <AddSchedule tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                break;
                return <AllSchedules tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                break;
        }
    }

    return (
        <>
            <div className="review_section_container">
                <Topbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={Tabs} />
                {currentComponent(selectedTab)}
            </div>
        </>
    )
}

export default Scheduler