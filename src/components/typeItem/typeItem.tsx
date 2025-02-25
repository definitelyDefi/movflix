import React from "react";
import classes from "./typeItem.module.css";
import poster_placeholder from "./../../assets/no_poster.png";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface TypeItemProps {
  content_type: string;
  item: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string | null;
    profile_path?: string | null;
    vote_average?: number | null;
    vote_count?: number | null;
    release_date?: string | null;
    first_air_date?: string | null;
    known_for?: {title?: string; name?: string}[];
  };
}

export const TypeItem: React.FC<TypeItemProps> = ({content_type, item}) => {
  const {t} = useTranslation();
  return (
    <div className={classes.item}>
      <Link to={`/movflix/page?content_type=${content_type}&id=${item.id}&title=${item.title || item.name}`}>
        <img
          className={classes.itemImage}
          alt=""
          src={
            item.poster_path && content_type !== "person"
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : item.profile_path
              ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
              : poster_placeholder
          }
        />
      </Link>

      <Link
        to={`/movflix/page?content_type=${content_type}&id=${item.id}&title=${item.title || item.name}`}
        className={classes.link}
      >
        <h3 className={classes.itemTitle}>{item.title || item.name}</h3>
      </Link>

      <div>
        <div className={classes.itemInfo}>
          {item.vote_average && content_type !== "persons" ? (
            <h3 className={classes.itemPopularity}>{`${item.vote_average}/10`}</h3>
          ) : item.known_for ? (
            <h3 className={classes.itemPopularity}>
              {item.known_for.map((knownItem, index) => (
                <span key={index} className={classes.itemJobs}>
                  {knownItem.title || knownItem.name}
                </span>
              ))}
            </h3>
          ) : (
            <h3 className={classes.itemPopularity}>{t("no_rating")}</h3>
          )}

          {item.release_date || item.first_air_date ? (
            <h3 className={classes.itemYear}>
              {item.release_date
                ? item.release_date.slice(0, 4)
                : item.first_air_date
                ? item.first_air_date.slice(0, 4)
                : t("no_year")}
            </h3>
          ) : null}

          {item.vote_count && item.vote_count !== 0 ? (
            <h3 className={classes.itemPopularity}>
              {item.vote_count}
              {t("votes")}
            </h3>
          ) : item.vote_count === 0 ? (
            <h3 className={classes.itemPopularity}>{t("no_votes")}</h3>
          ) : null}
        </div>
      </div>
    </div>
  );
};
