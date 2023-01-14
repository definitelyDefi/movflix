import { Season } from "./season/season";
import React from "react";
import { get_season_date as get_date } from "./../../helpers/prettifyDate";

export function Seasons({ seasons, title }) {
  return (
    <div>
      {seasons.map((season) => (
        <Season
          key={season.div}
          season={season}
          title={title}
          get_date={get_date}
        />
      ))}
    </div>
  );
}
