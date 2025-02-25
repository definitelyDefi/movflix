import React from "react";
import classes from "./aboutPage.module.css";
import logo from "./../../assets/logo100.png";
import avatar from "./../../assets/avatar_author.png";
import {useTranslation} from "react-i18next";

export const AboutPage: React.FC = () => {
  const {t} = useTranslation();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <section>
          <h1 className={classes.heading}>{t("the_app")}</h1>
          <div className={classes.appBlock}>
            <div className={classes.about}>
              <img src={logo} className={classes.logo} alt="App Logo" />
              <div className={classes.info}>
                <h1 className={classes.name}>Movflix React</h1>
                <a
                  className={classes.button}
                  href="https://github.com/definitelyDefi/movflix"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    color="#ffffff"
                    width="16"
                    height="16"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9z..."
                    />
                  </svg>
                  Github
                </a>
              </div>
            </div>
            <p className={classes.description}>{t("about_description_app")}</p>
          </div>
        </section>

        <section>
          <h1 className={classes.heading}>{t("me")}</h1>
          <div className={classes.appBlock}>
            <div className={classes.about}>
              <img src={avatar} className={classes.avatar} alt="Author Avatar" />
              <div className={classes.info}>
                <h1 className={classes.name}>
                  Denys Bilyi <span className={classes.grayText}>(definitelydefi)</span>
                </h1>
                <a
                  className={classes.button}
                  href="https://github.com/definitelyDefi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    color="#ffffff"
                    width="16"
                    height="16"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9z..."
                    />
                  </svg>
                  Github
                </a>
              </div>
            </div>
            <p className={classes.description}>{t("about_description_me")}</p>
          </div>
        </section>
      </div>
    </div>
  );
};
