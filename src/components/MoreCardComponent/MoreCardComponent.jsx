// import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import NextComponent from "../NextComponent";
import BackComponent from "../BackComponent";
import CardComponent from "../CardComponent/CardComponent";

const MoreCardComponent = ({ sports }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3; // Số slides hiển thị
  const slideCount = 6; // Tổng số slides

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    nextArrow: (
      <NextComponent
        currentSlide={currentSlide}
        slideCount={slideCount}
        slidesToShow={slidesToShow}
      />
    ),
    prevArrow: <BackComponent currentSlide={currentSlide} />,
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
