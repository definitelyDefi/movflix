import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay} from "swiper";
import classes from "./fsCarousel.module.css";
import {Link} from "react-router-dom";
import {isNew} from "../../../helpers/isNew";
import {getImageUrl} from "../../../helpers/getImage";
import {useTranslation} from "react-i18next";
interface Item {
  id: number;
  backdrop_path: string | null;
  title?: string;
  name?: string;
  release_date?: string;
  vote_average: number;
  overview: string;
}

interface FsCarouselProps {
  items: Item[];
}

export const FsCarousel: React.FC<FsCarouselProps> = ({items}) => {
  const {t} = useTranslation();
  return (
    <div className={classes.wrapper}>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        navigation={{
          nextEl: `.${classes.customNext}`,
          prevEl: `.${classes.customPrev}`,
        }}
        style={{height: "80vh"}}
        className="mySwiper"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={getImageUrl(item.backdrop_path, "w1280") || undefined}
              alt={item.title || item.name || "No Title"}
              loading="lazy"
              className={classes.backgroundImage}
            />
            <div className={classes.overlay}></div>
            <div className={classes.content}>
              {item.release_date && isNew(new Date(item.release_date)) && <h2 className={classes.new}>New</h2>}
              <h3 className={classes.title}>{item.title || item.name || "No Title"}</h3>
              <div className={classes.info}>
                <h3 className={classes.year}>{item.release_date ? item.release_date.slice(0, 4) : "No Year"}</h3>
                <h3 className={classes.vote}>{`${item.vote_average.toFixed(1)}/10`}</h3>
              </div>
              <p className={classes.description}>
                {item.overview.length > 200 ? `${item.overview.slice(0, 200)}...` : item.overview}
              </p>
              <div className={classes.actionButtons}>
                <Link
                  className={classes.button}
                  to={`/movflix/page?content_type=movie&id=${item.id}&title=${item.title || item.name}`}
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
                  {t("view_more")}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className={classes.customPrev}>&#9664;</div>
        <div className={classes.customNext}>&#9654;</div>
      </Swiper>
    </div>
  );
};
