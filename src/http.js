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
} from "./store/actionCreators/actionCreators";
import axios from "axios";

const defaultParams = {
  page: 1,
  language: "en-US",
};

const tmdb_api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_MOVIES_API_KEY,
  },
});
const omdb_api = axios.create({
  baseURL: "https://omdbapi.com/",
  params: {
    apikey: process.env.REACT_APP_MOVIES_OMDB_API_KEY,
  },
});

export const getMainPageMovies = () => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const [np_movies, tp_shows, pop_movies, up_movies, pop_shows] = await Promise.all([
    tmdb_api.get("movie/now_playing", { params: defaultParams }),
    tmdb_api.get("tv/top_rated", { params: defaultParams }),
    tmdb_api.get("movie/popular", { params: defaultParams }),
    tmdb_api.get("movie/upcoming", { params: defaultParams }),
    tmdb_api.get("tv/popular", { params: defaultParams }),
  ]);

  dispatch(setLatestMovies(np_movies.data.results));
  dispatch(setTopShows({ topShows: tp_shows.data.results }));
  dispatch(setPopularMovies({ popularMovies: pop_movies.data.results }));
  dispatch(setUpcomingMovies({ upcomingMovies: up_movies.data.results }));
  dispatch(setPopularShows({ popularShows: pop_shows.data.results }));

  dispatch(setMoviesFetch(false));
};

export const getNewMovies = () => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get("movie/now_playing", {
    params: defaultParams,
  });
  dispatch(setLatestMovies(response.data.results));
  dispatch(setMoviesFetch(false));
};

export const getTopMovies = (currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get("movie/now_playing", {
    params: { ...defaultParams, page: currentPage },
  });
  dispatch(
    setTopMovies({
      topMovies: response.data.results,
      totalPages: response.data.total_pages,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getPopularMovies = (currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get("movie/popular", {
    params: { ...defaultParams, page: currentPage },
  });
  dispatch(
    setPopularMovies({
      popularMovies: response.data.results,
      totalPages: response.data.total_pages,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getUpcomingMovies = (currentPage) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get("movie/upcoming", {
    params: { ...defaultParams, page: currentPage },
  });
  dispatch(
    setUpcomingMovies({
      upcomingMovies: response.data.results,
      totalPages: response.data.total_pages,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getCurrentMovie = (movie_id, title) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  let id = movie_id;

  const response = await tmdb_api.get(`movie/${id}`, {
    params: {
      ...defaultParams,

      append_to_response: "keywords,reviews,external_ids,similar,credits,videos",
    },
  });
  let video_url = response.data.videos.results.filter(
    (video) => video.name === "Official Trailer" || video.name === "Trailer"
  )[0];

  dispatch(
    setCurrentMovie({
      currentMovie: response.data,
      keywords: response.data.keywords.keywords,
      socials: response.data.external_ids,
      reviews: response.data.reviews.results,
      similar: response.data.similar.results,
      credits: response.data.credits,
      video_url: video_url ? video_url : "",
    })
  );
  const resp = await omdb_api.get("/", {
    params: {
      t: title,
    },
  });
  dispatch(
    setDetails({
      awards: resp.data.Awards,
      director: resp.data.Director,
      writer: resp.data.Writer,
      actors: resp.data.Actors,
      rated: resp.data.Rated,
      language: resp.data.Language,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getSearchMovies = (query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get("search/movie", {
    params: { ...defaultParams, page, query },
  });
  dispatch(
    setSearchMovies({
      movies: response.data.results,
      totalPages: response.data.total_pages,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getSearchResults = (query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));

  const movies = await tmdb_api.get("search/movie", {
    params: { ...defaultParams, page, query },
  });
  dispatch(
    setSearchMovies({
      movies: movies.data.results,
      query: query,
    })
  );
  const shows = await tmdb_api.get("search/tv", {
    params: { ...defaultParams, page, query },
  });
  dispatch(
    setSearchTv({
      shows: shows.data.results,
    })
  );

  const actors = await tmdb_api.get("search/person", {
    params: { ...defaultParams, page, query },
  });
  dispatch(
    setSearchPersons({
      persons: actors.data.results,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getSearchTv = (query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const shows = await tmdb_api.get("search/tv", {
    params: { ...defaultParams, page, query },
  });
  dispatch(
    setSearchTv({
      shows: shows.data.results,
      totalPages: shows.data.totalPages,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getSearchPersons = (query, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));

  const actors = await tmdb_api.get("search/person", {
    params: { ...defaultParams, page, query },
  });
  dispatch(
    setSearchPersons({
      persons: actors.data.results,
      totalPages: actors.data.total_pages,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getCurrentShow = (show_id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get(`tv/${show_id}`, {
    params: {
      ...defaultParams,
      append_to_response: "keywords,external_ids,similar,reviews,content_ratings,credits,videos",
    },
  });
  let ratings = response.data.content_ratings.results.filter((rating) => rating.iso_3166_1 === "US");
  let video_url = response.data.videos.results.filter(
    (video) => video.name === "Official Trailer" || video.name === "Trailer"
  )[0];

  dispatch(
    setCurrentShow({
      currentShow: response.data,
      keywords: response.data.keywords.results,
      socials: response.data.external_ids,
      reviews: response.data.reviews.results,
      similar: response.data.similar.results,
      ratings: ratings,
      credits: response.data.credits,
      video_url: video_url ? video_url : "",
    })
  );

  dispatch(setMoviesFetch(false));
};

export const getSearchEpisodes = (show_id, season_number) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get(`tv/${show_id}/season/${season_number}`, {
    params: { ...defaultParams },
  });
  dispatch(
    setCurrentSeason({
      episodes: response.data.episodes,
      name: response.data.name,
      poster_path: response.data.poster_path,
      air_date: response.data.air_date,
      season_number: response.data.season_number,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getShowSearchCrew = (show_id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  const response = await tmdb_api.get(`tv/${show_id}/aggregate_credits`, {
    params: { ...defaultParams },
  });
  dispatch(setShowFullCredits({ cast: response.data.cast, crew: response.data.crew }));
  dispatch(setMoviesFetch(false));
};

export const getByCategory = (page, category, content_type, id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  if (content_type !== "similar") {
    const response = await tmdb_api.get(`${content_type}/${category}`, {
      params: { ...defaultParams, page: page },
    });
    dispatch(
      setByCategory({
        results: response.data.results,
        totalPages: response.data.total_pages,
      })
    );
  } else if (content_type === "similar") {
    const response = await tmdb_api.get(`${content_type}/${id}/similar`, {
      params: { ...defaultParams, page },
    });
    dispatch(
      setByCategory({
        results: response.data.results,
        totalPages: response.data.total_pages,
      })
    );
  }
  dispatch(setMoviesFetch(false));
};

export const getPerson = (person_id) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  // await fetch(
  //   `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits,external_ids,images,tagged_images`
  // )
  //   .then((res) => res.json())
  //   .then((result) => {
  //     dispatch(setCurrentPerson(result));
  //   });
  const response = await tmdb_api.get(`person/${person_id}`, {
    params: { ...defaultParams, append_to_response: "combined_credits,external_ids,images,tagged_images" },
  });
  dispatch(setCurrentPerson(response.data));
  dispatch(setMoviesFetch(false));
};

export const getDiscover = (content_type, filter, page, filterType) => async (dispatch) => {
  dispatch(setMoviesFetch(true));
  let response;
  filterType === "genre"
    ? (response = await tmdb_api.get(`discover/${content_type}`, {
        params: { ...defaultParams, sort_by: "vote_count.desc", with_genres: filter, page: page },
      }))
    : (response = await tmdb_api.get(`discover/${content_type}`, {
        params: { ...defaultParams, sort_by: "vote_count.desc", with_keywords: filter, page: page },
      }));
  dispatch(
    setByCategory({
      results: response.data.results,
      totalPages: response.data.total_pages,
    })
  );
  dispatch(setMoviesFetch(false));
};

export const getByKeyword = (content_type, keyword, page) => async (dispatch) => {
  dispatch(setMoviesFetch(true));

  const response = await tmdb_api.get(`discover/${content_type}`, {
    params: { ...defaultParams, sort_by: "vote_count.desc", with_keywords: keyword, page: page },
  });
  dispatch(
    setByCategory({
      results: response.data.results,
      totalPages: response.data.total_pages,
    })
  );
  dispatch(setMoviesFetch(false));
};
