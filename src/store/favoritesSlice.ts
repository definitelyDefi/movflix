import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {getItems, addItem, removeItem} from "../api";

export interface FavoriteItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  type: "movie" | "tv";
  poster?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<FavoriteItem[], {accountId: number; sessionId: string}>(
  "favorites/fetchFavorites",
  async ({accountId, sessionId}) => {
    try {
      const combinedFavorites = await getItems(accountId, sessionId, false);

      return combinedFavorites.map((item: any) => ({
        id: item.id,
        title: item.title || item.name || "Untitled",
        name: item.name || item.title || "Untitled",
        poster_path: item.poster_path || "",
        overview: item.overview || "",
        vote_average: item.vote_average || 0,
        release_date: item.release_date || "",
        first_air_date: item.first_air_date || "",
        type: item.name ? "tv" : "movie",
      }));
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw new Error("Failed to fetch favorites. Please try again.");
    }
  }
);

export const addToFavoritesAsync = createAsyncThunk<
  void,
  {accountId: any; sessionId: any; id: number; type: "movie" | "tv"; item: FavoriteItem}
>("favorites/addToFavoritesAsync", async ({accountId, sessionId, id, type, item}, {dispatch}) => {
  try {
    await addItem(accountId, sessionId, type, id, false);
    dispatch(addToFavorites(item));
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw new Error("Failed to add item to favorites. Please try again.");
  }
});

export const removeFromFavoritesAsync = createAsyncThunk<
  void,
  {accountId: any; sessionId: any; id: number; type: "movie" | "tv"}
>("favorites/removeFromFavoritesAsync", async ({accountId, sessionId, id, type}, {dispatch}) => {
  try {
    await removeItem(accountId, sessionId, type, id, false);
    dispatch(removeFromFavorites(id));
  } catch (error) {
    console.error("Error removing from favorites:", error);
    throw new Error("Failed to remove item from favorites. Please try again.");
  }
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<FavoriteItem>) {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch favorites.";
      })
      .addCase(addToFavoritesAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add item to favorites.";
      })
      .addCase(removeFromFavoritesAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to remove item from favorites.";
      });
  },
});

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;
export default favoritesSlice.reducer;
