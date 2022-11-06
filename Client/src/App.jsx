import React from "react";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";

import './App.scss';





const App = () => {
  return (
    <>
    <div className="App_container">
    <NavBar/>
    <Home/>
    <Footer/>
    </div>
    </>
  );
}

export default App;
