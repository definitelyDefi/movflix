import { types } from "./../types";

export const setLatestMovies = (payload) => ({
  type: types.SET_LATEST_MOVIES,
  latestMovies: payload,
});

export const setMoviesFetch = (payload) => ({
  type: types.SET_FETCHING,
  fetch: payload,
});

export const setSearchMovies = (payload) => ({
  type: types.SET_SEARCH_MOVIES,
  movies: payload.movies,
  query: payload.query,
  totalPages: payload.totalPages,
});

export const setCurrentPage = (payload) => ({
  type: types.SET_CURRENT_PAGE,
  currentPage: payload,
});

export const setSearchPersons = (payload) => ({
  type: types.SET_SEARCH_PERSON,
  persons: payload.persons,
  totalPages: payload.totalPages,
});

export const setSearchTv = (payload) => ({
  type: types.SET_SEARCH_TV,
  shows: payload.shows,
  totalPages: payload.totalPages,
});

export const setCurrentMovie = (payload) => ({
  type: types.SET_CURRENT_MOVIE,
  currentMovie: payload.currentMovie,
  keywords: payload.keywords,
  socials: payload.socials,
  reviews: payload.reviews,
  similar: payload.similar,
  credits: payload.credits,
  video_url: payload.video_url,
});

export const setCurrentPerson = (payload) => ({
  type: types.SET_CURRENT_PERSON,
  currentPerson: payload,
});

export const setCurrentShow = (payload) => ({
  type: types.SET_CURRENT_SHOW,
  currentShow: payload.currentShow,
  keywords: payload.keywords,
  external_ids: payload.socials,
  reviews: payload.reviews,
  similar: payload.similar,
  ratings: payload.ratings,
  credits: payload.credits,
  video_url: payload.video_url,
});

export const setDetails = (payload) => ({
  type: types.SET_DETAILS_MOVIE,
  awards: payload.awards,
  director: payload.director,
  writer: payload.writer,
  actors: payload.actors,
  rated: payload.rated,
  language: payload.language,
});

export const setTopMovies = (payload) => ({
  type: types.SET_TOP_RATED_MOVIES,
  topMovies: payload.topMovies,
  totalPages: payload.totalPages,
});

export const setPopularShows = (payload) => ({
  type: types.SET_POPULAR_SHOWS,
  popularShows: payload.popularShows,
});

export const setByCategory = (payload) => ({
  type: types.SET_CATEGORISED,
  results: payload.results,
  totalPages: payload.totalPages,
});

export const setPopularMovies = (payload) => ({
  type: types.SET_POPULAR_MOVIES,
  popularMovies: payload.popularMovies,
  totalPages: payload.totalPages,
});

export const setUpcomingMovies = (payload) => ({
  type: types.SET_UPCOMING_MOVIES,
  upcomingMovies: payload.upcomingMovies,
  totalPages: payload.totalPages,
});

export const setTopShows = (payload) => ({
  type: types.SET_TOP_RATED_SHOWS,
  topShows: payload.topShows,
});

export const setCurrentSeason = (payload) => ({
  type: types.SET_CURRENT_SEASON,
  episodes: payload.episodes,
  name: payload.name,
  poster_path: payload.poster_path,
  air_date: payload.air_date,
  season_number: payload.season_number,
});

export const setShowFullCredits = (payload) => ({
  type: types.SET_SHOW_FULL_CREDITS,
  cast: payload.cast,
  crew: payload.crew,
});

export const setMovieFullCredits = (payload) => ({
  type: types.SET_MOVIE_FULL_CREDITS,
  cast: payload.cast,
  crew: payload.crew,
});
