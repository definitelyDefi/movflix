import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import classes from "./moviePage.module.css";
import background from "./../../assets/background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentMovie } from "../../http";
import poster_placeholder from "./../../assets/no_poster.png";
import { SmCarousel, Description, Header, ReviewCarousel, Preloader, DetailsBlock } from "../../components";
import { CsCarousel } from "../../components/carousels/csCarousel/csCarousel";

export const MoviePage = () => {
  let params = useParams()["*"].split("/");
  let search_title = params[1];
  let location = useLocation();
  let movie_id = params[0];
  const currentMovie = useSelector((state) => state.movies.currentMovie);
  const dispatch = useDispatch();
  let isFetching = useSelector((state) => state.global.isFetching);
  useEffect(() => {
    dispatch(getCurrentMovie(movie_id, search_title));
  }, [movie_id, search_title, dispatch]);

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
                    currentMovie.poster_path
                      ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
                      : poster_placeholder
                  }
                />

                <Description type="movie" data={currentMovie} />
              </div>
            </div>

            <div className={classes.infoBlock}>
              {currentMovie.reviews.length === 0 ? null : <ReviewCarousel items={currentMovie.reviews} />}

              <DetailsBlock content={currentMovie} content_type="movie" />

              <div className={classes.castBlock}>
                <h3 className={classes.castHeader}>The cast of the movie</h3>
                {/* <CastCarousel items={currentMovie.credits.cast.slice(0, 11)} /> */}
                <CsCarousel
                  items={currentMovie.credits.cast.slice(0, 11)}
                  moreButton={`${location.pathname}/cast_crew`}
                />
              </div>
              {currentMovie.similar.length === 0 ? null : (
                <SmCarousel
                  header={"Similar movies"}
                  isLight={true}
                  items={currentMovie.similar}
                  moreButton={`/movflix/categories/movies/similar/${currentMovie.id}`}
                  marginTop={"30px"}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
