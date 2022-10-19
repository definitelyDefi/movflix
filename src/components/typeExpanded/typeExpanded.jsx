/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import classes from "./typeExpanded.module.css";
import poster_placeholder from "./../../assets/no_poster.png";

import { getByCategory } from "./../../http";
import { setCurrentPage } from "./../../store/reducers/moviesReducer";
import { useDispatch } from "react-redux";
import { createPages } from "./../../helpers/pagesCreator";
import Preloader from "./../decorative/preloader/preloader";
import LazyLoad from "react-lazyload";
import { Header } from "../header/header";

export const TypeExpanded = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let isFetching = useSelector((state) => state.movies.isFetching);
  let currentPage = useSelector(
    (state) => state.movies.searchResults.currentPage
  );
  let params = useParams();
  let id = params["*"];

  let items = useSelector((state) => state.movies.byCategory.results);
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let totalPages = useSelector((state) => state.movies.byCategory.totalPages);
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);
  useEffect(() => {
    dispatch(
      getByCategory(
        api_key,
        currentPage,
        params.category,
        params.content_type,
        id | null
      )
    );
  }, [currentPage, params.category, params.content_type]);

  let pages = [];
  createPages(pages, totalPages, currentPage);
  return (
    <div>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.title}>
          More results for {params.category} {params.content_type}{" "}
        </h1>
        <div className={classes.pages}>
          {pages.map((page) => (
            <button
              className={
                page === currentPage
                  ? `${classes.page} ${classes.active}`
                  : classes.page
              }
              onClick={() => {
                dispatch(setCurrentPage(page));
              }}
            >
              {page}
            </button>
          ))}
        </div>
        {isFetching ? (
          <Preloader variant="white" />
        ) : (
          <div className={classes.items}>
            {items.map((item) => (
              <div className={classes.item}>
                <LazyLoad once>
                  <img
                    onClick={() =>
                      navigate(
                        params.content_type === "movies"
                          ? `/movflix/movies/page/${item.id}/${item.title}`
                          : params.content_type === "shows"
                          ? `/movflix/shows/page/${item.id}/${item.name}`
                          : `/movflix/persons/page/${item.id}/${item.name}`
                      )
                    }
                    className={classes.itemImage}
                    alt={""}
                    src={
                      item.poster_path !== null &&
                      params.content_type !== "persons"
                        ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                        : item.profile_path !== null
                        ? `https://image.tmdb.org/t/p/original${item.profile_path}`
                        : poster_placeholder
                    }
                  />
                </LazyLoad>

                <h3 className={classes.itemTitle}>
                  {params.content_type === "movies" ? item.title : item.name}
                </h3>

                <div>
                  <div className={classes.itemInfo}>
                    {item.vote_average && params.content_type !== "persons" ? (
                      <h3 className={classes.itemPopularity}>
                        {item.vote_average !== 0
                          ? `${item.vote_average}/10`
                          : "No rating"}
                      </h3>
                    ) : item.known_for ? (
                      <h3 className={classes.itemPopularity}>
                        {item.known_for.map((item) => (
                          <h3 className={classes.itemJobs}>
                            {item.title || item.name}
                          </h3>
                        ))}
                      </h3>
                    ) : null}

                    {item.release_date || item.first_air_date ? (
                      <h3 className={classes.itemYear}>
                        {item.release_date && params.content_type === "movies"
                          ? item.release_date.slice(0, 4)
                          : item.first_air_date &&
                            params.content_type === "shows"
                          ? item.first_air_date.slice(0, 4)
                          : "No year"}
                      </h3>
                    ) : null}

                    {item.vote_count ? (
                      <h3 className={classes.itemNsfw}>
                        {item.vote_count} votes
                      </h3>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
