import React from "react";
import { CatalogueMain } from "./components/mainPage/catalogueMain";
import { MoviePage } from "./components/moviePage/moviePage";
import { Results } from "./components/searchResults/results/results";
import { ResultsExpanded } from "./components/searchResults/resultsExpanded/resultsExpanded";
import { ShowPage } from "./components/showPage/showPage";
import { TypeExpanded } from "./components/typeExpanded/typeExpanded";
import { SeasonsPage } from "./components/seasonsPage/seasonsPage";
import EpisodesPage from "./components/episodesPage/episodesPage";
import CastPageShow from "./components/castPage/castPageShow";
import CastPageMovie from "./components/castPage/castPageMovie";
import { PersonPage } from "./components/personPage/personPage";
import { AboutPage } from "./components/aboutPage/aboutPage";

export const routes = [
  {
    path: "/",
    component: CatalogueMain,
  },
  {
    path: "/movflix/",
    component: CatalogueMain,
  },
  {
    path: "/movflix/catalogue",
    component: CatalogueMain,
  },
  {
    path: "/movflix/movies/page/*",
    component: MoviePage,
  },
  {
    path: "/movflix/persons/page/:id/:name",
    component: PersonPage,
  },
  {
    path: "/movflix/shows/page/:id/:title",
    component: ShowPage,
  },
  {
    path: "/movflix/movies/page/:id/:title/cast_crew",
    component: CastPageMovie,
  },
  {
    path: "/movflix/shows/page/:id/:title/cast_crew",
    component: CastPageShow,
  },
  {
    path: "/movflix/shows/page/:id/:title/seasons",
    component: SeasonsPage,
  },
  {
    path: "/movflix/shows/page/:id/:title/seasons/:season",
    component: EpisodesPage,
  },
  {
    path: "/movflix/search/*",
    component: Results,
  },
  {
    path: "/movflix/search/expand/:query/:content_type",
    component: ResultsExpanded,
  },
  {
    path: "/movflix/categories/:content_type/:category/*",
    component: TypeExpanded,
  },
  {
    path: "/mofvlix/about",
    component: AboutPage,
  },
];

export default function withComponent(Component) {
  return function() {
    return <Component />;
  };
}
