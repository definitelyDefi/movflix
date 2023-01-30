import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { moviesReducer } from "./reducers/moviesReducer";
import { showsReducer } from "./reducers/showsReducer";
import { globalReducer } from "./reducers/globalReducer";
import { searchReducer } from "./reducers/searchReducer";
import { personReducer } from "./reducers/personReducer";

export const actions = {};

const rootReducer = combineReducers({
  movies: moviesReducer,
  shows: showsReducer,
  global: globalReducer,
  search: searchReducer,
  person: personReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
persistor.purge();
console.log(store.getState());
export default store;
