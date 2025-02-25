import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {getItems, addItem, removeItem} from "../api";

export interface WatchlistItem {
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

interface WatchlistState {
  items: WatchlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WatchlistState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchWatchlist = createAsyncThunk<WatchlistItem[], {accountId: number; sessionId: string}>(
  "watchlist/fetchWatchlist",
  async ({accountId, sessionId}) => {
    try {
      const combinedWatchlist = await getItems(accountId, sessionId, true);

      return combinedWatchlist.map((item: any) => ({
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
      console.error("Error fetching watchlist:", error);
      throw new Error("Failed to fetch watchlist. Please try again.");
    }
  }
);

export const addToWatchlistAsync = createAsyncThunk<
  void,
  {accountId: any; sessionId: any; id: any; type: "movie" | "tv"; item: WatchlistItem}
>("watchlist/addToWatchlistAsync", async ({accountId, sessionId, id, type, item}, {dispatch}) => {
  try {
    await addItem(accountId, sessionId, type, id, true);
    dispatch(addToWatchlist(item));
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw new Error("Failed to add item to watchlist. Please try again.");
  }
});

export const removeFromWatchlistAsync = createAsyncThunk<
  void,
  {accountId: any; sessionId: any; id: number; type: "movie" | "tv"}
>("watchlist/removeFromWatchlistAsync", async ({accountId, sessionId, id, type}, {dispatch}) => {
  try {
    await removeItem(accountId, sessionId, type, id, true);
    dispatch(removeFromWatchlist(id));
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw new Error("Failed to remove item from watchlist. Please try again.");
  }
});

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist(state, action: PayloadAction<WatchlistItem>) {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWatchlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch watchlist.";
      })
      .addCase(addToWatchlistAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add item to watchlist.";
      })
      .addCase(removeFromWatchlistAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to remove item from watchlist.";
      });
  },
});

export const {addToWatchlist, removeFromWatchlist} = watchlistSlice.actions;
export default watchlistSlice.reducer;
