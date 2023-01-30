import React from "react";
import classes from "./smCarousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export const SmCarousel = ({
  items,
  moreButton,
  header,
  isLight,
  marginTop,
}) => {
  let headerClass = isLight
    ? `${classes.header} ${classes.light}`
    : classes.header;

  let titleClass = isLight
    ? `${classes.title} ${classes.light}`
    : classes.title;

  return (
    <>
      <h1
        className={headerClass}
        style={marginTop ? { marginTop: `${marginTop}` } : null}
      >
        {header}
      </h1>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        centeredSlides={false}
        className="mySwiper"
      >
        {items.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div>
                <Link
                  to={
                    !item.title
                      ? `/movflix/shows/page/${item.id}/${item.name}`
                      : `/movflix/movies/page/${item.id}/${item.title}`
                  }
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    alt={""}
                    className={classes.image}
                  />
                </Link>
                <Link
                  className={classes.link}
                  to={
                    !item.title
                      ? `/movflix/shows/page/${item.id}/${item.name}`
                      : `/movflix/movies/page/${item.id}/${item.title}`
                  }
                >
                  <p key={i} className={titleClass}>
                    {item.title || item.name}
                  </p>
                </Link>

                <div className={classes.info}>
                  {item.vote_average ? (
                    <p key={i}>{`${Math.round(item.vote_average * 10) /
                      10}/10`}</p>
                  ) : null}

                  <p>
                    {item.release_date
                      ? item.release_date.slice(0, 4)
                      : item.first_air_date
                      ? item.first_air_date.slice(0, 4)
                      : "No year"}
                  </p>
                  <p>{item.vote_count} votes</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          <Link to={moreButton} className={classes.button}>
            More
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
