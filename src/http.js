import {
  setLatestMovies,
  setPopularMovies,
  setTopMovies,
  setUpcomingMovies,
  setCurrentMovie,
  setDetails,
  setSearchMovies,
  setSearchTv,
  setSearchPersons,
  setMoviesFetch,
  setCurrentShow,
  setCurrentSeason,
  setShowFullCredits,
  setByCategory,
  setCurrentPerson,
  setTopShows,
  setPopularShows,
} from "./store/reducers/moviesReducer";

export const getMainPageMovies = (API_KEY) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1` //Latest movies
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setLatestMovies(result.results));
    });

  await fetch(
    ` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1` //Top shows
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setTopShows({ topShows: result.results }));
    });

  await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1` //Popular movies
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setPopularMovies({ popularMovies: result.results }));
    });

  await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1` //Upcoming movies
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setUpcomingMovies({ upcomingMovies: result.results }));
    });

  await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1` //Popular shows
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setPopularShows({ popularShows: result.results }));
    });
  dispatch(setMoviesFetch(false));
};

export const getNewMovies = (API_KEY) => async (dispatch) => {
  await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setLatestMovies(result.results));
    });
};

export const getTopMovies = (API_KEY, currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setTopMovies({
          topMovies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getPopularMovies = (API_KEY, currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setPopularMovies({
          popularMovies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getUpcomingMovies = (API_KEY, currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setUpcomingMovies({
          upcomingMovies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getCurrentMovie =
  (tmdb_api_key, movie_id, title, omdb_api_key) => async (dispatch) => {
    dispatch(setMoviesFetch(true));
    await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${tmdb_api_key}&language=en-US&append_to_response=keywords,reviews,external_ids,similar,credits`
    )
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setCurrentMovie({
            currentMovie: result,
            keywords: result.keywords.keywords,
            socials: result.external_ids,
            reviews: result.reviews.results,
            similar: result.similar.results,
            credits: result.credits,
          })
        );
      });
    await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${omdb_api_key}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setDetails({
            awards: result.Awards,
            director: result.Director,
            writer: result.Writer,
            actors: result.Actors,
            rated: result.Rated,
            language: result.Language,
          })
        );
      });

    dispatch(setMoviesFetch(false));
  };

export const getSearchMovies = (API_KEY, query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setSearchMovies({
          movies: result.results,
          totalPages: result.total_pages,
        })
      );
    });
  dispatch(setMoviesFetch(false));
};

export const getSearchResults = (API_KEY, query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&page=${page}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(
        setSearchMovies({
          movies: result.results,
          query: query,
        })
      );
    });
  await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}&page=1`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setSearchTv({ shows: result.results }));
    });

  await fetch(
    `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${API_KEY}&page=1`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setSearchPersons({ persons: result.results }));
    });
  dispatch(setMoviesFetch(false));
};

export const getSearchTv =
  (API_KEY, query, currentPage) => async (dispatch) => {
    dispatch(setMoviesFetch(true));
    await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setSearchTv({
            shows: result.results,
            totalPages: result.total_pages,
          })
        );
      });
    dispatch(setMoviesFetch(false));
  };

export const getSearchPersons =
  (API_KEY, query, currentPage) => async (dispatch) => {
    dispatch(setMoviesFetch(true));

    await fetch(
      `https://api.themoviedb.org/3/search/person?query=${query}&api_key=${API_KEY}&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setSearchPersons({
            persons: result.results,
            totalPages: result.total_pages,
          })
        );
      });
    dispatch(setMoviesFetch(false));
  };

export const getCurrentShow = (tmdb_api_key, show_id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/tv/${show_id}?api_key=${tmdb_api_key}&language=en-US&append_to_response=keywords,external_ids,reviews,similar,content_ratings,credits`
  )
    .then((res) => res.json())
    .then((result) => {
      let ratings = result.content_ratings.results.filter(
        (rating) => rating.iso_3166_1 === "US"
      );
      dispatch(
        setCurrentShow({
          currentShow: result,
          keywords: result.keywords.results,
          socials: result.external_ids,
          reviews: result.reviews.results,
          genres: result.genres,
          similar: result.similar.results,
          ratings: ratings,
          credits: result.credits,
        })
      );
    });

  dispatch(setMoviesFetch(false));
};

export const getSearchEpisodes =
  (API_KEY, tv_id, season_number) => async (dispatch) => {
    dispatch(setMoviesFetch(true));

    await fetch(
      `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((result) => {
        dispatch(
          setCurrentSeason({
            episodes: result.episodes,
            name: result.name,
            poster_path: result.poster_path,
            air_date: result.air_date,
            season_number: result.season_number,
          })
        );
      });
    dispatch(setMoviesFetch(false));
  };

export const getShowSearchCrew = (API_KEY, tv_id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/tv/${tv_id}/aggregate_credits?api_key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setShowFullCredits({ cast: result.cast, crew: result.crew }));
    });
  dispatch(setMoviesFetch(false));
};

export const getByCategory =
  (API_KEY, currentPage, category, content_type, id) => async (dispatch) => {
    dispatch(setMoviesFetch(true));

    if (content_type === "movies") {
      if (category === "upcoming") {
        await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      } else if (category === "top rated") {
        await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      } else if (category === "latest") {
        await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      } else if (category === "popular") {
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      } else if (category === "similar") {
        await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      }
    } else if (content_type === "shows") {
      if (category === "latest") {
        await fetch(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      } else if (category === "top rated") {
        await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      } else if (category === "popular") {
        await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      } else if (category === "similar") {
        await fetch(
          `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      }
    } else if (content_type === "persons") {
      if (category === "popular") {
        await fetch(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        )
          .then((res) => res.json())
          .then((result) => {
            dispatch(
              setByCategory({
                results: result.results,
                totalPages: result.total_pages,
              })
            );
          });
      }
    }

    dispatch(setMoviesFetch(false));
  };

export const getPerson = (API_KEY, person_id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  await fetch(
    `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits,external_ids,images,tagged_images`
  )
    .then((res) => res.json())
    .then((result) => {
      dispatch(setCurrentPerson(result));
    });
  dispatch(setMoviesFetch(false));
};
