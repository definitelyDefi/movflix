import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import withComponent, {routes} from "./routes";
import "./global.css";
import "./../node_modules/swiper/swiper-bundle.css";
import Layout from "./components/layout/layout";
import {useSelector} from "react-redux";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n"; // Import i18n setup
import {useEffect} from "react";

function App() {
  const theme = useSelector((state) => state.settings.theme);

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  // }, [theme]);

  // console.log("theme", theme);

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={withComponent(route.component)()} />
              ))}
            </Routes>
          </Layout>
        </BrowserRouter>
      </I18nextProvider>
    </>
  );
}

export default App;
