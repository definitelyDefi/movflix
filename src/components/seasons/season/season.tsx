import React from "react";
import classes from "./season.module.css";
import {getDate} from "../../../helpers/prettifyDate";
import {useNavigate} from "react-router-dom";
import {getImageUrl} from "../../../helpers/getImage";
import {useTranslation} from "react-i18next";

interface SeasonProps {
  title: string;
  season: {
    id: number;
    poster_path?: string | null;
    name: string;
    air_date?: string | null;
    episode_count?: number;
    overview?: string;
    season_number: number;
  };
  show_id: number;
}

export const Season: React.FC<SeasonProps> = ({title, season, show_id}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const formattedDate = season.air_date ? getDate(season.air_date) : "Unknown";

  return (
    <div className={classes.season} key={season.id}>
      <img
        src={season.poster_path ? getImageUrl(season.poster_path, "w500") : ""}
        alt={season.name}
        loading="lazy"
        className={classes.seasonImage}
      />
      <div className={classes.seasonInfo}>
        <button
          className={classes.seasonTitle}
          onClick={() => navigate(`/movflix/episodes?season_id=${season.season_number}&id=${show_id}`)}
        >
          {season.name}
        </button>
        <h3 className={classes.seasonMisc}>
          {formattedDate} | {season.episode_count} {t("episodes")}
        </h3>
        <p className={classes.seasonDescription}>
          {season.overview
            ? season.overview
            : `Season ${season.season_number} of ${title} premiered on ${formattedDate}.`}
        </p>
      </div>
    </div>
  );
};
