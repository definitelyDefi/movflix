import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./smallHeader.module.css";
export function SmallHeader({ headerImage, title, date, padding, text }) {
  let navigate = useNavigate();
  return (
    <div className={classes.header}>
      <img
        className={classes.headerImage}
        src={`https://image.tmdb.org/t/p/original${headerImage}`}
        alt={""}
      />
      <div>
        <h3 className={classes.headerTitle}>
          {title} ({date.slice(0, 4)})
        </h3>

        <button className={classes.backButton} onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
          {text}
        </button>
      </div>
    </div>
  );
}
