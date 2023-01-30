/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import classes from "./resultsExpanded.module.css";
import { getSearchMovies, getSearchPersons, getSearchTv } from "./../../../http";
import { TypeItems, Header, Preloader, PagesSwitcher } from "../../";

export const ResultsExpanded = () => {
  let [currentPage, setCurrentPage] = useState(1);

  let dispatch = useDispatch();
  let isFetching = useSelector((state) => state.global.isFetching);
  let params = useParams();
  let { content_type, query } = params;
  let items;

  if (content_type === "movies") {
    items = useSelector((state) => state.search.searchResults.movies);
  } else if (content_type === "shows") {
    items = useSelector((state) => state.search.searchResults.shows);
  } else if (content_type === "persons") {
    items = useSelector((state) => state.search.searchResults.persons);
  }
  let totalPages = useSelector((state) => state.search.searchResults.totalPages);

  useEffect(() => {
    if (content_type === "movies") {
      dispatch(getSearchMovies(query, currentPage || 1));
    } else if (content_type === "shows") {
      dispatch(getSearchTv(query, currentPage || 1));
    } else {
      dispatch(getSearchPersons(query, currentPage || 1));
    }
  }, [content_type, currentPage, dispatch, query]);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.title}>Search results for {query} </h1>
        {isFetching ? <Preloader /> : <TypeItems items={items} content_type={content_type} />}
        <PagesSwitcher currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
    </>
  );
};
