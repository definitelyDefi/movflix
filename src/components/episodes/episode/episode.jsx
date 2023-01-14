import React from "react";
import { get_season_date } from "./../../../helpers/prettifyDate";
import classes from "./episode.module.css";
export function Episode({ episode }) {
  return (
    <div className={classes.episode}>
      <img
        src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
        alt={""}
        className={classes.episodeImage}
      />
      <div>
        <div className={classes.episodeInfo}>
          <h3 className={classes.episodeTitle}>
            <span className={classes.episodeNumber}>
              {episode.episode_number}
            </span>
            {episode.name}
          </h3>

          <h3 className={classes.episodeMisc}>
            {get_season_date(episode.air_date)}
          </h3>
        </div>
        <p className={classes.episodeDescription}>{episode.overview}</p>
      </div>
    </div>
  );
}
