import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {getProfileData} from "../api";

interface ListItem {
  id: number;
  title: string;
  poster_path: string;
}

interface ProfileState {
  profileData: {
    favorites: ListItem[];
    watchlist: ListItem[];
    collections: ListItem[];
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profileData: {
    favorites: [],
    watchlist: [],
    collections: [],
  },
  isLoading: false,
  error: null,
};

export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async ({accountId, sessionId}: {accountId: number; sessionId: string}, {rejectWithValue}) => {
    try {
      return await getProfileData(accountId, sessionId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<any>) => {
        state.profileData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProfileData.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
