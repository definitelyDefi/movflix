import React from "react";
import {Episode} from "./episode/episode";
import classes from "./episodes.module.css";
import {useTranslation} from "react-i18next";

interface EpisodeType {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  still_path: string | null;
  episode_number: number;
  season_number: number;
  vote_average: number;
}

interface SeasonType {
  episodes: EpisodeType[];
}

interface EpisodesProps {
  season: SeasonType;
}

export const Episodes: React.FC<EpisodesProps> = ({season}) => {
  const {t} = useTranslation();
  return (
    <div>
      <h3 className={classes.episodesCount}>
        {t("episodes_")} <span className={classes.grayText}>{season.episodes.length}</span>
      </h3>
      {season.episodes.map((episode) => (
        <Episode episode={episode} key={episode.id} />
      ))}
    </div>
  );
};
