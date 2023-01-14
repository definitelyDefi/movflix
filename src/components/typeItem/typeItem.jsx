import React from "react";
import classes from "./typeItem.module.css";
import poster_placeholder from "./../../assets/no_poster.png";
import { useNavigate } from "react-router-dom";
import LazyLoad from "react-lazyload";

export function TypeItem({ content_type, item, onLoad }) {
  let navigate = useNavigate();
  return (
    <div className={classes.item}>
      <LazyLoad once>
        <img
          onClick={() =>
            navigate(
              `/movflix/${content_type}/page/${item.id}/${
                item.title || item.name
              }`
            )
          }
          className={classes.itemImage}
          alt={""}
          src={
            item.poster_path !== null && content_type !== "persons"
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : item.profile_path !== null
              ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
              : poster_placeholder
          }
        />
      </LazyLoad>

      <h3 className={classes.itemTitle}>{item.title || item.name}</h3>

      <div>
        <div className={classes.itemInfo}>
          {item.vote_average && content_type !== "persons" ? (
            <h3 className={classes.itemPopularity}>
              {`${item.vote_average}/10`}
            </h3>
          ) : item.known_for ? (
            <h3 className={classes.itemPopularity}>
              {item.known_for.map((item) => (
                <h3 className={classes.itemJobs}>{item.title || item.name}</h3>
              ))}
            </h3>
          ) : (
            <h3 className={classes.itemPopularity}>No rating</h3>
          )}

          {item.release_date || item.first_air_date ? (
            <h3 className={classes.itemYear}>
              {item.release_date
                ? item.release_date.slice(0, 4)
                : item.first_air_date
                ? item.first_air_date.slice(0, 4)
                : "No year"}
            </h3>
          ) : null}

          {item.vote_count && item.vote_count !== 0 ? (
            <h3 className={classes.itemPopularity}>{item.vote_count} votes</h3>
          ) : item.vote_count === 0 ? (
            <h3 className={classes.itemPopularity}>No votes</h3>
          ) : null}
        </div>
      </div>
    </div>
  );
}
