import { types } from "../types";

const defaultStore = {
  byCategory: { results: [{ known_for: [] }], totalPages: 0 },
  searchResults: {
    totalPages: "",
    query: "",
    movies: [{}],
    persons: [{}],
    shows: [{}],
    keywords: [{}],
  },
};

export const searchReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case types.SET_CATEGORISED:
      return {
        ...state,
        byCategory: { results: action.results, totalPages: action.totalPages },
      };

    case types.SET_SEARCH_MOVIES:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          movies: action.movies,
          query: action.query,
          totalPages: action.totalPages,
        },
      };

    case types.SET_SEARCH_TV:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          shows: action.shows,
          totalPages: action.totalPages,
        },
      };
    case types.SET_SEARCH_PERSON:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          persons: action.persons,
          totalPages: action.totalPages,
        },
      };

    default:
      return state;
  }
};
