import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SettingsState {
  theme: "light" | "dark";
  imageQuality: "480p" | "720p" | "1080p" | "4K";
  language: string;
  notifications: boolean;
  autoplayTrailers: boolean;
}

const initialState: SettingsState = {
  theme: "dark",
  imageQuality: "1080p",
  language: "en",
  notifications: true,
  autoplayTrailers: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<SettingsState["theme"]>) => {
      state.theme = action.payload;
    },
    setImageQuality: (state, action: PayloadAction<SettingsState["imageQuality"]>) => {
      state.imageQuality = action.payload;
    },
    setLanguage: (state, action: PayloadAction<SettingsState["language"]>) => {
      state.language = action.payload;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
    setAutoplayTrailers: (state, action: PayloadAction<boolean>) => {
      state.autoplayTrailers = action.payload;
    },
  },
});

export const {setTheme, setImageQuality, setLanguage, setNotifications, setAutoplayTrailers} = settingsSlice.actions;
export default settingsSlice.reducer;
