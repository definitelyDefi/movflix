import React, { useEffect } from "react";
import { useParams } from "react-router";
import classes from "./moviePage.module.css";
import background from "./../../assets/background.jpg";
import { DetailsBlock } from "../detailsBlock/detailsBlock";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentMovie } from "../../http";
import Preloader from "../decorative/preloader/preloader";
import { SmallCarousel, ReviewCarousel, CastCarousel } from "../carousels";
import poster_placeholder from "./../../assets/no_poster.png";
import { useNavigate } from "react-router";
import { Header } from "../header/header";
import { Description } from "../description/description";

export const MoviePage = () => {
  let params = useParams()["*"].split("/");
  let search_title = params[1];
  let movie_id = params[0];
  let navigate = useNavigate();
  const currentMovie = useSelector((state) => state.movies.currentMovie);

  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  const omdb_api_key = "aee3d546";
  const dispatch = useDispatch();
  let isFetching = useSelector((state) => state.movies.isFetching);
  useEffect(() => {
    dispatch(getCurrentMovie(api_key, movie_id, search_title, omdb_api_key));
  }, [movie_id, search_title, api_key, dispatch]);

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
                    currentMovie.poster_path
                      ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
                      : poster_placeholder
                  }
                />

                <Description type="movie" data={currentMovie} />
              </div>
            </div>
            {currentMovie.reviews.length === 0 ? null : (
              <ReviewCarousel items={currentMovie.reviews} />
            )}

            <DetailsBlock content={currentMovie} content_type="movie" />

            <div className={classes.castBlock}>
              <h3 className={classes.castHeader}>The cast of the movie</h3>
              <CastCarousel items={currentMovie.credits.cast.slice(0, 11)} />
            </div>
            {currentMovie.similar.length === 0 ? null : (
              <SmallCarousel
                items={currentMovie.similar}
                title="Similar"
                variant="light"
                autoplay={false}
                onClick={() =>
                  navigate(
                    `/movflix/categories/movies/similar/${currentMovie.id}`
                  )
                }
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
