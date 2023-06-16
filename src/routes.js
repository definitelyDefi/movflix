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
import { Discover } from "./pages/discoverPage/discover";

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
    path: "/movflix/movie/page/*",
    component: MoviePage,
  },
  {
    path: "/movflix/person/page/:id/:name",
    component: PersonPage,
  },
  {
    path: "/movflix/tv/page/:id/:title",
    component: ShowPage,
  },
  { path: "/movflix/discover/:content_type/:filter/:filterName/:filterType", component: Discover },
  {
    path: "/movflix/movie/page/:id/:title/cast_crew",
    component: CastPageMovie,
  },
  {
    path: "/movflix/tv/page/:id/:title/cast_crew",
    component: CastPageShow,
  },
  {
    path: "/movflix/tv/page/:id/:title/seasons",
    component: SeasonsPage,
  },
  {
    path: "/movflix/tv/page/:id/:title/seasons/:season",
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
