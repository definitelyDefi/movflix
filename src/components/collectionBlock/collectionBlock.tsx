import React from "react";
import {Link} from "react-router-dom";
import classes from "./collectionBlock.module.css";
import {useTranslation} from "react-i18next";

export interface BelongsToCollectionProps {
  id: number;
  name: string;
  poster_path: string | null;
}

export const CollectionBlock: React.FC<BelongsToCollectionProps> = ({id, name, poster_path}) => {
  const {t} = useTranslation();
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className={classes.collectionContainer}>
      <h2 className={classes.title}>{t("belongs_to_collection")}</h2>
      <Link to={`/movflix/collection?id=${id}`} className={classes.link}>
        <div className={classes.collectionCard}>
          <img src={posterUrl} alt={name} className={classes.poster} />
          <div className={classes.details}>
            <h3 className={classes.name}>{name}</h3>
            <p className={classes.exploreText}>{t("explore_the_collection")} →</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
