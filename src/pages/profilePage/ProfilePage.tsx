import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getItems} from "../../api";
import classes from "./ProfilePage.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useTranslation} from "react-i18next";
import {Preloader} from "../../components";
import ErrorPage from "../../components/errorPage/ErrorPage";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
}

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<MediaItem[]>([]);
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {t} = useTranslation();
  const {accountDetails, sessionId} = useSelector((state: RootState) => state.auth);
  // console.log("wtch", watchlist);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!accountDetails || !sessionId) {
        setError("Account details or session ID missing.");
        setIsLoading(false);
        return;
      }

      try {
        const fetchedWatchlist = await getItems(accountDetails.id, sessionId, true);
        const fetchedFavorites = await getItems(accountDetails.id, sessionId, false);

        setWatchlist(fetchedWatchlist);
        setFavorites(fetchedFavorites);
        setError(null);
      } catch (err) {
        setError("Failed to fetch profile data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [accountDetails, sessionId]);

  const handleLogout = () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("accountDetails");
    navigate("/movflix/login");
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorPage message="Error during loading." />;
  }

  if (!accountDetails) {
    navigate("/movflix/login");
    return null;
  }

  const avatarUrl =
    accountDetails.avatar && accountDetails.avatar.tmdb && accountDetails.avatar.tmdb.avatar_path
      ? `https://image.tmdb.org/t/p/w500${accountDetails.avatar.tmdb.avatar_path}`
      : accountDetails.avatar && accountDetails.avatar.gravatar && accountDetails.avatar.gravatar.hash
      ? `https://www.gravatar.com/avatar/${accountDetails.avatar.gravatar.hash}`
      : "https://via.placeholder.com/150";

  return (
    <div className={classes.profileContainer}>
      <div className={classes.header}>
        <img src={avatarUrl} alt={`${accountDetails.username}'s avatar`} className={classes.avatar} />
        <div className={classes.userInfo}>
          <h1 className={classes.username}>
            {t("welcome")}, {accountDetails.username}!
          </h1>
          <p className={classes.accountId}>
            {t("account_id")}: {accountDetails.id}
          </p>
          <button className={classes.logoutButton} onClick={handleLogout}>
            {t("logout")}
          </button>
        </div>
      </div>

      <div className={classes.section}>
        <Link className={classes.sectionLink} to={"/movflix/lists?type=favorites"}>
          <h2 className={classes.sectionTitle}>{t("favorite_movies")}</h2>
        </Link>
        <div className={classes.grid}>
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div key={item.id} className={classes.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className={classes.poster}
                />
                <Link
                  className={classes.sectionLink}
                  to={`/movflix/page?content_type=${item.name ? "tv" : "movie"}&title=${item.name || item.title}&id=${
                    item.id
                  }`}
                >
                  <p className={classes.title}>{item.title || item.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className={classes.emptyMessage}>{t("no_favorites")}</p>
          )}
        </div>
      </div>

      <div className={classes.section}>
        <Link className={classes.sectionLink} to={"/movflix/lists?type=watchlist"}>
          <h2 className={classes.sectionTitle}>{t("your_watchlist")}</h2>
        </Link>
        <div className={classes.grid}>
          {watchlist.length > 0 ? (
            watchlist.map((item) => (
              <div key={item.id} className={classes.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                  className={classes.poster}
                />
                <Link
                  className={classes.sectionLink}
                  to={`/movflix/page?content_type=${item.name ? "tv" : "movie"}&title=${item.name || item.title}&id=${
                    item.id
                  }`}
                >
                  <p className={classes.title}>{item.title || item.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className={classes.emptyMessage}>{t("empty_watchlist")}</p>
          )}
        </div>
      </div>
    </div>
  );
};
