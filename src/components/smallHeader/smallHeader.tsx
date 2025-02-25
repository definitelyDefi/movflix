import React from "react";
import {useNavigate} from "react-router-dom";
import classes from "./smallHeader.module.css";
import {useTranslation} from "react-i18next";

interface SmallHeaderProps {
  headerImage: string;
  title: string;
  date: string;
  padding?: string;
  text?: string;
}

export const SmallHeader: React.FC<SmallHeaderProps> = ({headerImage, title, date, padding, text}) => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  return (
    <div className={classes.header} style={padding ? {padding} : undefined}>
      <img className={classes.headerImage} src={`https://image.tmdb.org/t/p/original${headerImage}`} alt={title} />
      <div>
        <h3 className={classes.headerTitle}>
          {title} ({date.slice(0, 4)})
        </h3>
        <button className={classes.backButton} onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
          </svg>
          {text || t("back")}
        </button>
      </div>
    </div>
  );
};
