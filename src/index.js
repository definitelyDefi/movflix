import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";
import Preloader from "./components/decorative/preloader/preloader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Preloader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
