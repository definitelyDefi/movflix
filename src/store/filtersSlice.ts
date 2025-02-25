import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FiltersState {
  contentType: "movie" | "tv";
  selectedCategory: string;
  filters: {
    search: string;
    with_keywords: string;
    with_genres: string;
    sort_by: string;
    vote_average_gte: string;
    vote_average_lte: string;
  };
  currentPage: number;
}

const initialState: FiltersState = {
  contentType: "movie",
  selectedCategory: "filters",
  filters: {
    search: "",
    with_keywords: "",
    with_genres: "",
    sort_by: "popularity.desc",
    vote_average_gte: "",
    vote_average_lte: "",
  },
  currentPage: 1,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchQueryAndClearFilters(state, action: PayloadAction<string>) {
      state.filters = {
        search: action.payload,
        with_keywords: "",
        with_genres: "",
        sort_by: "popularity.desc",
        vote_average_gte: "",
        vote_average_lte: "",
      };

      state.selectedCategory = "filters";
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },
    setContentType(state, action: PayloadAction<any>) {
      state.contentType = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<FiltersState["filters"]>>) {
      state.filters = {...state.filters, ...action.payload};
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setContentType,
  setCategory,
  setFilters,
  setPage,
  resetFilters,
  setSearchQuery,
  setSearchQueryAndClearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
