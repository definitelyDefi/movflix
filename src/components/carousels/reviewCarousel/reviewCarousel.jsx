import React from "react";
import classes from "./reviewCarousel.module.css";
import Slider from "react-slick";
import { Review } from "./review/review";

export const ReviewCarousel = (props) => {
  const title = "Reviews";
  const { items } = props;

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    className: classes.slider,
  };

  return (
    <div className={classes.carousel}>
      <h1 className={classes.title}>{title}</h1>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <Review
              avatar_path={item.author_details.avatar_path}
              author={item.author}
              content={item.content}
              created_at={item.created_at}
            />
          );
        })}
      </Slider>
    </div>
  );
};
