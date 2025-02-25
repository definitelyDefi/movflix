import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../../store/store";
import {setTheme, setImageQuality, setLanguage, setNotifications, setAutoplayTrailers} from "../../store/settingsSlice";
import {logout} from "../../store/authSlice";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./SettingsPage.module.css";
import {useTranslation} from "react-i18next";

export const SettingsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {theme, imageQuality, language, notifications, autoplayTrailers} = useSelector(
    (state: RootState) => state.settings
  );
  const {i18n, t} = useTranslation();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedQuality, setSelectedQuality] = useState(imageQuality);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isNotificationsOn, setIsNotificationsOn] = useState(notifications);
  const [isAutoplayOn, setIsAutoplayOn] = useState(autoplayTrailers);

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setSelectedTheme(newTheme);
    dispatch(setTheme(newTheme));
    toast.success(`Theme changed to ${newTheme === "light" ? "Light" : "Dark"} Mode!`);
  };

  const handleQualityChange = (quality: "480p" | "720p" | "1080p" | "4K") => {
    setSelectedQuality(quality);
    dispatch(setImageQuality(quality));
    toast.success(`Image Quality set to ${quality}`);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang); // Persist language selection
    dispatch(setLanguage(newLang));
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOn(!isNotificationsOn);
    dispatch(setNotifications(!isNotificationsOn));
    toast.info(`Notifications ${!isNotificationsOn ? "enabled" : "disabled"}`);
  };

  const handleAutoplayToggle = () => {
    setIsAutoplayOn(!isAutoplayOn);
    dispatch(setAutoplayTrailers(!isAutoplayOn));
    toast.info(`Autoplay Trailers ${!isAutoplayOn ? "enabled" : "disabled"}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.info("You have been logged out.");
  };

  return (
    <div className={classes.wrapper}>
      {" "}
      <div className={classes.container}>
        <h1 className={classes.heading}>Settings</h1>

        <div className={classes.settingBlock}>
          <h3>Image Quality</h3>
          <select value={selectedQuality} onChange={(e) => handleQualityChange(e.target.value as any)}>
            <option value="480p">480p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="4K">4K</option>
          </select>
        </div>

        <div className={classes.settingBlock}>
          <h3>Language</h3>
          <select value={i18n.language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="ru">Russian</option>
          </select>
        </div>

        <div className={classes.settingBlock}>
          <h3>Notifications</h3>
          <label className={classes.switch}>
            <input type="checkbox" checked={isNotificationsOn} onChange={handleNotificationsToggle} />
            <span className={classes.slider}></span>
          </label>
        </div>

        <div className={classes.settingBlock}>
          <h3>Autoplay Trailers</h3>
          <label className={classes.switch}>
            <input type="checkbox" checked={isAutoplayOn} onChange={handleAutoplayToggle} />
            <span className={classes.slider}></span>
          </label>
        </div>

        <button className={classes.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
