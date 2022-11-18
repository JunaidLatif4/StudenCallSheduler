import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Pages/Dashboard/Dashboard";

import { ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { heroSectionAction } from "./GlobalStore/actions/heroSection"
import { promotionSectionAction } from "./GlobalStore/actions/promotionSection"
import { reviewSectionAction } from "./GlobalStore/actions/reviewSection"
import { footerSectionAction } from "./GlobalStore/actions/footerSection"
import { GetReviewDataAPI } from "./API/Reviews";
import { scheduleAction } from "./GlobalStore/actions/scheduleAction";
import { instituteAction } from "./GlobalStore/actions/instituteAction";
import { GetFooterSectionDataAPI, GetHeroSectionDataAPI, GetPromotionSectionDataAPI } from "./API/CMS";
import { GetInstitutesDataAPI, GetSchedulesDataAPI } from "./API/Schedules";


import { GetUserDetailsAPI } from "./API/Auth";
import { userAction } from "./GlobalStore/actions/userAction";

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';


const Homeroute = () => {

  return (
    <>
      <NavBar />
      <Home />
      <Footer />

    </>
  )

}

const App = () => {
  let dispatch = useDispatch()

  const gettingUserData = async ()=>{
    const res = await GetUserDetailsAPI()
    if (res.error != null) {
      localStorage.clear()
      // window.location.href = "/"
    } else {
      dispatch(userAction(res.data.data))
    }
  }
  const gettingHeroSectionData = async () => {
    const res = await GetHeroSectionDataAPI()
    if (res.error != null) {

    } else {
      dispatch(heroSectionAction(res.data.data))
    }
  }
  const gettingPromotionSectionData = async () => {
    const res = await GetPromotionSectionDataAPI()
    if (res.error != null) {

    } else {
      dispatch(promotionSectionAction(res.data.data))
    }
  }
  const gettingReviewSectionData = async () => {
    const res = await GetReviewDataAPI()
    if (res.error != null) {

    } else {
      dispatch(reviewSectionAction(res.data.data))
    }
  }
  const gettingFooterSectionData = async () => {
    const res = await GetFooterSectionDataAPI()
    if (res.error != null) {

    } else {
      dispatch(footerSectionAction(res.data.data))
    }
  }
  const gettingSchedulerData = async () => {
    const res = await GetSchedulesDataAPI()
    if (res.error != null) {

    } else {
      dispatch(scheduleAction(res.data.data))
    }
  }
  const gettingInstituteData = async () => {
    const res = await GetInstitutesDataAPI()
    if (res.error != null) {

    } else {
      dispatch(instituteAction(res.data.data))
    }
  }

  useEffect(() => {
    gettingHeroSectionData()
    gettingPromotionSectionData()
    gettingReviewSectionData()
    gettingFooterSectionData()
    gettingInstituteData()
    gettingSchedulerData()
    gettingUserData()
  }, [])
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="App_container">
        <Routes>
          <Route path="/" element={<Homeroute />} />
          <Route path="dashboard/*" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
