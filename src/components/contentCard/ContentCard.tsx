import React from "react";
import {Link} from "react-router-dom";
import classes from "./ContentCard.module.css";
import poster from "./../../assets/no_poster.png";
import {useTranslation} from "react-i18next";
interface ContentCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
  type: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({id, title, posterPath, releaseDate, voteAverage, type}) => {
  const {t} = useTranslation();
  return (
    <Link to={`/movflix/page?content_type=${type}&id=${id}`} className={classes.card}>
      <img
        src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : poster}
        alt={title}
        className={classes.poster}
      />
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.info}>
        {releaseDate ? releaseDate.slice(0, 4) : "N/A"} • {voteAverage ? `${voteAverage}/10` : t("no_rating")}
      </p>
    </Link>
  );
};
