import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import classes from "./../typeExpanded/typeExpanded.module.css";
import { getByGenre } from "./../../http";
import { useDispatch } from "react-redux";
import { Header, Preloader, PagesSwitcher, TypeItems } from "../../components";

export const Discover = () => {
  let [currentPage, setCurrentPage] = useState(1);

  let dispatch = useDispatch();
  let isFetching = useSelector((state) => state.global.isFetching);

  let params = useParams();
  let { genre, content_type, genreName } = params;

  let items = useSelector((state) => state.search.byCategory.results);
  let totalPages = useSelector((state) => state.search.byCategory.totalPages);

  useEffect(() => {
    dispatch(getByGenre(content_type, genre, currentPage));
  }, [genre, currentPage, dispatch, content_type]);

  return (
    <div>
      <Header />
      <div className={classes.container}>
        <h1 className={classes.title}>
          More results for{" "}
          <span className={classes.contentType}>
            {genreName} {content_type}
          </span>
        </h1>

        {isFetching ? (
          <Preloader variant="white" />
        ) : (
          <>
            <TypeItems items={items} content_type={content_type} />
            <PagesSwitcher currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          </>
        )}
      </div>
    </div>
  );
};
