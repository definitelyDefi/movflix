import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import classes from "./showPage.module.css";
import background from "./../../assets/background.jpg";
import poster_placeholder from "./../../assets/no_poster.png";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentShow } from "../../http";
import {
  Header,
  SmCarousel,
  ReviewCarousel,
  Preloader,
  DetailsBlock,
  LastSeason,
  Description,
  CsCarousel,
  Trailer,
} from "../../components";

export const ShowPage = () => {
  let dispatch = useDispatch();
  let params = useParams();
  let show_id = params.id;
  let location = useLocation();
  const currentShow = useSelector((state) => state.shows.currentShow);

  let seasons = useSelector((state) => state.shows.currentShow.seasons);
  let lastSeason = seasons.slice(-1)[0];
  let isFetching = useSelector((state) => state.global.isFetching);

  useEffect(() => {
    dispatch(getCurrentShow(show_id));
  }, [dispatch, show_id]);

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        {isFetching ? (
          <Preloader />
        ) : (
          <div>
            <div className={classes.container}>
              <img className={classes.backgroundImage} src={background} alt={background} />
              <div className={classes.content}>
                <img
                  className={classes.posterImage}
                  alt=""
                  src={
                    currentShow.poster_path
                      ? `https://image.tmdb.org/t/p/original${currentShow.poster_path}`
                      : poster_placeholder
                  }
                />
                <Description data={currentShow} type={"tv show"} />
              </div>
            </div>
            <div className={classes.infoWrapper}>
              {currentShow.reviews.length === 0 ? null : <ReviewCarousel items={currentShow.reviews} />}

              <div className={classes.details}>
                <div>
                  <LastSeason season={lastSeason} title={currentShow.name} />
                  {currentShow.video_url ? <Trailer id={currentShow.video_url.key} /> : null}

                  <div className={classes.castBlock}>
                    <h3 className={classes.castHeader}>The cast of the series</h3>
                    <CsCarousel
                      items={currentShow.credits.cast.slice(0, 11)}
                      moreButton={`${location.pathname}/cast_crew`}
                    />
                  </div>
                </div>

                <DetailsBlock content={currentShow} variant="show" content_type="show" />
              </div>
              <SmCarousel
                header={"Similar shows"}
                isLight={true}
                items={currentShow.similar}
                moreButton={`/movflix/categories/shows/similar/${currentShow.id}`}
                marginTop={"30px"}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
