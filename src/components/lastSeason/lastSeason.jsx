import React from "react";
import classes from "./lastSeason.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { get_season_date } from "../../helpers/prettifyDate";
import poster_placeholder from "./../../assets/no_poster.png";

export function LastSeason({ season, title }) {
  let location = useLocation();
  let navigate = useNavigate();
  return (
    <div className={classes.lastSeasonBlock}>
      <h3 className={classes.lastSeasonHeader}>Last season</h3>
      <div className={classes.lastSeason}>
        <img
          className={classes.lastSeasonImage}
          src={
            season.poster_path
              ? `https://image.tmdb.org/t/p/original${season.poster_path}`
              : poster_placeholder
          }
          alt={""}
        />
        <div className={classes.lastSeasonInfo}>
          <div>
            <h4
              className={classes.lastSeasonTitle}
              onClick={() =>
                navigate(`${location.pathname}/seasons/${season.season_number}`)
              }
            >
              {season.name}
            </h4>
            <div className={classes.lastSeasonMisc}>
              <h3 className={classes.lastSeasonYear}>
                {season.air_date ? season.air_date.slice(0, 4) : "No year"}
              </h3>
              <h3 className={classes.lastSeasonEpisodes}>
                {season.episode_count} episodes
              </h3>
            </div>
          </div>

          <p className={classes.lastSeasonOverview}>
            {season.overview
              ? season.overview
              : season.air_date
              ? `Season ${
                  season.season_number
                } of ${title} premiered on ${get_season_date(season.air_date)}.`
              : "We don't have any information about this season yet"}
          </p>
        </div>
      </div>
      <button
        className={classes.lastSeasonFooter}
        onClick={() => navigate(`${location.pathname}/seasons`)}
      >
        View all seasons
      </button>
    </div>
  );
}
