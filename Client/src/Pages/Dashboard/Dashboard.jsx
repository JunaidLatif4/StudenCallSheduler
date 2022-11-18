import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Componets :
import SideBar from './Components/SideBar/SideBar'
import HomePageCMS from './Components/HomePageCMS/HomePageCMS';
import ReviewSection from './Components/ReviewsSection/ReviewSection';
import Scheduler from './Components/Scheduler/Scheduler';
import Bookings from './Components/Bookings/AllBookings';

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
                    <Route path="booking" element={<Bookings />} />
                </Routes>
            </div>
        </>
    )
}

export default Dashboard