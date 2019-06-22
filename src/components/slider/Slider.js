import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./slider.scss";

class Slider extends React.Component {
  render() {
    return (
      <div className="caroulsel-wrapper">
        <Carousel
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={4500}
          stopOnHover={false}
          transitionTime={900}
          dynamicHeight={false}
          showArrows={false}
          showStatus={false}
        >
          <div>
            <img
              src="images/slider/slider-1.jpeg"
              height="850px"
              alt="slider 1"
            />
          </div>
          <div>
            <img
              src="images/slider/slider-2.jpeg"
              height="850px"
              alt="slider 2"
            />
          </div>
          <div>
            <img
              src="images/slider/slider-3.jpeg"
              height="850px"
              alt="slider 3"
            />
          </div>
          <div>
            <img
              src="images/slider/slider-4.jpeg"
              height="850px"
              alt="slider 4"
            />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Slider;
