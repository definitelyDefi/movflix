import React from "react";
import {
  CatalogueMain,
  MoviePage,
  Results,
  ResultsExpanded,
  ShowPage,
  TypeExpanded,
  SeasonsPage,
  EpisodesPage,
  CastPageShow,
  CastPageMovie,
  PersonPage,
  AboutPage,
} from "./pages";

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
    path: "/movflix/person/page/:id/:name",
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
