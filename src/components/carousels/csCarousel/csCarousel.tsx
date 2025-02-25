import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Link} from "react-router-dom";
import {Pagination} from "swiper";
import {getImageUrl} from "../../../helpers/getImage";
import classes from "./csCarousel.module.css";
import poster from "./../../../assets/no_poster.png";
import {useTranslation} from "react-i18next";
interface CarouselItem {
  id: number;
  profile_path: string | null;
  name: string;
  character?: string;
}

interface CsCarouselProps {
  items: CarouselItem[];
  moreButton?: string;
}

export const CsCarousel: React.FC<CsCarouselProps> = ({items, moreButton}) => {
  const {t} = useTranslation();
  return (
    <div className={classes.carouselWrapper}>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        pagination={{
          el: `.${classes.swiperCustomPagination}`,
          clickable: true,
        }}
        modules={[Pagination]}
        breakpoints={{
          300: {slidesPerView: 1},
          620: {slidesPerView: 2, spaceBetween: 15},
          1030: {slidesPerView: 3},
          1366: {slidesPerView: 5},
        }}
        className={classes.carousel}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className={classes.slide}>
            <Link to={`/movflix/person?id=${item.id}`} className={classes.link}>
              <div className={classes.imageContainer}>
                <img
                  src={item.profile_path ? getImageUrl(item.profile_path, "w500") : poster}
                  alt={item.name || "Profile"}
                  loading="lazy"
                  draggable={false}
                  className={classes.image}
                />
              </div>
              <p className={classes.name}>{item.name}</p>
            </Link>
            {item.character && <h3 className={classes.character}>{item.character}</h3>}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={classes.swiperCustomPagination} />
      {moreButton && (
        <Link to={moreButton} className={classes.moreButton}>
          {t("view_more")}
        </Link>
      )}
    </div>
  );
};
