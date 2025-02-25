import React, {useEffect, useState} from "react";
import classes from "./catalogueMain.module.css";
import {getMainPageMovies} from "../../api";
import {Preloader, FsCarousel, MdCarousel, SmCarousel, SearchBar} from "../../components";
import {ScrollButton} from "../../components/decorative/buttons/buttons";
import ErrorPage from "../../components/errorPage/ErrorPage";
import {useTranslation} from "react-i18next";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date: string;
  first_air_date?: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  vote_count: number;
}

interface CatalogueState {
  isLoading: boolean;
  isError: boolean;
  latestMovies: MediaItem[];
  topShows: MediaItem[];
  popularMovies: MediaItem[];
  popularShows: MediaItem[];
  upcomingMovies: MediaItem[];
}

export const CatalogueMain: React.FC = () => {
  const {t} = useTranslation();
  const [state, setState] = useState<CatalogueState>({
    isLoading: true,
    isError: false,
    latestMovies: [],
    topShows: [],
    popularMovies: [],
    popularShows: [],
    upcomingMovies: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setState((prevState) => ({...prevState, isLoading: true, isError: false}));

      try {
        const {latestMovies, topShows, popularMovies, popularShows, upcomingMovies} = await getMainPageMovies();

        setState({
          isLoading: false,
          isError: false,
          latestMovies,
          topShows,
          popularMovies,
          popularShows,
          upcomingMovies,
        });
      } catch (error) {
        console.error("Error fetching main page movies:", error);
        setState((prevState) => ({...prevState, isLoading: false, isError: true}));
      }
    };

    fetchData();
  }, []);

  const {isLoading, isError, latestMovies, topShows, popularMovies, popularShows, upcomingMovies} = state;

  if (isError) {
    return <ErrorPage message="Unable to load the movies and shows. Please try again later." />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={classes.mainContainer}>
        <>
          <FsCarousel items={latestMovies} />

          <div className={classes.wrapper}>
            <SmCarousel
              header={t("top_rated_shows")}
              isLight={false}
              items={topShows}
              moreButton="tv/best"
              marginTop="30px"
            />

            <MdCarousel
              header={t("trending_movies")}
              items={popularMovies}
              moreButton="movie/popular"
              marginTop="30px"
            />
            <SearchBar />

            <MdCarousel header={t("popular_shows")} items={popularShows} moreButton="tv/popular" marginTop="30px" />

            <SmCarousel
              header={t("upcoming_movies")}
              isLight={false}
              items={upcomingMovies}
              moreButton="movie/upcoming"
            />
          </div>
        </>
      </div>
      <ScrollButton />
    </div>
  );
};
