import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import watchlistReducer from "./watchlistSlice";
import {combineReducers} from "redux";
import filtersReducer from "./filtersSlice";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import settingsReducer from "./settingsSlice";
import favoritesReducer from "./favoritesSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  filters: filtersReducer,
  auth: authReducer,
  profile: profileReducer,
  settings: settingsReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
