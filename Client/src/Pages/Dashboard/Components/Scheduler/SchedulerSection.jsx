import React, { useState } from 'react'

import Topbar from "../TabsBar/TopBar"
import AddReview from './Components/AddReview/AddReview'
import AllReviews from './Components/AllReviews/AllReviews'

import "./ReviewSection.scss"





let Tabs = ['All Reviews', 'Add Review']
const ReviewSection = () => {
    const [selectedTab, setSelectedTab] = useState('All Reviews')

    const currentComponent = (CTAB) => {
        switch (CTAB) {
            case Tabs[0]:
                return <AllReviews tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                break;
            case Tabs[1]:
                return <AddReview tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                break;
                return <AllReviews tabs={Tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
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

export default ReviewSection