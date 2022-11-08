import React from 'react'

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css";

import { ImQuotesLeft } from "react-icons/im"

import { useSelector } from 'react-redux';

import "./Rating.scss"



const reviewData = [
    {
        name: "Junaid",
        details: "I met CTO for my startup in this community. He’s still working with us. Couldn’t ask for a better person. Network on the BL Community, if done right, you can find a motivated team there."
    },
    {
        name: "Jawad",
        details: "I met CTO for my startup in this community. He’s still working with us. Couldn’t ask for a better person. Network on the BL Community, if done right, you can find a motivated team there."
    },
    {
        name: "Ahmad",
        details: "I met CTO for my startup in this community. He’s still working with us. Couldn’t ask for a better person. Network on the BL Community, if done right, you can find a motivated team there."
    },
    {
        name: "Hamza",
        details: "I met CTO for my startup in this community. He’s still working with us. Couldn’t ask for a better person. Network on the BL Community, if done right, you can find a motivated team there."
    },
    {
        name: "Zahid",
        details: "I met CTO for my startup in this community. He’s still working with us. Couldn’t ask for a better person. Network on the BL Community, if done right, you can find a motivated team there."
    },
]
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1800 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 1800, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        removeArrowOnDeviceType: "tablet",
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
    },
};
const Rating = () => {

    const ReviewSectionData = useSelector((state) => state.ReviewSectionData)

    return (
        <>
            <div className="rating_container">
                <div className="heading">
                    What our students say
                </div>
                <div className="rating_box">
                    <Carousel
                        responsive={responsive}
                        draggable={true}
                        swipeable={true}
                        showDots={false}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        arrows={true}
                        renderDotsOutside={false}
                        autoPlay={true}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        className="_carousel"
                    >

                        {(ReviewSectionData && ReviewSectionData.length >= 1 ? ReviewSectionData : reviewData).map((data, index) => {
                            return (
                                <div key={index} className="rating_crousal_box">
                                    <div className="quot"><ImQuotesLeft /></div>
                                    <div className="details">{data.details}</div>
                                    <div className="name">{data.name}</div>
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Rating