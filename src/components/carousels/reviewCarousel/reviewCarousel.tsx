import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import classes from "./reviewCarousel.module.css";
import {Review} from "./review/review";
import {useTranslation} from "react-i18next";

interface AuthorDetails {
  avatar_path?: string | null;
  rating?: number | null;
}

interface ReviewItem {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
}

interface ReviewCarouselProps {
  items: ReviewItem[];
}

export const ReviewCarousel: React.FC<ReviewCarouselProps> = ({items}) => {
  const {t} = useTranslation();
  const title = t("reviews");

  return (
    <div className={classes.carousel}>
      <h1 className={classes.title}>{title}</h1>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: `.${classes.customNext}`,
          prevEl: `.${classes.customPrev}`,
        }}
        spaceBetween={20}
        slidesPerView={Math.min(items.length, 3)}
        loop={items.length > 3}
        breakpoints={{
          640: {
            slidesPerView: Math.min(items.length, 1),
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: Math.min(items.length, 2),
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: Math.min(items.length, 3),
            spaceBetween: 30,
          },
        }}
        className={classes.swiper}
      >
        <div className={classes.customPrev}></div>
        <div className={classes.customNext}></div>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Review
              avatar_path={item.author_details.avatar_path || ""}
              author={item.author}
              content={item.content}
              created_at={item.created_at}
              rating={item.author_details.rating || null}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
