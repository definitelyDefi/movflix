import React from "react";
import classes from "./castCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BlueButton } from "../../decorative/buttons/buttons";
export const CastCarousel = (props) => {
  const { items } = props;
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    swipeToSlide: true,
    arrows: true,
    className: classes.slider,

    fade: false,
    responsive: [
      {
        breakpoint: 1330,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          initialSlide: 1,
          swipe: true,

          fade: false,
        },
      },
      {
        breakpoint: 1126,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 1,
          swipe: true,

          fade: false,
        },
      },
      {
        breakpoint: 978,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 1,
          swipe: true,

          fade: false,
        },
      },
      {
        breakpoint: 828,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          swipe: true,

          fade: false,
        },
      },
    ],
  };
  let location = useLocation();
  let navigate = useNavigate();
  return (
    <div className={classes.carousel}>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div className={classes.sliderElement}>
              <img
                draggable={false}
                className={classes.sliderImage}
                src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                alt={""}
              />
              <h3
                className={classes.sliderName}
                // onClick={() => navigate(`${location.pathname}/cast_crew`)}
                onClick={() =>
                  navigate(`/movflix/persons/page/${item.id}/${item.name}`)
                }
              >
                {item.name}
              </h3>
              <h3 className={classes.sliderCharacter}>{item.character}</h3>
            </div>
          );
        })}
        <BlueButton
          text={"View full crew"}
          onClick={() => navigate(`${location.pathname}/cast_crew`)}
        />
      </Slider>
    </div>
  );
};
