import React, { useState, useEffect } from 'react'

import Topbar from "../TabsBar/TopBar"
import AddSchedule from './Components/AddSchedule/AddSchedule'
import AllSchedules from './Components/AllSchedules/AllSchedules'

import "./Scheduler.scss"





let Tabs = ['All Reviews', 'Add Schedule']
const Scheduler = () => {
    const [selectedTab, setSelectedTab] = useState('All Reviews')
    const [scheduleId, setScheduleId] = useState(null)

    const currentComponent = (CTAB) => {
        switch (CTAB) {
            case Tabs[0]:
                return <AllSchedules tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setScheduleId={setScheduleId} />
                break;
            case Tabs[1]:
                return <AddSchedule tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} scheduleId={scheduleId} setScheduleId={setScheduleId} />
                break;
                return <AllSchedules tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setScheduleId={setScheduleId} />
                break;
        }
    }

    return (
        <>
            <div className="review_section_container">
                <Topbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={Tabs} />
                <div className="review_section_box">
                    {currentComponent(selectedTab)}
                </div>
            </div>
        </>
    )
}

export default Scheduler