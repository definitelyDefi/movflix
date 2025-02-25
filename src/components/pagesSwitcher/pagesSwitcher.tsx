import React from "react";
import classes from "./pagesSwitcher.module.css";
import {createPages} from "../../helpers/pagesCreator";

interface PagesSwitcherProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const PagesSwitcher: React.FC<PagesSwitcherProps> = ({currentPage, setCurrentPage, totalPages}) => {
  const pages: number[] = [];
  createPages(pages, totalPages, currentPage);

  return (
    <div className={classes.pages}>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? `${classes.page} ${classes.active}` : classes.page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
