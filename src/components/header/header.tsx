import React, {useState, KeyboardEvent, ChangeEvent, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import classes from "./header.module.css";
import logo from "./../../assets/logo100.png";
import {BurgerMenu} from "../";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {fetchWatchlist, removeFromWatchlistAsync} from "../../store/watchlistSlice";
import {setSearchQueryAndClearFilters} from "../../store/filtersSlice";
import {logout} from "../../store/authSlice";
import {DropDown} from "./../dropDown/DropDown";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export const ProfileMenu: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const watchlist = useSelector((state: RootState) => state.watchlist.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accountId = useSelector((state: RootState) =>
    state.auth.accountDetails ? state.auth.accountDetails.id : null
  );

  const sessionId = useSelector((state: RootState) => (state.auth.sessionId ? state.auth.sessionId : null));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && watchlist.length === 0 && accountId && sessionId) {
      dispatch(fetchWatchlist({accountId, sessionId}));
    }
  }, [dispatch, isAuthenticated, accountId, sessionId, watchlist.length]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success(t("logout"), {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "light",
    });
    navigate("/movflix/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.profileMenuContainer}>
      {isAuthenticated ? (
        <div className={classes.profileDropdown}>
          <button className={`${classes.loginButton} ${classes.profileButton}`} onClick={toggleDropdown}>
            {t("profile")}
          </button>
          {isDropdownOpen && (
            <div className={classes.dropdownMenu}>
              <button
                className={classes.dropdownItem}
                onClick={() => {
                  navigate("/movflix/profile");
                  setIsDropdownOpen(false);
                }}
              >
                {t("view_profile")}
              </button>
              <button
                className={classes.dropdownItem}
                onClick={() => {
                  navigate("/movflix/settings");
                  setIsDropdownOpen(false);
                }}
              >
                {t("settings")}
              </button>
              <button className={classes.dropdownItem} onClick={() => navigate("/movflix/about")}>
                {t("about")}
              </button>
              <button className={classes.dropdownItem} onClick={handleLogout}>
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className={classes.loginButton} onClick={() => navigate("/movflix/login")}>
          {t("login")}
        </button>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState<string>("");
  const [menuEnabled] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const watchlist = useSelector((state: RootState) => state.watchlist.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const accountId = useSelector((state: RootState) =>
    state.auth.accountDetails ? state.auth.accountDetails.id : null
  );

  // console.log("watchlist", watchlist);

  const sessionId = useSelector((state: RootState) => (state.auth.sessionId ? state.auth.sessionId : null));

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (query) {
      dispatch(setSearchQueryAndClearFilters(query));
      navigate(`/movflix/discover/?tv&search=${query}`);
    }
  };

  const handleRemoveFromWatchlist = (id: number, type: "movie" | "tv") => {
    dispatch(removeFromWatchlistAsync({accountId, sessionId, id: id, type}))
      .unwrap()
      .catch((error) => {
        toast.success(t("removed_from_watchlist"), {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
        });
        toast.error(t("failed_to_remove_from_watchlist"));
        console.error("Failed to remove from watchlist:", error);
      });
  };

  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <header className={classes.container}>
        <Link className={classes.logoBlock} to="/movflix/">
          <img src={logo} className={classes.logo} alt="Movflix Logo" />
          <h3 className={classes.logoText}>Movflix</h3>
        </Link>

        <nav className={classes.items}>
          <DropDown
            title={t("movies")}
            links={[
              {label: t("popular"), category: "popular", content_type: "movie"},
              {label: t("upcoming"), category: "upcoming", content_type: "movie"},
              {label: t("best"), category: "best", content_type: "movie"},
            ]}
          />
          <DropDown
            title={t("shows")}
            links={[
              {label: t("trending"), category: "trending", content_type: "tv"},
              {label: t("on_air_now"), category: "on_the_air", content_type: "tv"},
              {label: t("best"), category: "best", content_type: "tv"},
            ]}
          />
        </nav>

        <div className={classes.items}>
          <input
            type="text"
            placeholder={t("search")}
            className={classes.searchBar}
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={classes.submitButton} onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>

        <div className={classes.watchlistContainer}>
          <button className={classes.watchlistButton} onClick={handleWatchlistToggle}>
            {t("watchlist")}
            {isAuthenticated ? <span className={classes.watchlistCount}>{watchlist.length}</span> : null}
          </button>
          {isAuthenticated && isDropdownOpen && (
            <div className={classes.watchlistDropdown}>
              {watchlist.length > 0 ? (
                watchlist.map((item) => (
                  <div key={item.id} className={classes.watchlistItem}>
                    <Link to={`/movflix/page?content_type=${item.type}&id=${item.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        alt={item.title}
                        className={classes.watchlistImage}
                      />
                    </Link>
                    <Link to={`/movflix/page?content_type=${item.type}&id=${item.id}`}>
                      <h4 className={classes.watchlistTitle}>{item.title}</h4>
                    </Link>
                    <button
                      className={classes.removeButton}
                      onClick={() => handleRemoveFromWatchlist(item.id, item.type)}
                    >
                      {t("remove")}
                    </button>
                  </div>
                ))
              ) : (
                <p className={classes.emptyWatchlist}>{t("empty_watchlist")}</p>
              )}
            </div>
          )}
        </div>

        <ProfileMenu />
      </header>
      <BurgerMenu status={menuEnabled} />

      {showPopup && (
        <div className={classes.popup}>
          <p className={classes.popupText}>{t("please_log_in")}</p>
        </div>
      )}
    </>
  );
};
