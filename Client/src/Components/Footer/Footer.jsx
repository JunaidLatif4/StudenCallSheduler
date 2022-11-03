import React from 'react';

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"

import "./Footer.scss"





const Footer = () => {
    return (
        <>
            <div className="footer_container">
                <div className="footer_box">
                    <div className="copyright">© 2022, Clinify Pvt. Ltd. All Rights Reserved.</div>
                    <div className="social_links">
                        <FaTwitter className='icon' />
                        <FaInstagram className='icon' />
                        <FaLinkedinIn className='icon' />
                        <FaFacebookF className='icon' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer