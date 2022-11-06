import React from 'react'

import VIDEO from "../../../../Assets/video.mp4"

import "./About.scss"




const About = () => {
    return (
        <>
            <div className="about_container">
                <div className="heading">ABOUT us</div>
                <div className="about_box">
                    <div className="img_box">
                        <video controls >
                            <source src={VIDEO} type="video/mp4" />
                        </video>
                    </div>
                    <div className="detail_box">
                        <div className="title">
                            India’s most active student community with
                            <span> 100,000+ </span>
                            members.
                        </div>
                        <div className="details">
                            Learn from experts and network through events, join clubs and learn real life skills, hang out on our discord server to make new friends and have fun!
                        </div>
                        <div className="btn_box">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About