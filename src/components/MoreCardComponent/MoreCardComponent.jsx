// import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import NextComponent from "../NextComponent/NextComponent";
import BackComponent from "../BackComponent/BackComponent";
import CardComponent from "../CardComponent/CardComponent";

const MoreCardComponent = ({ sports }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3; // Số slides hiển thị
  const slideCount = sports.length; // Tổng số slides
  const isDisabledBack = currentSlide === 0;
  const isDisabledNext = currentSlide >= slideCount - slidesToShow;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    nextArrow: (
      <NextComponent
        isDisabled={isDisabledNext}
        position="absolute"
        zIndex="1"
        top="50%"
        right="10px"
        transform="translateY(-50%)"
        fontSize="2rem"
        color="white"
      />
    ),
    prevArrow: (
      <BackComponent
        isDisabled={isDisabledBack}
        position="absolute"
        zIndex="1"
        top="50%"
        left="10px"
        transform="translateY(-50%)"
        fontSize="2rem"
        color="white"
      />
    ),
  };
  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {sports.slice(0, 8).map((sport, index) => (
          <CardComponent key={index} {...sport} />
        ))}
      </Slider>
    </div>
  );
};

export default MoreCardComponent;
