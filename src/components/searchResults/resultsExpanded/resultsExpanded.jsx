/* eslint-disable react-hooks/rules-of-hooks */
import { PagesSwitcher } from "../../pagesSwitcher/pagesSwitcher";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import classes from "./resultsExpanded.module.css";
import {
  getSearchMovies,
  getSearchPersons,
  getSearchTv,
} from "./../../../http";
import { useDispatch } from "react-redux";
import Preloader from "./../../decorative/preloader/preloader";
import { Header } from "../../header/header";
import { TypeItems } from "../../typeItems/typeItems";

export const ResultsExpanded = () => {
  let [currentPage, setCurrentPage] = useState(1);

  let dispatch = useDispatch();
  let isFetching = useSelector((state) => state.movies.isFetching);
  let params = useParams();
  let { content_type, query } = params;
  let items;

  if (content_type === "movies") {
    items = useSelector((state) => state.movies.searchResults.movies);
  } else if (content_type === "shows") {
    items = useSelector((state) => state.movies.searchResults.shows);
  } else if (content_type === "persons") {
    items = useSelector((state) => state.movies.searchResults.persons);
  }

  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let totalPages = useSelector(
    (state) => state.movies.searchResults.totalPages
  );

  useEffect(() => {
    if (content_type === "movies") {
      dispatch(getSearchMovies(api_key, query, currentPage || 1));
    } else if (content_type === "shows") {
      dispatch(getSearchTv(api_key, query, currentPage || 1));
    } else {
      dispatch(getSearchPersons(api_key, query, currentPage || 1));
    }
  }, [api_key, content_type, currentPage, dispatch, query]);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.title}>Search results for {query} </h1>
        {isFetching ? (
          <Preloader />
        ) : (
          <TypeItems items={items} content_type={content_type} />
        )}
        <PagesSwitcher
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
