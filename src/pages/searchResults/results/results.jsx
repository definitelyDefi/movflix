import React, { useEffect } from "react";
import classes from "./results.module.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "./../../../http";
import poster_placeholder from "./../../../assets/no_poster.png";
import { Header, Preloader } from "../../../components";

export const Results = () => {
  let query = useParams()["*"];
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.global.isFetching);

  useEffect(() => {
    dispatch(getSearchResults(query));
  }, [dispatch, query]);

  const movies = useSelector((state) => state.search.searchResults.movies);
  const shows = useSelector((state) => state.search.searchResults.shows);
  const persons = useSelector((state) => state.search.searchResults.persons);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <h3 className={classes.title}>{`Search results for '${query}'`}</h3>

        {movies.length > 0 && isFetching === false ? (
          <div>
            <h1 className={classes.sectionTitle}>Movies</h1>
            <div className={classes.items}>
              {movies.slice(0, 6).map((movie) => (
                <div className={classes.item}>
                  <img
                    onClick={() => navigate(`/movflix/movie/page/${movie.id}/${movie.title}`)}
                    className={classes.itemImage}
                    alt={" "}
                    src={
                      movie.poster_path !== null
                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        : poster_placeholder
                    }
                  />
                  <h3 className={classes.itemTitle}>{movie.title}</h3>
                  <div className={classes.itemInfo}>
                    <h3 className={classes.itemPopularity}>
                      {movie.vote_average !== 0 ? `${movie.vote_average}/10` : "No rating"}
                    </h3>
                    <h3 className={classes.itemYear}>
                      {movie.release_date ? movie.release_date.slice(0, 4) : "No year"}
                    </h3>
                    <h3 className={classes.itemNsfw}>{movie.adult ? "18+" : "16+"}</h3>
                  </div>
                </div>
              ))}
              {movies.length > 6 ? (
                <button className={classes.viewMore} onClick={() => navigate(`/movflix/search/expand/${query}/movies`)}>
                  View more
                </button>
              ) : null}
            </div>
          </div>
        ) : isFetching === true ? (
          <div>
            <Preloader variant="white" />
          </div>
        ) : !isFetching && movies.length === 0 ? (
          <h1 className={classes.sectionError}>No movies found :(</h1>
        ) : null}

        {shows.length > 0 && isFetching === false ? (
          <div>
            <h1 className={classes.sectionTitle}>Shows</h1>
            <div className={classes.items}>
              {shows.slice(0, 6).map((show) => (
                <div className={classes.item}>
                  <img
                    className={classes.itemImage}
                    alt={" "}
                    onClick={() => {
                      navigate(`/movflix/tv/page/${show.id}/${show.name}`);
                    }}
                    src={
                      show.poster_path != null
                        ? `https://image.tmdb.org/t/p/original${show.poster_path}`
                        : poster_placeholder
                    }
                  />
                  <h3 className={classes.itemTitle}>{show.name}</h3>
                  <div className={classes.itemInfo}>
                    <h3 className={classes.itemPopularity}>
                      {show.vote_average !== 0 ? `${show.vote_average}/10` : "No rating"}
                    </h3>
                    <h3 className={classes.itemYear}>
                      {show.first_air_date === undefined ? "No year" : show.first_air_date.slice(0, 4)}
                    </h3>
                    <h3 className={classes.itemNsfw}>{show.adult ? "18+" : "16+"}</h3>
                  </div>
                </div>
              ))}
              {shows.length > 6 ? (
                <button className={classes.viewMore} onClick={() => navigate(`/movflix/search/expand/${query}/shows`)}>
                  View more
                </button>
              ) : null}
            </div>
          </div>
        ) : isFetching === true ? (
          <Preloader variant="white" />
        ) : (
          <h1 className={classes.sectionError}>No tv shows found :(</h1>
        )}

        {persons.length > 0 && isFetching === false ? (
          <div>
            <h1 className={classes.sectionTitle}>People</h1>
            <div className={classes.items}>
              {persons
                .slice(0, 6)
                .filter(function filtering(person) {
                  if (person.known_for) {
                    return true;
                  }
                  return false;
                })
                .map((person) => (
                  <div className={classes.item}>
                    <img
                      className={classes.itemImage}
                      src={
                        person.profile_path != null
                          ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                          : poster_placeholder
                      }
                      onClick={() => {
                        navigate(`/movflix/persons/page/${person.id}/${person.name}`);
                      }}
                      alt={" "}
                    />
                    <h3 className={classes.itemTitle}>{person.name}</h3>
                    <div className={classes.itemInfo}>
                      <h3 className={classes.itemPopularity}>
                        {person.known_for.map((item) => (
                          <h3 className={classes.itemJobs}>{item.title || item.name}</h3>
                        ))}
                      </h3>
                    </div>
                  </div>
                ))}
              {persons.length > 6 ? (
                <button
                  className={classes.viewMore}
                  onClick={() => navigate(`/movflix/search/expand/${query}/persons`)}
                >
                  View more
                </button>
              ) : null}
            </div>
          </div>
        ) : isFetching === true ? (
          <Preloader variant="white" />
        ) : (
          <h1 className={classes.sectionError}>No people found :(</h1>
        )}
      </div>
    </>
  );
};
