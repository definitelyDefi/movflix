import prettifyMoney from "../../helpers/prettifyMoney";
import { types } from "../types";

const defaultStore = {
  latestMovies: [],
  topMovies: [{ genre_ids: [20], release_date: 0 }],
  popularMovies: [{ genre_ids: [20], release_date: 0 }],
  upcomingMovies: [{ genre_ids: [20], release_date: 0 }],
  currentMovie: {
    credits: {
      cast: [{ known_for_department: "", name: "", profile_path: "", character: "" }],
      crew: [{ name: "", department: "", profile_path: "", job: "" }],
    },
    poster_path: "",
    title: "",
    rated: null,
    release_date: "",
    genres: [{ name: "", id: 0 }],
    keywords: [{ name: "", id: 0 }],
    reviews: [
      {
        author: "",
        content: "",
        created_at: "",
        author_details: { avatar_path: "" },
      },
    ],
    runtime: 0,
    vote_average: 0,
    tagline: "",
    overview: "",
    director: null,
    actors: null,
    writer: null,
    original_title: "",
    language: "",
    budget: 0,
    revenue: 0,
    homepage: "",
    external_ids: {
      facebook_id: "",
      twitter_id: "",
      instagram_id: "",
    },
    awards: "",
    similar: [
      {
        release_date: "",
        first_air_date: "",
        genre_ids: [{ name: "", id: 0 }],
      },
    ],
  },
};

export let moviesReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case types.SET_LATEST_MOVIES:
      return { ...state, latestMovies: action.latestMovies };

    case types.SET_MOVIE_FULL_CREDITS:
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          full_credits: { crew: action.crew, cast: action.cast },
        },
      };
    case types.SET_TOP_RATED_MOVIES:
      return {
        ...state,
        topMovies: action.topMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };

    case types.SET_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: action.popularMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };

    case types.SET_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: action.upcomingMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };
    case types.SET_DETAILS_MOVIE:
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          awards: action.awards,
          director: action.director,
          writer: action.writer,
          actors: action.actors,
          rated: action.rated,
          language: action.language,
        },
      };

    case types.SET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: {
          ...action.currentMovie,

          budget: prettifyMoney(action.currentMovie.budget),
          revenue: prettifyMoney(action.currentMovie.revenue),
          keywords: action.keywords,
          reviews: action.reviews,
          external_ids: action.socials,
          similar: action.similar,
          credits: action.credits,
        },
      };

    default:
      return state;
  }
};
