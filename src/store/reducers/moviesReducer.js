import prettifyMoney from "../../helpers/prettifyMoney";

const SET_LATEST_MOVIES = "SET_LATEST_MOVIES";
const SET_TOP_RATED_MOVIES = "SET_TOP_RATED_MOVIES";
const SET_POPULAR_MOVIES = "SET_POPULAR_MOVIES";
const SET_UPCOMING_MOVIES = "SET_UPCOMING_MOVIES";
const SET_CURRENT_MOVIE = "SET_CURRENT_MOVIE";
const SET_TOP_RATED_SHOWS = "SET_TOP_RATED_SHOWS";
const SET_CURRENT_SHOW = "SET_CURRENT_SHOW";
const SET_POPULAR_SHOWS = "SET_POPULAR_SHOWS";
const SET_FETCHING = "SET_FETCHING";
const SET_SEARCH_MOVIES = "SET_SEARCH_MOVIES";
const SET_SEARCH_TV = "SET_SEARCH_TV";
const SET_SEARCH_PERSON = "SET_SEARCH_PERSON";
const SET_DETAILS_MOVIE = "SET_DETAILS_MOVIE";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_CURRENT_SEASON = "SET_CURRENT_SEASON";
const SET_SHOW_FULL_CREDITS = "SET_SHOW_FULL_CREDITS";
const SET_MOVIE_FULL_CREDITS = "SET_MOVIE_FULL_CREDITS";
const SET_CATEGORISED = "SET_BY_CATEGORY";
const SET_CURRENT_PERSON = "SET_CURRENT_PERSON";

const defaultStore = {
  isError: false,
  latestMovies: [],
  byCategory: { results: [{ known_for: [] }], totalPages: 0 },
  topMovies: [{ genre_ids: [20], release_date: 0 }],
  popularMovies: [{ genre_ids: [20], release_date: 0 }],
  upcomingMovies: [{ genre_ids: [20], release_date: 0 }],
  topShows: [
    {
      poster_path: "",
      name: "",
      first_air_date: "",
      genres: [{ name: "", id: 0 }],
      vote_average: 0,
    },
  ],
  popularShows: [
    {
      poster_path: "",
      name: "",
      first_air_date: "",
      genres: [{ name: "", id: 0 }],
      vote_average: 0,
    },
  ],
  currentMovie: {
    credits: {
      cast: [
        { known_for_department: "", name: "", profile_path: "", character: "" },
      ],
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
  currentShow: {
    full_credits: {
      cast: [
        {
          known_for_department: "",
          name: "",
          profile_path: "",
          total_episodes_count: "",
          roles: [{ character: "", episode_count: 0 }],
        },
      ],
      crew: [
        {
          known_for_department: "",
          name: "",
          profile_path: "",
          department: "",
          total_episodes_count: "",
          jobs: [{ job: "", episode_count: 0 }],
        },
      ],
    },
    credits: {
      cast: [
        { known_for_department: "", name: "", profile_path: "", character: "" },
      ],
      crew: [{ name: "", department: "", profile_path: "", job: "" }],
    },
    ratings: [{ iso_3166_1: "", rating: "" }],
    poster_path: "",
    name: "",
    rated: null,
    first_air_date: "",
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
    episode_run_time: "",
    number_of_episodes: 0,
    number_of_seasons: 0,
    vote_average: 0,
    tagline: "",
    overview: "",
    seasons: [
      {
        name: "",
        air_date: "",
        episode_count: 0,
        overview: "",
        poster_path: "",
        season_number: 0,
        id: 0,
      },
    ],
    similar: [{ first_air_date: "" }],
    original_name: "",
    status: "",
    homepage: "",
    external_ids: {
      facebook_id: "",
      twitter_id: "",
      instagram_id: "",
    },
    type: "",
    networks: [{ id: 0, logo_path: "" }],
    currentSeason: {
      episodes: [
        {
          air_date: "",
          episode_number: 0,
          id: 0,
          name: "",
          overview: "",
          still_path: "",
          vote_average: "",
        },
      ],
      name: "",
      poster_path: "",
      air_date: "",
      season_number: "",
    },
  },
  isFetching: false,
  searchResults: {
    currentPage: 1,
    totalPages: "",
    query: "",
    movies: [{}],
    persons: [{}],
    shows: [{}],
    keywords: [{}],
  },
  currentPerson: {
    also_known_as: [],
    biography: "",
    birthday: "",
    deathday: "",
    homepage: "",
    imdb_id: "",
    known_for_department: "",
    name: "",
    place_of_birth: "",
    popularity: "",
    profile_path: "",
    known_for: [{}],
    combined_credits: {
      cast: [
        { id: 0, title: "", release_date: "", media_type: "", character: "" },
      ],
      crew: [
        {
          id: 0,
          title: "",
          release_date: "",
          media_type: "",
          department: "",
          job: "",
        },
      ],
    },
    external_ids: {
      tvrage_id: "",
      facebook_id: "",
      instagram_id: "",
      twitter_id: "",
    },
    images: {
      profiles: [{ aspect_ratio: "", file_path: "" }],
    },
  },
};

export let moviesReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case SET_CURRENT_SEASON:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          currentSeason: {
            episodes: action.episodes,
            name: action.name,
            poster_path: action.poster_path,
            air_date: action.air_date,
            season_number: action.season_number,
          },
        },
      };
    case SET_LATEST_MOVIES:
      return { ...state, latestMovies: action.latestMovies };
    case SET_CATEGORISED:
      return {
        ...state,
        byCategory: { results: action.results, totalPages: action.totalPages },
      };
    case SET_SHOW_FULL_CREDITS:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          full_credits: { crew: action.crew, cast: action.cast },
        },
      };
    case SET_TOP_RATED_SHOWS:
      return {
        ...state,
        topShows: action.topShows,
      };
    case SET_POPULAR_SHOWS:
      return {
        ...state,
        popularShows: action.popularShows,
      };
    case SET_CURRENT_PERSON:
      return {
        ...state,
        currentPerson: { ...state.currentPerson, ...action.currentPerson },
      };
    case SET_MOVIE_FULL_CREDITS:
      return {
        ...state,
        currentMovie: {
          ...state.currentMovie,
          full_credits: { crew: action.crew, cast: action.cast },
        },
      };
    case SET_TOP_RATED_MOVIES:
      return {
        ...state,
        topMovies: action.topMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };

    case SET_POPULAR_MOVIES:
      return {
        ...state,
        popularMovies: action.popularMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };

    case SET_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: action.upcomingMovies,
        searchResults: {
          ...state.searchResults,
          totalPages: action.totalPages,
        },
      };
    case SET_DETAILS_MOVIE:
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

    case SET_CURRENT_MOVIE:
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
    case SET_CURRENT_SHOW:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          ...action.currentShow,
          keywords: action.keywords,
          external_ids: action.external_ids,
          similar: action.similar,
          reviews: action.reviews,
          ratings: action.ratings,
          credits: action.credits,
        },
      };

    case SET_SEARCH_MOVIES:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          movies: action.movies,
          query: action.query,
          totalPages: action.totalPages,
        },
      };
    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.fetch,
      };
    case SET_SEARCH_TV:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          shows: action.shows,
          totalPages: action.totalPages,
        },
      };
    case SET_SEARCH_PERSON:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          persons: action.persons,
          totalPages: action.totalPages,
        },
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          currentPage: action.currentPage,
        },
      };
    default:
      return state;
  }
};

export const setLatestMovies = (payload) => ({
  type: SET_LATEST_MOVIES,
  latestMovies: payload,
});

export const setMoviesFetch = (payload) => ({
  type: SET_FETCHING,
  fetch: payload,
});

export const setSearchMovies = (payload) => ({
  type: SET_SEARCH_MOVIES,
  movies: payload.movies,
  query: payload.query,
  totalPages: payload.totalPages,
});

export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  currentPage: payload,
});

export const setSearchPersons = (payload) => ({
  type: SET_SEARCH_PERSON,
  persons: payload.persons,
  totalPages: payload.totalPages,
});

export const setSearchTv = (payload) => ({
  type: SET_SEARCH_TV,
  shows: payload.shows,
  totalPages: payload.totalPages,
});

export const setCurrentMovie = (payload) => ({
  type: SET_CURRENT_MOVIE,
  currentMovie: payload.currentMovie,
  keywords: payload.keywords,
  socials: payload.socials,
  reviews: payload.reviews,
  similar: payload.similar,
  credits: payload.credits,
});

export const setCurrentPerson = (payload) => ({
  type: SET_CURRENT_PERSON,
  currentPerson: payload,
});

export const setCurrentShow = (payload) => ({
  type: SET_CURRENT_SHOW,
  currentShow: payload.currentShow,
  keywords: payload.keywords,
  external_ids: payload.socials,
  reviews: payload.reviews,
  similar: payload.similar,
  ratings: payload.ratings,
  credits: payload.credits,
});

export const setDetails = (payload) => ({
  type: SET_DETAILS_MOVIE,
  awards: payload.awards,
  director: payload.director,
  writer: payload.writer,
  actors: payload.actors,
  rated: payload.rated,
  language: payload.language,
});

export const setTopMovies = (payload) => ({
  type: SET_TOP_RATED_MOVIES,
  topMovies: payload.topMovies,
  totalPages: payload.totalPages,
});

export const setPopularShows = (payload) => ({
  type: SET_POPULAR_SHOWS,
  popularShows: payload.popularShows,
});

export const setByCategory = (payload) => ({
  type: SET_CATEGORISED,
  results: payload.results,
  totalPages: payload.totalPages,
});

export const setPopularMovies = (payload) => ({
  type: SET_POPULAR_MOVIES,
  popularMovies: payload.popularMovies,
  totalPages: payload.totalPages,
});

export const setUpcomingMovies = (payload) => ({
  type: SET_UPCOMING_MOVIES,
  upcomingMovies: payload.upcomingMovies,
  totalPages: payload.totalPages,
});

export const setTopShows = (payload) => ({
  type: SET_TOP_RATED_SHOWS,
  topShows: payload.topShows,
});

export const setCurrentSeason = (payload) => ({
  type: SET_CURRENT_SEASON,
  episodes: payload.episodes,
  name: payload.name,
  poster_path: payload.poster_path,
  air_date: payload.air_date,
  season_number: payload.season_number,
});

export const setShowFullCredits = (payload) => ({
  type: SET_SHOW_FULL_CREDITS,
  cast: payload.cast,
  crew: payload.crew,
});

export const setMovieFullCredits = (payload) => ({
  type: SET_MOVIE_FULL_CREDITS,
  cast: payload.cast,
  crew: payload.crew,
});
