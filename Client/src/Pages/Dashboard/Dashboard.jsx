import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Componets :
import SideBar from './Components/SideBar/SideBar'
import AddCar from './Components/AddCar/AddCar'
import AvailableCar from './Components/AvailableCar/AvailableCar'
import AddSpareparts from './Components/AddSpareparts/AddSpareparts'
import AvailableSpareparts from './Components/AvailableSpareparts/AvailableSpareparts'



// CSS :
import "./Dashboard.scss";




const Dashboard = () => {
    return (
        <>
            <div className="dashboard_container">
                <SideBar />
                <Routes>
                    <Route path='/' element={<AvailableCar />} />
                    <Route path="addcar" element={<AddCar />} />
                    <Route path="products" element={<AvailableSpareparts />} />
                    <Route path="addproduct" element={<AddSpareparts />} />
                </Routes>
            </div>
        </>
    )
}

export default Dashboard