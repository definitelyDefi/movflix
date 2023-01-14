import { Episode } from "./episode/episode";
import classes from "./episodes.module.css";
import React from "react";

export function Episodes({ season }) {
  return (
    <div>
      <h3 className={classes.episodesCount}>
        Episodes{" "}
        <span className={classes.grayText}>{season.episodes.length}</span>
      </h3>
      {season.episodes.map((episode) => (
        <Episode episode={episode} />
      ))}
    </div>
  );
}
