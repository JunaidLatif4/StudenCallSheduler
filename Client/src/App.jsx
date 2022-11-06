import React from "react";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";

import './App.scss';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";


const Homeroute = () => {

  return(
    <>
    <NavBar/>
    <Home/>
    <Footer/>
    
    </>
  )

}


const App = () => {
  return (
    <>
    <div className="App_container">
    <Routes>
    <Route path="/" element={<Homeroute/>} />
    <Route path="dashboard/*" element={<Dashboard/>} />
    </Routes>
    </div>
    </>
  );
}

export default App;
