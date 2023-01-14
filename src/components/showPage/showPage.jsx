import { LastSeason } from "../lastSeason/lastSeason";
import { Description } from "./../description/description";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "./showPage.module.css";
import background from "./../../assets/background.jpg";
import { DetailsBlock } from "../detailsBlock/detailsBlock";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentShow } from "../../http";
import Preloader from "../decorative/preloader/preloader";
import { SmallCarousel, CastCarousel, ReviewCarousel } from "../carousels";

import { Header } from "../header/header";
import poster_placeholder from "./../../assets/no_poster.png";

export const ShowPage = () => {
  let dispatch = useDispatch();
  let params = useParams();
  let navigate = useNavigate();
  let show_id = params.id;

  const currentShow = useSelector((state) => state.movies.currentShow);
  let seasons = useSelector((state) => state.movies.currentShow.seasons);
  let lastSeason = seasons.slice(-1)[0];

  const api_key = process.env.REACT_APP_MOVIES_API_KEY;

  let isFetching = useSelector((state) => state.movies.isFetching);

  useEffect(() => {
    dispatch(getCurrentShow(api_key, show_id));
  }, [api_key, dispatch, show_id]);

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        {isFetching ? (
          <Preloader />
        ) : (
          <div>
            <div className={classes.container}>
              <img
                className={classes.backgroundImage}
                src={background}
                alt={background}
              />
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
            {currentShow.reviews.length === 0 ? null : (
              <ReviewCarousel items={currentShow.reviews} />
            )}

            <div className={classes.details}>
              <div>
                <LastSeason season={lastSeason} title={currentShow.name} />
                <div className={classes.castBlock}>
                  <h3 className={classes.castHeader}>The cast of the series</h3>
                  <CastCarousel items={currentShow.credits.cast.slice(0, 11)} />
                </div>
              </div>

              <DetailsBlock
                content={currentShow}
                variant="show"
                content_type="show"
              />
            </div>

            <SmallCarousel
              items={currentShow.similar}
              title="Similar shows"
              variant="light"
              type="show"
              autoplay={false}
              onClick={() =>
                navigate(`/movflix/categories/shows/similar/${currentShow.id}`)
              }
            />
          </div>
        )}
      </div>
    </>
  );
};
