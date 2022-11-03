import React from 'react';

import HeroSection from './Components/HeroSection/HeroSection';

import "./Home.scss";





const Home = () => {
    return (
        <>
            <div className="home_container">
                <HeroSection />
            </div>
        </>
    )
}

export default Home