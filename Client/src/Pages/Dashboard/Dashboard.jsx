import React from 'react'
import { Routes, Route } from 'react-router-dom'



// Componets :
import SideBar from './Components/SideBar/SideBar'




// CSS :
import "./Dashboard.scss";
import HomePageCMS from './Components/HomePageCMS/HomePageCMS';




const Dashboard = () => {
    return (
        <>
            <div className="dashboard_container">
                <SideBar />
                <Routes>
                  
                    <Route path="/" element={<HomePageCMS/>} />
                    
              
                 
                  
                </Routes>
            </div>
        </>
    )
}

export default Dashboard