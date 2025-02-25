import React from "react";
import classes from "./lastSeason.module.css";
import {useNavigate} from "react-router-dom";
import {getSeasonDate} from "../../helpers/prettifyDate";
import poster_placeholder from "./../../assets/no_poster.png";
import {getImageUrl} from "../../helpers/getImage";
import {useTranslation} from "react-i18next";

interface Season {
  id: number;
  name: string;
  title?: string;
  poster_path?: string;
  air_date?: string;
  episode_count: number;
  season_number: number;
  overview?: string;
}

interface LastSeasonProps {
  season: Season;
  title: string;
  id: number;
}

export const LastSeason: React.FC<LastSeasonProps> = ({season, title, id}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  console.log("seasons", season);
  const handleSeasonClick = () => {
    navigate(`/movflix/episodes?season_id=${id}&id=${id}`);
  };

  const handleViewAllSeasonsClick = () => {
    navigate(`/movflix/seasons?id=${id}`);
  };

  return (
    <div className={classes.lastSeasonBlock}>
      <h3 className={classes.lastSeasonHeader}>{t("last_season")}</h3>
      <div className={classes.lastSeason}>
        <img
          className={classes.lastSeasonImage}
          alt={season.title || season.name}
          loading="lazy"
          src={season.poster_path ? getImageUrl(season.poster_path, "w500") : poster_placeholder}
        />
        <div className={classes.lastSeasonInfo}>
          <div>
            <h4 className={classes.lastSeasonTitle}>{season.name}</h4>
            <div className={classes.lastSeasonMisc}>
              <h3 className={classes.lastSeasonYear}>{season.air_date ? season.air_date.slice(0, 4) : "No year"}</h3>
              <h3 className={classes.lastSeasonEpisodes}>
                {season.episode_count} {t("episodes")}
              </h3>
            </div>
          </div>
          <p className={classes.lastSeasonOverview}>
            {season.overview
              ? season.overview
              : season.air_date
              ? `Season ${season.season_number} of ${title} premiered on ${getSeasonDate(season.air_date)}.`
              : t("we_don't_have_any_information")}
          </p>
        </div>
      </div>
      <button className={classes.lastSeasonFooter} onClick={handleViewAllSeasonsClick}>
        {t("view_all_seasons")}
      </button>
    </div>
  );
};
