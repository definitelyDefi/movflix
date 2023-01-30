import React from "react";
import classes from "./preloader.module.css";

export const Preloader = ({ variant }) => {
  return (
    <div className={classes.fetching}>
      <svg viewBox="0 0 100 100">
        <defs>
          <filter className={classes.shadow}>
            {" "}
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#fc6767"
            />
          </filter>
        </defs>
        <circle
          className={
            variant === "white"
              ? `${classes.spinner} ${classes.white}`
              : classes.spinner
          }
          cx="50"
          cy="50"
          r="45"
        />
      </svg>
    </div>
  );
};
