import React from "react";
import classes from "./description.module.css";
import {getDate} from "../../helpers/prettifyDate";
import {get_show_duration} from "../../helpers/getShowDuration";
import {List, Heart} from "../decorative/icons";
import {get_movie_popularity} from "../../helpers/prettifyPopularity";
import {get_duration} from "../../helpers/getMovieDuration";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToWatchlistAsync, removeFromWatchlistAsync} from "./../../store/watchlistSlice";
import {AppDispatch, RootState} from "../../store/store";
import {useState} from "react";

import {toast} from "react-toastify";
import {addToFavoritesAsync, FavoriteItem, removeFromFavoritesAsync} from "../../store/favoritesSlice";
import {useTranslation} from "react-i18next";
export interface Genre {
  id: number;
  name: string;
}

export interface OmdbDetails {
  director?: string;
  writer?: string;
  actors?: string;
  rated?: string;
}

interface CrewMember {
  job: string;
  name: string;
}

interface CastMember {
  name: string;
}

export interface Credits {
  crew: CrewMember[];
  cast: CastMember[];
}

export interface Ratings {
  rating: string;
}

interface DescriptionProps {
  data: {
    id?: string;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    runtime?: number;
    episode_run_time?: number[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    genres?: Genre[];
    vote_average?: number;
    tagline?: string;
    overview?: string;
    credits?: Credits;
    ratings?: Ratings[];
    omdbDetails?: OmdbDetails;
    poster_path: string;
  };
  trailerItem: any;
  type: "movie" | "tv";
  onWatchlistChange: () => void;
}

export const Description: React.FC<DescriptionProps> = ({data, type, onWatchlistChange}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const watchlist = useSelector((state: RootState) => state.watchlist.items);
  const [showMessage, setShowMessage] = useState(false);
  const itemId = Number(data.id) || 0;
  const accountId = useSelector((state: RootState) =>
    state.auth.accountDetails ? state.auth.accountDetails.id : null
  );
  const sessionId = useSelector((state: RootState) => (state.auth.sessionId ? state.auth.sessionId : null));

  const watchlistitem = {
    id: itemId,
    title: data.title || data.name,
    name: data.title || data.name,
    poster_path: data.poster_path,
    overview: data.overview,
    vote_average: data.vote_average,
    release_date: data.release_date,
    first_air_date: data.first_air_date,
    type: type,
    poster: data.poster_path,
  };

  const isInWatchlist = watchlist.some((item) => item.id === itemId);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isInFavorites = favorites.some((fav) => fav.id === itemId);
  const favoriteItem: FavoriteItem = {
    id: itemId,
    title: data.title || data.name || "Untitled",
    name: data.name || data.title || "Untitled",
    poster_path: data.poster_path || "",
    overview: data.overview || "",
    vote_average: data.vote_average || 0,
    release_date: data.release_date || "",
    first_air_date: data.first_air_date || "",
    type: type,
  };
  const toggleFavorites = () => {
    if (isInFavorites) {
      dispatch(removeFromFavoritesAsync({accountId, sessionId, id: itemId, type}))
        .unwrap()
        .then(() => {
          toast.success(t("removed_from_favorites"), {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
        })
        .catch((error) => {
          console.error("Failed to remove from favorites:", error);
          toast.error(t("failed_to_remove_from_favorites"));
        });
    } else {
      dispatch(addToFavoritesAsync({accountId, sessionId, type, id: itemId, item: favoriteItem}))
        .unwrap()
        .then(() => {
          toast.success(t("added_to_favorites"), {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
        })
        .catch((error) => {
          console.error("Failed to add to favorites:", error);
          toast.error(t("failed_to_add_to_favorites"));
        });
    }
  };
  const toggleWatchlist = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlistAsync({accountId, sessionId, id: itemId, type}))
        .unwrap()
        .then(() => {
          toast.success(t("removed_from_watchlist"), {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
          setTimeout(() => setShowMessage(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to remove from watchlist:", error);
          toast.error(t("failed_to_remove_from_watchlist"));
        });
    } else {
      dispatch(addToWatchlistAsync({accountId, sessionId, type, id: itemId, item: watchlistitem}))
        .unwrap()
        .then(() => {
          toast.success(t("added_to_watchlist"), {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "light",
          });
          setTimeout(() => setShowMessage(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to add to watchlist:", error);
          toast.error(t("failed_to_add_to_watchlist"));
        });
    }

    if (onWatchlistChange) {
      onWatchlistChange();
    }
  };

  let director = "Unknown";

  if (data && data.omdbDetails && data.omdbDetails.director) {
    director = data.omdbDetails.director;
  } else if (data && data.credits && data.credits.crew && Array.isArray(data.credits.crew)) {
    const directorPerson = data.credits.crew.find((person) => person.job === "Director");
    if (directorPerson && directorPerson.name) {
      director = directorPerson.name;
    }
  }

  const writers =
    (data.omdbDetails && data.omdbDetails.writer
      ? data.omdbDetails.writer.split(", ")
      : data.credits && data.credits.crew
      ? data.credits.crew
          .filter(function (person) {
            return person.job === "Writer";
          })
          .map(function (writer) {
            return writer.name;
          })
      : []) || [];

  const actors =
    (data.omdbDetails && data.omdbDetails.actors
      ? data.omdbDetails.actors.split(", ")
      : data.credits && data.credits.cast
      ? data.credits.cast.slice(0, 5).map(function (actor) {
          return actor.name;
        })
      : []) || [];
  return (
    <div className={classes.about}>
      <h3 className={classes.movieTitle}>{type === "movie" ? data.title : data.name}</h3>
      <div className={classes.misc}>
        {type === "movie" && data && data.omdbDetails && data.omdbDetails.rated ? (
          <h4 className={classes.ageRating}>{data.omdbDetails.rated}</h4>
        ) : data && data.ratings && Array.isArray(data.ratings) ? (
          <h4 className={classes.ageRating}>
            {data.ratings
              .map(function (rating) {
                return rating.rating;
              })
              .join(", ")}
          </h4>
        ) : null}
        <h4 className={classes.releaseDate}>
          {data.release_date
            ? getDate(data.release_date)
            : data.first_air_date
            ? getDate(data.first_air_date)
            : t("no_year")}
        </h4>

        {type === "movie" && data.runtime && <h4 className={classes.duration}>{get_duration(data.runtime)}</h4>}
      </div>

      {type === "movie" ? null : (
        <div className={classes.durationInfo}>
          <h4 className={classes.duration}>
            {data &&
            data.episode_run_time &&
            Array.isArray(data.episode_run_time) &&
            data.episode_run_time.length > 0 &&
            data.episode_run_time[0] !== undefined &&
            data.number_of_episodes
              ? get_show_duration(data.episode_run_time[0], data.number_of_episodes) + ` ${t("total")}`
              : null}
          </h4>
          <h4 className={classes.episodes}>
            {data.number_of_episodes} {t("episodes")}
          </h4>
          <h4 className={classes.seasons}>
            {data.number_of_seasons} {t("seasons")}
          </h4>
        </div>
      )}

      {data.genres && (
        <div className={classes.genres}>
          {data.genres.map((item) => (
            <Link to={`/movflix/discover/${type}/${item.id}/${item.name}/genre`} key={item.id}>
              <button className={classes.genre} value={item.id}>
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      )}

      <div className={classes.ratings}>
        <h4 className={classes.ratingNumber}>
          {data.vote_average !== undefined ? `${get_movie_popularity(data.vote_average)}%` : "N/A"}
        </h4>
        <h4 className={classes.ratingTitle}>{t("user_score")}</h4>

        <div className={classes.actionContainer}>
          <List
            onClick={toggleWatchlist}
            className={`${classes.actionButton} ${isInWatchlist ? classes.inWatchlist : ""}`}
          />
          {/* {showMessage && <div className={classes.message}>Added to Watchlist</div>} */}
        </div>
        <div className={classes.actionContainer}>
          <Heart
            onClick={toggleFavorites}
            className={`${classes.actionButton} ${isInWatchlist ? classes.inWatchlist : ""}`}
          />
          {/* {showMessage && <div className={classes.message}>Added to Watchlist</div>} */}
        </div>
      </div>

      <div className={classes.info}>
        <h4 className={classes.tagline}>{data.tagline}</h4>
        <h4 className={classes.descriptionText}>{t("overview")}</h4>
        <h4 className={classes.description}>{data.overview || t("we_have_no_information_about_this_content")}</h4>
      </div>

      {(director || writers.length > 0 || actors.length > 0) && (
        <div className={classes.producers}>
          {director && (
            <div className={classes.producer}>
              <h3 className={classes.name}>{director}</h3>
              <h3 className={classes.job}>{t("director")}</h3>
            </div>
          )}
          {writers.length > 0 && (
            <div className={classes.producer}>
              <h3 className={classes.name}>{writers.join(", ")}</h3>
              <h3 className={classes.job}>{t("writers")}</h3>
            </div>
          )}
          {actors.length > 0 && (
            <div className={classes.producer}>
              <h3 className={classes.name}>{actors.join(", ")}</h3>
              <h3 className={classes.job}>{t("actors")}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
