import React from "react";
import classes from "./description.module.css";
import { get_date } from "../../helpers/prettifyDate";
import { get_show_duration } from "../../helpers/getShowDuration";
import { List, Heart, Bookmark, Star } from "../decorative/icons";
import { get_movie_popularity } from "../../helpers/prettifyPopularity";
import { get_duration } from "../../helpers/getMovieDuration";
import { Link } from "react-router-dom";

export function Description({ data, type }) {
  return (
    <div className={classes.about}>
      <h3 className={classes.movieTitle}>{type === "movie" ? data.title : data.name}</h3>
      <div className={classes.misc}>
        {type === "movie" && data.rated !== null ? (
          <h4 className={classes.ageRating}>{data.rated}</h4>
        ) : !data.ratings ? null : (
          <h4 className={classes.ageRating}>{data.ratings.map((rating) => rating.rating)}</h4>
        )}

        <h4 className={classes.releaseDate}>
          {data.release_date
            ? get_date(data.release_date)
            : data.first_air_date
            ? get_date(data.first_air_date)
            : "No year"}
        </h4>
        {data.genres ? (
          <div className={classes.genres}>
            {data.genres.map((item) => (
              <Link to={`/movflix/discover/${type}/${item.id}/${item.name}/genre`}>
                <button className={classes.genre} value={item.id} key={item.id}>
                  {item.name}
                </button>
              </Link>
            ))}
          </div>
        ) : null}

        {type === "movie" ? <h4 className={classes.duration}>{get_duration(data.runtime)}</h4> : null}
      </div>

      {type === "movie" ? null : (
        <div className={classes.durationInfo}>
          <h4 className={classes.duration}>
            {Array.isArray(data.episode_run_time) && data.episode_run_time.length > 0
              ? `${get_show_duration(data.episode_run_time[0], data.number_of_episodes)} total`
              : data.episode_run_time.length > 0
              ? `${get_show_duration(data.episode_run_time, data.number_of_episodes)} total`
              : null}
          </h4>
          <h4 className={classes.episodes}>{data.number_of_episodes} episodes</h4>
          <h4 className={classes.seasons}>{data.number_of_seasons} seasons</h4>
        </div>
      )}

      <div className={classes.ratings}>
        <h4 className={classes.ratingNumber}>{get_movie_popularity(data.vote_average)}%</h4>
        <h4 className={classes.ratingTitle}>User score</h4>
        <List className={classes.actionButton} />
        <Heart className={classes.actionButton} />
        <Bookmark className={classes.actionButton} />
        <Star className={classes.actionButton} />
      </div>

      <div className={classes.info}>
        <h4 className={classes.tagline}>{data.tagline}</h4>
        <h4 className={classes.descriptionText}>Overview</h4>
        <h4 className={classes.description}>{data.overview || `We have no information about this ${type}`}</h4>
      </div>
      {data.director === undefined && data.actors === undefined && data.writer === undefined ? null : (
        <div className={classes.producers}>
          <div className={classes.producer}>
            <h3 className={classes.name}>{data.director}</h3>
            <h3 className={classes.job}>Director</h3>
          </div>
          <div className={classes.producer}>
            <h3 className={classes.name}>{data.writer}</h3>
            <h3 className={classes.job}>Writer</h3>
          </div>
          <div className={classes.producer}>
            <h3 className={classes.name}>{data.actors}</h3>
            <h3 className={classes.job}>Actors</h3>
          </div>
        </div>
      )}
    </div>
  );
}
