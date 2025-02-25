import React from "react";
import {CatalogueMain, SeasonsPage, EpisodesPage, PersonPage, TypeExpanded, AboutPage} from "./pages";

import {ContentPage} from "./pages/contentPage/contentPage";
import {CastPage} from "./pages/castPage/castPage";
import {RecommendationsPage} from "./pages/recommendationsPage/recommendationsPage";
import {AuthCallback} from "./components/authCallback/AuthCallback";
import {ProfilePage} from "./pages/profilePage/ProfilePage";
import {LoginPage} from "./pages/loginPage/LoginPage";
import {CollectionPage} from "./pages/collectionPage/collectionPage";
import {SettingsPage} from "./pages/SettingsPage/SettingPage";
import {FavoriteWatchlistPage} from "./pages/FavoriteWatchlistPage/FavoriteWatchlistPage";

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
    path: "/movflix/person", //  /movflix/person?id=123
    component: PersonPage,
  },
  {
    path: "/movflix/page", //  /movflix/page?content_type=tv&id=123&title=blablabla
    component: ContentPage,
  },
  {
    path: "/movflix/cast_crew", //  /movflix/cast_crew?content_type=tv&id=123&title=blablabla
    component: CastPage,
  },
  {
    path: "/movflix/seasons", //  /movflix/seasons?id=123&title=blablabla
    component: SeasonsPage,
  },
  {
    path: "/movflix/episodes", //  /movflix/episodes?id=123&title=blablabla&season_id=123
    component: EpisodesPage,
  },
  {
    path: "/movflix/discover/*",
    component: TypeExpanded,
  },
  {
    path: "/movflix/about",
    component: AboutPage,
  },
  {
    path: "/movflix/recommendations",
    component: RecommendationsPage,
  },
  {path: "/movflix/login", component: LoginPage},
  {
    path: "/movflix/auth_callback",
    component: AuthCallback,
  },
  {path: "/movflix/profile", component: ProfilePage},
  {path: "/movflix/collection", component: CollectionPage},
  {path: "/movflix/settings", component: SettingsPage},
  {path: "/movflix/lists", component: FavoriteWatchlistPage},
];

export default function withComponent(Component) {
  return function () {
    return <Component />;
  };
}
