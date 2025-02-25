import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../store/store";
import {fetchWatchlist, removeFromWatchlistAsync} from "../../store/watchlistSlice";
import {fetchFavorites, removeFromFavoritesAsync} from "../../store/favoritesSlice";
import classes from "./FavoriteWatchlistPage.module.css";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
  type: "movie" | "tv";
}

export const FavoriteWatchlistPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();
  const accountId = useSelector((state: RootState) => state.auth.accountDetails?.id);
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("fv items", items);
  useEffect(() => {
    if (!accountId || !sessionId) return;

    setLoading(true);
    if (type === "watchlist") {
      dispatch(fetchWatchlist({accountId, sessionId}))
        .unwrap()
        .then((data) => setItems(data))
        .finally(() => setLoading(false));
    } else {
      dispatch(fetchFavorites({accountId, sessionId}))
        .unwrap()
        .then((data) => setItems(data))
        .finally(() => setLoading(false));
    }
  }, [type, accountId, sessionId, dispatch]);

  const handleRemove = (id: number, contentType: "movie" | "tv") => {
    if (!accountId || !sessionId) return;

    if (type === "watchlist") {
      dispatch(removeFromWatchlistAsync({accountId, sessionId, id, type: contentType}))
        .unwrap()
        .then(() => {
          toast.success("Removed from watchlist!", {position: "bottom-right", autoClose: 2000});
          setItems((prev) => prev.filter((item) => item.id !== id));
        })
        .catch(() => toast.error("Failed to remove.", {position: "bottom-right"}));
    } else {
      dispatch(removeFromFavoritesAsync({accountId, sessionId, id, type: contentType}))
        .unwrap()
        .then(() => {
          toast.success("Removed from favorites!", {position: "bottom-right", autoClose: 2000});
          setItems((prev) => prev.filter((item) => item.id !== id));
        })
        .catch(() => toast.error("Failed to remove.", {position: "bottom-right"}));
    }
  };

  return (
    <div className={classes.pageContainer}>
      <h1 className={classes.title}>{type === "watchlist" ? "Your Watchlist" : "Your Favorites"}</h1>

      {loading ? (
        <p className={classes.loadingMessage}>Loading...</p>
      ) : items.length === 0 ? (
        <p className={classes.emptyMessage}>No items found in your {type}.</p>
      ) : (
        <div className={classes.gridContainer}>
          {items.map((item) => (
            <div key={item.id} className={classes.card}>
              <img
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/placeholder.png"}
                alt={item.title || item.name}
                className={classes.poster}
              />
              <div className={classes.details}>
                <Link
                  className={classes.movieLink}
                  to={`/movflix/page?content_type=${item.type}&id=${item.id}&title=${item.name || item.title}`}
                >
                  <h3 className={classes.movieTitle}>{item.title || item.name}</h3>
                </Link>
                <p className={classes.rating}>⭐ {item.vote_average?.toFixed(1) || "N/A"}</p>
                <button className={classes.removeButton} onClick={() => handleRemove(item.id, item.type)}>
                  {t("remove")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
