import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import classes from "./fsCarousel.module.css";
import {Link} from "react-router-dom";
import {isNew} from "../../../helpers/isNew";

export function FsCarousel({items}) {
  return (
    <div className={classes.wrapper}>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper" style={{height: "80vh"}}>
        {items.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <img
                className={classes.backgroundImage}
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title}
              />
              <div className={classes.content}>
                {isNew(item.release_date) ? <h2 className={classes.new}>new</h2> : null}
                <h3 className={classes.title}>{item.title}</h3>
                <div className={classes.info}>
                  <h3 className={classes.year}>{item.release_date ? item.release_date.slice(0, 4) : "No year"}</h3>

                  <h3 className={classes.vote}>{`${item.vote_average}/10`}</h3>
                </div>
                <p className={classes.description}>
                  {item.overview.length > 350 ? `${item.overview.slice(0, 350)}...` : item.overview.slice(0, 350)}
                </p>
                <div className={classes.actionButtons}>
                  <Link className={classes.button} value={item.id} to={`/movflix/movie/page/${item.id}/${item.title}`}>
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
                  </Link>
                  {/* <button className={classes.button} value={item.id}>
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
                  </button> */}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
