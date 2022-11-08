import React from 'react';

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa"

import { useSelector } from 'react-redux';

import "./Footer.scss"





const Footer = () => {

    const FooterSectionData = useSelector((state) => state.FooterSectionData)

    return (
        <>
            <div className="footer_container">
                <div className="footer_box">
                    <div className="copyright">© 2022, CallSheduler Pvt. Ltd. All Rights Reserved.</div>
                    <div className="social_links">
                        <FaTwitter className='icon' onClick={()=> window.location.href = FooterSectionData && FooterSectionData.twitter ? FooterSectionData.twitter: "#"} />
                        <FaInstagram className='icon' onClick={()=> window.location.href = FooterSectionData && FooterSectionData.instagram ? FooterSectionData.instagram: "#"} />
                        <FaLinkedinIn className='icon' onClick={()=> window.location.href = FooterSectionData && FooterSectionData.linkdin ? FooterSectionData.linkdin: "#"} />
                        <FaFacebookF className='icon' onClick={()=> window.location.href = FooterSectionData && FooterSectionData.facebook ? FooterSectionData.facebook: "#"} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer