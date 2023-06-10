import React, { useEffect } from "react";
import classes from "./catalogueMain.module.css";
import { getMainPageMovies } from "../../http";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Header, Preloader, FsCarousel, MdCarousel, SmCarousel, SearchBar } from "../../components";
import { ScrollButton } from "../../components/decorative/buttons/buttons";

export const CatalogueMain = () => {
  const dispatch = useDispatch();
  let isFetching = useSelector((state) => state.global.isFetching);
  const latestMovies = useSelector((state) => state.movies.latestMovies);
  const topShows = useSelector((state) => state.shows.topShows);
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const popularShows = useSelector((state) => state.shows.popularShows);
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);

  useEffect(() => {
    dispatch(getMainPageMovies());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        {isFetching === true ? (
          <Preloader />
        ) : (
          <>
            <FsCarousel items={latestMovies} />

            <div className={classes.wrapper}>
              <SmCarousel
                header={"Top rated shows"}
                isLight={false}
                items={topShows}
                moreButton={`/movflix/categories/movies/top rated`}
                marginTop={"30px"}
              />

              <MdCarousel
                header={"Trending movies"}
                items={popularMovies}
                moreButton={`/movflix/categories/movie/popular`}
                marginTop={"30px"}
              />
              <SearchBar />

              <MdCarousel
                header={"Popular shows"}
                items={popularShows}
                moreButton={`/movflix/categories/tv/popular`}
                marginTop={"30px"}
              />

              <SmCarousel
                header={"Upcoming movies"}
                isLight={false}
                items={upcomingMovies}
                moreButton={`/movflix/categories/movie/upcoming`}
              />
            </div>
          </>
        )}
      </div>
      <ScrollButton />
    </div>
  );
};
