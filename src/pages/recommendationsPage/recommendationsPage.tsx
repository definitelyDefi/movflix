import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecommendations} from "../../api";
import classes from "./recommendationsPage.module.css";
import {Link, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {addToWatchlistAsync} from "../../store/watchlistSlice";
import {toast} from "react-toastify";
import {AppDispatch, RootState} from "../../store/store";
import {addToFavoritesAsync} from "../../store/favoritesSlice";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  overview?: string;
}

export const RecommendationsPage: React.FC = () => {
  const location = useLocation();
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get("movieId") || "undefined";
  const initialContentType = queryParams.get("contentType") || "undefined";
  const [contentType, setContentType] = useState<any>(initialContentType);
  const [recommendations, setRecommendations] = useState<MediaItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const accountId = useSelector((state: RootState) =>
    state.auth.accountDetails ? state.auth.accountDetails.id : null
  );
  const sessionId = useSelector((state: RootState) => (state.auth.sessionId ? state.auth.sessionId : null));

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (isFetching || currentPage > totalPages) return;
      setIsFetching(true);

      try {
        const response = await getRecommendations(movieId, initialContentType, contentType, currentPage);
        setRecommendations((prev) => [...prev, ...response.results]);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchRecommendations();
  }, [contentType, currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {threshold: 1.0}
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [isFetching, currentPage, totalPages]);

  const handleContentTypeChange = (type: "movie" | "tv") => {
    setContentType(type);
    setRecommendations([]);
    setCurrentPage(1);
  };

  const handleAddToWatchlist = (item: MediaItem) => {
    dispatch(
      addToWatchlistAsync({accountId, sessionId, type: contentType, id: item.id, item: {...item, type: contentType}})
    )
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
      })
      .catch((error: any) => {
        console.error("Failed to add to watchlist:", error);
        toast.error(t("failed_to_add_to_watchlist"));
      });
  };

  const handleAddToFavorites = (item: MediaItem) => {
    dispatch(
      addToFavoritesAsync({accountId, sessionId, type: contentType, id: item.id, item: {...item, type: contentType}})
    )
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
      .catch((error: any) => {
        console.error("Failed to add to favorites:", error);
        toast.error(t("failed_to_add_to_favorites"));
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.switchContainer}>
        <button
          className={`${classes.switchButton} ${contentType === "movie" ? classes.active : ""}`}
          onClick={() => handleContentTypeChange("movie")}
        >
          {t("movies")}
        </button>
        <button
          className={`${classes.switchButton} ${contentType === "tv" ? classes.active : ""}`}
          onClick={() => handleContentTypeChange("tv")}
        >
          {t("shows")}
        </button>
      </div>

      {recommendations.map((item) => (
        <div key={item.id} className={classes.mediaContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title || item.name}
            className={classes.poster}
          />

          <div className={classes.details}>
            <h2 className={classes.title}>
              <Link to={`/movflix/page?content_type=${contentType}&id=${item.id}`}>{item.title || item.name}</Link>
            </h2>
            <p className={classes.meta}>
              <strong>{t("rating")}</strong> {item.vote_average || "N/A"} | <strong>{t("year")}</strong>{" "}
              {item.release_date
                ? item.release_date.split("-")[0]
                : item.first_air_date
                ? item.first_air_date.split("-")[0]
                : "N/A"}
            </p>
            <p className={classes.overview}>{item.overview}</p>

            <div className={classes.actions}>
              <button onClick={() => handleAddToWatchlist(item)} className={classes.actionButton}>
                {t("add_to_watchlist")}
              </button>
              <button onClick={() => handleAddToFavorites(item)} className={classes.actionButton}>
                {t("add_to_favorites")}
              </button>
            </div>
          </div>
        </div>
      ))}

      <div ref={loaderRef} className={classes.loader}>
        {isFetching ? t("loading_more") : currentPage >= totalPages ? t("no_more_content") : ""}
      </div>
    </div>
  );
};
