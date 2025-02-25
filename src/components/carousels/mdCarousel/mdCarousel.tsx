import React from "react";
import classes from "./mdCarousel.module.css";
import {Link, useNavigate} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import {getImageUrl} from "../../../helpers/getImage";
import poster from "./../../../assets/no_poster.png";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {resetFilters, setCategory, setContentType, setPage} from "../../../store/filtersSlice";
import {useTranslation} from "react-i18next";
type ContentType = "movie" | "tv";

function isContentType(value: unknown): value is ContentType {
  return value === "movie" || value === "tv";
}
interface CarouselItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  vote_count?: number;
}

interface MdCarouselProps {
  items: CarouselItem[];
  moreButton: string;
  header: string;
  marginTop?: string;
}

export const MdCarousel: React.FC<MdCarouselProps> = ({items, moreButton, header, marginTop}) => {
  let {t} = useTranslation();
  let dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  let spplited = moreButton.split("/");
  console.log("splitted", spplited);
  let content_type = spplited[0];
  console.log(isContentType(content_type));
  let category = spplited[1];
  return (
    <>
      <h1 className={classes.header} style={marginTop ? {marginTop} : undefined}>
        {header}
      </h1>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
        centeredSlides={false}
        className="mySwiper"
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
            slidesPerView: 3,
          },
          1366: {
            width: 1366,
            slidesPerView: 4,
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
                  alt={item.title || item.name || "No Title"}
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
                <p className={classes.title}>{item.title || item.name}</p>
              </Link>

              <div className={classes.info}>
                {item.vote_average && <p>{`${(item.vote_average * 10).toFixed(1)}/10`}</p>}
                <p>
                  {item.release_date
                    ? item.release_date.slice(0, 4)
                    : item.first_air_date
                    ? item.first_air_date.slice(0, 4)
                    : t("no_year")}
                </p>
                {item.vote_count && (
                  <p>
                    {item.vote_count} {t("votes")}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <button
            onClick={() => {
              dispatch(setPage(1));
              dispatch(resetFilters());
              dispatch(setContentType(content_type));
              dispatch(setCategory(category));
              navigate(`/movflix/discover/${content_type}?category=${category}`);
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
