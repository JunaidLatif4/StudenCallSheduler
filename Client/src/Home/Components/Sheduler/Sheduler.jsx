import React from 'react'

import { AiFillCaretRight } from "react-icons/ai";
import IMG from "../../../Assets/img.png"

import "./Sheduler.scss"





const Sheduler = () => {
    return (
        <>
            <div className="sheduler_container">
                <div className="heading">SHEDULE A CALL</div>
                <div className="sheduler_box">
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
                            <div className="login_btn">
                                LogIn <span> <AiFillCaretRight className='icon' /></span>
                            </div>
                        </div>
                    </div>
                    <div className="img_box">
                        <img src={IMG} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sheduler