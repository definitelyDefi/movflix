import React, { useState } from "react";
import classes from "./smallCarousel.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "./../../decorative/buttons/buttons";
import { genres } from "../../../genres";
import poster_placeholder from "./../../../assets/no_poster.png";

export function SmallCarousel(props) {
  const { items, title, variant, onClick, type, autoplay } = props;
  const [isPointMoved, setIsPointMoved] = useState(false);

  let navigate = useNavigate();
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    arrows: false,
    className: classes.slider,
    autoplay: autoplay,
    focusOnChange: false,
    swipe: true,
    fade: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 824,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 606,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 385,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.carousel}>
      <h1 className={variant === "light" ? classes.titleLight : classes.title}>
        {title}
      </h1>
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

                  type === "show"
                    ? navigate(`/movflix/shows/page/${item.id}/${item.name}`)
                    : navigate(`/movflix/movies/page/${item.id}/${item.title}`);
                }}
              />

              <h1
                className={
                  variant === "light"
                    ? classes.sliderTitleLight
                    : classes.sliderTitle
                }
                onClick={() =>
                  type === "show"
                    ? navigate(`/movflix/shows/page/${item.id}/${item.name}`)
                    : navigate(`/movflix/movies/page/${item.id}/${item.title}`)
                }
              >
                {type === "show" ? item.name : item.title}
              </h1>
              <div className={classes.sliderInfo}>
                {item.vote_average ? (
                  <h3 className={classes.sliderGenre}>{`${Math.round(
                    item.vote_average * 10
                  ) / 10}/10`}</h3>
                ) : null}

                <h3 className={classes.sliderYear}>
                  {item.release_date
                    ? item.release_date.slice(0, 4)
                    : item.first_air_date
                    ? item.first_air_date.slice(0, 4)
                    : "No year"}
                </h3>
                <h3 className={classes.sliderNsfw}>{item.vote_count} votes</h3>
              </div>

              {type === "show" ? null : (
                <div className={classes.genres}>
                  {item.genre_ids.slice(0, 3).map((genre) => (
                    <span key={genre.id} className={classes.genre}>
                      {genres[genre]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <BlueButton text={"View more"} onClick={onClick} />
      </Slider>
    </div>
  );
}
