import React from "react";
import classes from "./smCarousel.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import {Link} from "react-router-dom";
import {getImageUrl} from "../../../helpers/getImage";
import poster from "./../../../assets/no_poster.png";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {resetFilters, setCategory, setContentType, setPage} from "../../../store/filtersSlice";
import {AppDispatch} from "../../../store/store";
import {useTranslation} from "react-i18next";
interface CarouselItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  vote_count: number;
}

interface SmCarouselProps {
  items: CarouselItem[];
  moreButton: string;
  header: string;
  isLight?: boolean;
  marginTop?: string;
}

export const SmCarousel: React.FC<SmCarouselProps> = ({items, moreButton, header, isLight = false, marginTop}) => {
  const {t} = useTranslation();
  const headerClass = isLight ? `${classes.header} ${classes.light}` : classes.header;
  const titleClass = isLight ? `${classes.title} ${classes.light}` : classes.title;
  let dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  let spplited = moreButton.split("/");

  let content_type = spplited[0];

  let category = spplited[1];

  const moreFunc = () => {
    if (category === "recommendations") {
      navigate(
        `/movflix/recommendations?contentType=${content_type}&movieId=${items[0].id}&title=${
          items[0].title || items[0].name
        }`
      );
    } else {
      dispatch(setPage(1));
      dispatch(resetFilters());
      dispatch(setContentType(content_type));
      dispatch(setCategory(category));
      navigate(`/movflix/discover/${content_type}?category=${category}`);
    }
  };
  return (
    <>
      <h1 className={headerClass} style={marginTop ? {marginTop} : undefined}>
        {header}
      </h1>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        centeredSlides={false}
        className="mySwiper"
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        breakpoints={{
          300: {
            width: 200,
            slidesPerView: 1,
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
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div>
              <Link
                to={
                  !item.title
                    ? `/movflix/page?content_type=tv&id=${item.id}&title=${item.name}`
                    : `/movflix/page?content_type=movie&id=${item.id}&title=${item.title}`
                }
              >
                <img
                  src={item.poster_path ? getImageUrl(item.poster_path, "w500") : poster}
                  alt={item.title || item.name || "Image"}
                  loading="lazy"
                  className={classes.image}
                />
              </Link>
              <Link
                className={classes.link}
                to={
                  !item.title
                    ? `/movflix/page?content_type=tv&id=${item.id}&title=${item.name}`
                    : `/movflix/page?content_type=movie&id=${item.id}&title=${item.title}`
                }
              >
                <p className={titleClass}>{item.title || item.name}</p>
              </Link>

              <div className={classes.info}>
                {item.vote_average !== undefined && <p>{`${Math.round(item.vote_average * 10) / 10}/10`}</p>}
                <p>
                  {item.release_date
                    ? item.release_date.slice(0, 4)
                    : item.first_air_date
                    ? item.first_air_date.slice(0, 4)
                    : t("no_year")}
                </p>
                <p>
                  {item.vote_count} {t("votes")}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <button
            onClick={() => {
              moreFunc();
            }}
            className={classes.button}
          >
            {t("more")}
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
