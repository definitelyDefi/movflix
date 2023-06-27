import React from "react";
import classes from "./mdCarousel.module.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
export const MdCarousel = ({ items, moreButton, header, marginTop }) => {
  return (
    <>
      <h1 className={classes.header} style={marginTop ? { marginTop: `${marginTop}` } : null}>
        {header}
      </h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        centeredSlides={false}
        className="mySwiper"
        breakpoints={{
          300: {
            width: 300,
            slidesPerView: 1,
          },

          620: {
            width: 640,
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1030: {
            width: 1024,
            slidesPerView: 3,
          },

          1366: {
            width: 1366,
            slidesPerView: 4,
          },
        }}
      >
        {items.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div>
                <Link
                  to={
                    !item.title
                      ? `/movflix/tv/page/${item.id}/${item.name}`
                      : `/movflix/movie/page/${item.id}/${item.title}`
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
                      ? `/movflix/tv/page/${item.id}/${item.name}`
                      : `/movflix/movie/page/${item.id}/${item.title}`
                  }
                >
                  <p className={classes.title}>{item.title || item.name}</p>
                </Link>

                <div className={classes.info}>
                  {item.vote_average ? <p>{`${Math.round(item.vote_average * 10) / 10}/10`}</p> : null}

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
