import React from 'react';

import HeroSection from './Components/HeroSection/HeroSection';
import About from './Components/AboutSection/About';
import Sheduler from './Components/Sheduler/Sheduler';
import Rating from './Components/Ratings/Rating';

import "./Home.scss";





const Home = () => {

    const token = localStorage.getItem("token")

    return (
        <>
            <div className="home_container">
                <HeroSection />
                <div className="back_drop">
                    {
                        !token &&
                        <>
                            <div className="layer_box"></div>
                            <div className="login_alert">
                                <p> Please Login to Continue </p>
                            </div>
                        </>
                    }
                    <About />
                    <Sheduler />
                    <Rating />
                </div>

            </div>
        </>
    )
}

export default Home