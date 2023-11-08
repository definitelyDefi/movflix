import React from "react";
import classes from "./csCarousel.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Link} from "react-router-dom";
import {Pagination} from "swiper";
export const CsCarousel = ({items, moreButton}) => {
  return (
    <>
      <Swiper
        slidesPerView={7}
        spaceBetween={20}
        centeredSlides={false}
        className="mySwiper"
        pagination={{
          el: `.${classes.swiperCustomPagination}`,
        }}
        modules={[Pagination]}
        breakpoints={{
          300: {
            width: 170,
            slidesPerView: 1,
            // spaceBetween: 20,
          },

          620: {
            width: 640,
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1030: {
            width: 1024,
            slidesPerView: 4,
          },

          1366: {
            width: 1366,
            slidesPerView: 5,
          },
        }}
      >
        {items.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <div className={classes.slide}>
                <Link to={`/movflix/person/page/${item.id}/${item.name}`} className={classes.link}>
                  <img
                    draggable={false}
                    className={classes.image}
                    src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                    alt={""}
                  />
                </Link>

                <Link className={classes.link} to={`/movflix/person/page/${item.id}/${item.name}`}>
                  <p className={classes.name}> {item.name}</p>
                </Link>
                <h3 className={classes.character}>{item.character}</h3>
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
      <div className={classes.swiperCustomPagination} />
    </>
  );
};
