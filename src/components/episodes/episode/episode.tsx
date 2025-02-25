import React from "react";
import {getSeasonDate} from "../../../helpers/prettifyDate";
import {getImageUrl} from "../../../helpers/getImage";
import classes from "./episode.module.css";
import {useTranslation} from "react-i18next";

interface EpisodeProps {
  episode: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    still_path: string | null;
    episode_number: number;
    season_number: number;
    vote_average: number;
  };
}

export const Episode: React.FC<EpisodeProps> = ({episode}) => {
  const {t} = useTranslation();
  return (
    <div className={classes.episode}>
      <img
        src={getImageUrl(episode.still_path, "w500")}
        alt={episode.name || "Episode Image"}
        loading="lazy"
        className={classes.episodeImage}
      />
      <div>
        <div className={classes.episodeInfo}>
          <h3 className={classes.episodeTitle}>
            <span className={classes.episodeNumber}>{episode.episode_number}</span>
            {episode.name}
          </h3>
          <h3 className={classes.episodeMisc}>{getSeasonDate(episode.air_date)}</h3>
        </div>
        <p className={classes.episodeDescription}>{episode.overview || t("no_description")}</p>
      </div>
    </div>
  );
};
