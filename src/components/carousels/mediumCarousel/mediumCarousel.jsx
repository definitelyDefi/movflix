import React, { useState } from "react";
import classes from "./mediumCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router";
import { BlueButton } from "./../../decorative/buttons/buttons";
import { genres } from "../../../genres";
import { get_date_withdot } from "../../../helpers/prettifyDate";
import poster_placeholder from "./../../../assets/no_poster.png";

export const MediumCarousel = (props) => {
  const { title, items, onClick } = props;
  const [isPointMoved, setIsPointMoved] = useState(false);
  let navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: false,
    className: classes.slider,
    focusOnChange: false,
    swipe: true,

    fade: false,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 606,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 385,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className={classes.carousel}>
      <h1 className={classes.title}>{title}</h1>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div className={classes.sliderElement} key={item.id}>
              <img
                className={classes.sliderPoster}
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                    : poster_placeholder
                }
                alt={""}
                onPointerDown={() => {
                  setIsPointMoved(false);
                }}
                onPointerMove={() => {
                  setIsPointMoved(true);
                }}
                onPointerUp={() => {
                  if (isPointMoved) {
                    setIsPointMoved(true);
                    return;
                  }

                  item.name
                    ? navigate(`/movflix/shows/page/${item.id}/${item.name}`)
                    : navigate(`/movflix/movies/page/${item.id}/${item.title}`);
                }}
              />
              <h1
                className={classes.sliderTitle}
                onClick={() =>
                  navigate(
                    `/movflix/movies/page/${item.id}/${item.title || item.name}`
                  )
                }
              >
                {item.title || item.name}
              </h1>
              <div className={classes.sliderInfo}>
                <h3
                  className={classes.sliderVote}
                >{`${item.vote_average}/10`}</h3>
                <h3 className={classes.sliderYear}>
                  {item.release_date
                    ? get_date_withdot(item.release_date)
                    : get_date_withdot(item.first_air_date)}
                  {}
                </h3>
                <h3 className={classes.sliderNsfw}>{item.vote_count} votes</h3>
              </div>
              {item.first_air_date ? null : item.genre_ids ? (
                <div className={classes.genres}>
                  {item.genre_ids.map((genre) => (
                    <span key={genre.id} className={classes.genre}>
                      {genres[genre]}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <BlueButton text={"View more"} onClick={onClick} />
      </Slider>
    </div>
  );
};
