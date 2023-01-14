import React from "react";
import classes from "./season.module.css";
import { get_season_date as get_date } from "../../../helpers/prettifyDate";
import { useLocation, useNavigate } from "react-router-dom";
export function Season({ title, season }) {
  let location = useLocation();
  let navigate = useNavigate();
  return (
    <div className={classes.season} key={season.id}>
      <img
        src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
        alt={""}
        className={classes.seasonImage}
      />
      <div className={classes.seasonInfo}>
        <button
          className={classes.seasonTitle}
          onClick={() =>
            navigate(`${location.pathname}/${season.season_number}`)
          }
        >
          {season.name}
        </button>
        <h3 className={classes.seasonMisc}>
          {season.air_date ? season.air_date.slice(0, 4) : "No year"} |{" "}
          {season.episode_count} episodes{" "}
        </h3>
        <p className={classes.seasonDescription}>
          {season.overview
            ? season.overview
            : `Season ${
                season.season_number
              } of ${title} premiered on ${get_date(season.air_date)}.`}
          {}
        </p>
      </div>
    </div>
  );
}
