import { TypeItems } from "../typeItems/typeItems";
import { PagesSwitcher } from "../pagesSwitcher/pagesSwitcher";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import classes from "./typeExpanded.module.css";
import { getByCategory } from "./../../http";
import { useDispatch } from "react-redux";
import Preloader from "./../decorative/preloader/preloader";
import { Header } from "../header/header";

export const TypeExpanded = () => {
  let [currentPage, setCurrentPage] = useState(1);

  let dispatch = useDispatch();
  let isFetching = useSelector((state) => state.movies.isFetching);

  let params = useParams();
  let { category, content_type } = params;
  let id = params["*"];

  let items = useSelector((state) => state.movies.byCategory.results);
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let totalPages = useSelector((state) => state.movies.byCategory.totalPages);

  useEffect(() => {
    dispatch(
      getByCategory(api_key, currentPage, category, content_type, id | null)
    );
  }, [api_key, currentPage, dispatch, id, category, content_type]);

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.title}>
          More results for{" "}
          <span className={classes.contentType}>
            {category} {content_type}
          </span>
        </h1>

        {isFetching ? (
          <Preloader variant="white" />
        ) : (
          <TypeItems items={items} content_type={content_type} />
        )}
        <PagesSwitcher
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
