import React, { useEffect } from "react";
import classes from "./catalogueMain.module.css";
import {
  SmallCarousel,
  FullscreenCarousel,
  MediumCarousel,
} from "../carousels";

import SearchBar from "../searchBar/searchBar";
import { getMainPageMovies } from "../../http";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Preloader from "../decorative/preloader/preloader";
import { useNavigate } from "react-router";
import { Header } from "../header/header";

export const CatalogueMain = () => {
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  const dispatch = useDispatch();
  let isFetching = useSelector((state) => state.movies.isFetching);

  useEffect(() => {
    dispatch(getMainPageMovies(api_key));
  }, [api_key, dispatch]);
  let navigate = useNavigate();

  const latestMovies = useSelector((state) => state.movies.latestMovies);
  const topShows = useSelector((state) => state.movies.topShows);
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const popularShows = useSelector((state) => state.movies.popularShows);
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);

  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        {isFetching === true ? (
          <Preloader />
        ) : (
          <div>
            <FullscreenCarousel items={latestMovies} />

            <SmallCarousel
              items={topShows}
              title={"Top rated shows"}
              onClick={() => navigate(`/movflix/categories/shows/top rated`)}
              type="show"
            />

            <MediumCarousel
              items={popularMovies}
              title={"Trending movies"}
              onClick={() => navigate(`/movflix/categories/movies/popular`)}
            />
            <SearchBar />

            <MediumCarousel
              items={popularShows}
              title={"Popular shows"}
              onClick={() => navigate(`/movflix/categories/shows/popular`)}
            />

            <SmallCarousel
              items={upcomingMovies}
              title={"Upcoming movies"}
              onClick={() => navigate(`/movflix/categories/movies/upcoming`)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
