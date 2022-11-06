import React from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Pages/Dashboard/Dashboard";

import { ToastContainer } from "react-toastify"


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
