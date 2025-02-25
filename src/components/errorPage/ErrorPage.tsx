import React from "react";
import styles from "./ErrorPage.module.css";
import {useTranslation} from "react-i18next";

interface ErrorPageProps {
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({message}) => {
  const handleRetry = () => {
    window.location.reload();
  };
  const {t} = useTranslation();

  return (
    <div className={styles.errorPage}>
      <h1>{t("something_went_wrong")}</h1>
      <p>{message}</p>
      <button className={styles.retryButton} onClick={handleRetry}>
        {t("retry")}
      </button>
    </div>
  );
};

export default ErrorPage;
