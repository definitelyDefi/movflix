import { types } from "../types";

const defaultStore = {
  isFetching: false,
  currentPage: 1,
};

export const globalReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case types.SET_FETCHING:
      return {
        ...state,
        isFetching: action.fetch,
      };

    case types.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    default:
      return state;
  }
};
