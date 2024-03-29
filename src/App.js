import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import withComponent, { routes } from "./routes";
import "./../node_modules/swiper/swiper-bundle.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={withComponent(route.component)()}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
