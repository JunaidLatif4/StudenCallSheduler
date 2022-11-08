import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Componets :
import SideBar from './Components/SideBar/SideBar'
import HomePageCMS from './Components/HomePageCMS/HomePageCMS';
import ReviewSection from './Components/ReviewsSection/ReviewSection';
import Scheduler from './Components/Scheduler/Scheduler';

// CSS :
import "./Dashboard.scss";




const Dashboard = () => {
    return (
        <>
            <div className="dashboard_container">
                <SideBar />
                <Routes>
                    <Route path="/" element={<HomePageCMS />} />
                    <Route path="reviews" element={<ReviewSection />} />
                    <Route path="schedules" element={<Scheduler />} />
                </Routes>
            </div>
        </>
    )
}

export default Dashboard