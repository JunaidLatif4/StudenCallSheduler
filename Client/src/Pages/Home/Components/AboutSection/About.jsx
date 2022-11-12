import React from 'react'

import VIDEO from "../../../../Assets/video.mp4"

import { useSelector } from "react-redux"

import "./About.scss"




const About = () => {

    const PromotionSectionData = useSelector((state) => state.PromotionSectionData)

    return (
        <>
            <div className="about_container">
                <div className="heading">ABOUT us</div>
                <div className="about_box">
                    <div className="img_box">
                        {
                            PromotionSectionData &&
                                <video controls >
                                    <source src={PromotionSectionData?.video?.link} type="video/mp4" />
                                </video>
                                // :
                                // <video controls >
                                //     <source src={VIDEO} type="video/mp4" />
                                // </video>
                        }
                    </div>
                    <div className="detail_box">
                        <div className="title">
                            {PromotionSectionData?.line1 || "India’s most active student community with"}
                            <span> {PromotionSectionData?.line2 || "100,000+"}  </span>
                            {PromotionSectionData?.line3 || "members."}
                        </div>
                        <div className="details">
                            {PromotionSectionData?.details || "Learn from experts and network through events, join clubs and learn real life skills, hang out on our discord server to make new friends and have fun!"}
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