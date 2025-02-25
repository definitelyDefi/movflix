import React, {useState} from "react";
import {useNavigate} from "react-router";
import classes from "./searchBar.module.css";
import {useDispatch} from "react-redux";
import {setSearchQueryAndClearFilters} from "../../store/filtersSlice";
import {useTranslation} from "react-i18next";
export const SearchBar = () => {
  const {t} = useTranslation();
  const [query, setQuery] = useState("");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const handleSubmit = () => {
    if (query) {
      dispatch(setSearchQueryAndClearFilters(query));

      navigate(`/movflix/discover/?tv&search=${query}`);
    }
  };
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>{t("millions_of_films_and_shows")}</h1>
      <h2 className={classes.suptitle}>{t("discover_and_enjoy")}</h2>
      <div className={classes.searchBar}>
        <input
          placeholder={t("e.g_barack_obama_Godfather_etc")}
          className={classes.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={classes.submit} onClick={handleSubmit}>
          {t("search")}
        </button>
      </div>
    </div>
  );
};
