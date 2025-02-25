import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {createRequestToken} from "../../api";
import classes from "./LoginPage.module.css";
import {useTranslation} from "react-i18next";

const TMDB_AUTH_URL = "https://www.themoviedb.org/authenticate";
const REDIRECT_URL: any = process.env.REACT_APP_CALLBACK_URL;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId && sessionId !== "null") {
      navigate("/movflix/profile");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const requestToken = await createRequestToken();
      if (requestToken) {
        const authUrl = `${TMDB_AUTH_URL}/${requestToken}?redirect_to=${encodeURIComponent(REDIRECT_URL)}`;
        window.location.href = authUrl;
      } else {
        console.error("Failed to get a request token.");
      }
    } catch (error) {
      console.error("Failed to initiate login:", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{t("welcome_to_movflix")}</h1>
      <button className={classes.loginButton} onClick={handleLogin}>
        {t("login_with_tmdb")}
      </button>
    </div>
  );
};
