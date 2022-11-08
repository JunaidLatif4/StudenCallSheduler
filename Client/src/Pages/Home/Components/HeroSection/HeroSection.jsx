import React from 'react'

import { AiFillCaretRight } from "react-icons/ai";
import IMG from "../../../../Assets/img.png"

import { useSelector } from "react-redux"

import "./HeroSection.scss"





const HeroSection = () => {

    const token = localStorage.getItem("token")

    const HeroSectionData = useSelector((state) => state.HeroSectionData)

    return (
        <>
            <div className="hero_section_container">
                <div className="hero_section_box">
                    <div className="detail_box">
                        <div className="title">
                            {HeroSectionData?.line1 || "India’s most active student community with"}
                            <span> {HeroSectionData?.line2 || "100,000+"}  </span>
                            {HeroSectionData?.line3 || "members."}
                        </div>
                        <div className="details">
                            {HeroSectionData?.details || "Learn from experts and network through events, join clubs and learn real life skills, hang out on our discord server to make new friends and have fun!"}
                        </div>
                        {
                            !token &&
                            <div className="btn_box">
                                <div className="login_btn">
                                    LogIn <span> <AiFillCaretRight className='icon' /></span>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="img_box">
                        <img src={HeroSectionData && HeroSectionData.img ? HeroSectionData.img?.link : IMG} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection