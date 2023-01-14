import React from "react";
import classes from "./fullscreenCarousel.module.css";

import Slider from "react-slick";
import { useNavigate } from "react-router";

var settings = {
  autoplay: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  className: classes.carousel,
  swipe: true,
  fade: false,
};

export function FullscreenCarousel(props) {
  const { items } = props;
  let navigate = useNavigate();
  return (
    <div className={classes.carousel}>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <div className={classes.sliderElement} key={item.id}>
              <img
                className={classes.backgroundImage}
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title}
              />
              <div className={classes.content}>
                <h3 className={classes.new}>New</h3>
                <h3 className={classes.title}>{item.title}</h3>
                <div className={classes.info}>
                  <h3 className={classes.year}>
                    {item.release_date
                      ? item.release_date.slice(0, 4)
                      : "No year"}
                  </h3>

                  <h3 className={classes.vote}>{`${item.vote_average}/10`}</h3>
                </div>
                <p className={classes.description}>{item.overview}</p>
                <div className={classes.actionButtons}>
                  <button
                    className={classes.button}
                    value={item.id}
                    onClick={() => {
                      navigate(`/movflix/movies/page/${item.id}/${item.title}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="white"
                      className="bi bi-play-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg>
                    View more
                  </button>
                  <button className={classes.button} value={item.id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="white"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Add to list
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
