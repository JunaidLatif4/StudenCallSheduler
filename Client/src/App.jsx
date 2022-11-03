import React from "react";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./Home/Home";

import './App.scss';





const App = () => {
  return (
    <>
    <div className="App_container">
    <NavBar/>
    <Home/>
    </div>
    </>
  );
}

export default App;
