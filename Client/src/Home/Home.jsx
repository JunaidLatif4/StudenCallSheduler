import React from 'react';

import HeroSection from './Components/HeroSection/HeroSection';
import About from './Components/AboutSection/About';

import "./Home.scss";





const Home = () => {
    return (
        <>
            <div className="home_container">
                <HeroSection />
                <About />
            </div>
        </>
    )
}

export default Home