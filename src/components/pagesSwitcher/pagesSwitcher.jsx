import React from "react";
import classes from "./pagesSwitcher.module.css";
import { createPages } from "../../helpers/pagesCreator";

export function PagesSwitcher({ currentPage, setCurrentPage, totalPages }) {
  let pages = [];
  createPages(pages, totalPages, currentPage);

  return (
    <div className={classes.pages}>
      {pages.map((page) => (
        <button
          className={
            page === currentPage
              ? `${classes.page} ${classes.active}`
              : classes.page
          }
          onClick={() => {
            setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
