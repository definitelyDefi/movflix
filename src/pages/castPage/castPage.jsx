import React, {useEffect, useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import person_placeholder from "./../../assets/person_placeholder.jpg";
import {SmallHeader, Preloader} from "../../components";
import classes from "./castPage.module.css";
import {getCredits, getContentDetails} from "../../api";
import {Link} from "react-router-dom";
import ErrorPage from "../../components/errorPage/ErrorPage";
import {useTranslation} from "react-i18next";
export const CastPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const contentType = searchParams.get("content_type");
  const id = searchParams.get("id");

  useEffect(() => {
    if (!contentType || !id) return;

    const fetchData = async () => {
      try {
        setIsFetching(true);

        const detailsData = await getContentDetails(contentType, id);
        setDetails(detailsData);

        const creditsData = await getCredits(contentType, id);
        setCredits(creditsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [contentType, id]);

  if (isFetching) {
    return <Preloader />;
  }

  if (!details || !credits) {
    return <ErrorPage message={"Failed to get cast"} />;
  }

  return (
    <div className={classes.container}>
      <SmallHeader
        headerImage={details.poster_path}
        title={contentType === "movie" ? details.title : details.name}
        date={contentType === "movie" ? details.release_date : details.first_air_date}
        text={`Back to ${contentType === "movie" ? "movie" : "show"}`}
        padding={"250"}
      />
      <div className={classes.items}>
        <div className={classes.castBlock}>
          <h1 className={classes.castHeader}>
            {contentType === "movie" ? t("the_cast_of_the_movie") : t("the_cast_of_the_series")}{" "}
            <span className={classes.grayText}>{credits.cast.length}</span>
          </h1>
          <div className={classes.castItems}>
            {credits.cast.map((person) => (
              <div key={person.id} className={classes.castItem}>
                <Link to={`/movflix/person?id=${person.id}`}>
                  <img
                    className={classes.castImage}
                    src={
                      person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : person_placeholder
                    }
                    alt={person.name}
                  />
                </Link>
                <div className={classes.castInfo}>
                  <Link className={classes.castLink} to={`/movflix/person?id=${person.id}`}>
                    <h3 className={classes.castName}>{person.name}</h3>
                  </Link>

                  <ul className={classes.roles}>
                    {contentType === "tv"
                      ? person.roles.map((role) =>
                          role.character ? (
                            <li key={role.character} className={classes.role}>
                              {role.character}
                              <span className={classes.grayText}>
                                {role.episode_count} {t("episodes")}
                              </span>
                            </li>
                          ) : null
                        )
                      : person.character && <li className={classes.role}>{person.character}</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.crewBlock}>
          <h1 className={classes.crewHeader}>
            {contentType === "movie" ? t("the_crew_of_the_movie") : t("the_crew_of_the_series")}{" "}
            <span className={classes.grayText}>{credits.crew.length}</span>
          </h1>
          <div className={classes.castItems}>
            {credits.crew.map((person) => (
              <div key={person.id} className={classes.castItem}>
                <img
                  className={classes.castImage}
                  src={
                    person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : person_placeholder
                  }
                  alt={person.name}
                  onClick={() => navigate(`/movflix/person/page/${person.id}/${person.name}`)}
                />
                <div className={classes.castInfo}>
                  <Link className={classes.castLink} to={`/movflix/person?id=${person.id}`}>
                    <h3 className={classes.castName}>{person.name}</h3>
                  </Link>

                  <ul className={classes.jobs}>
                    {contentType === "tv"
                      ? person.jobs.map((job) =>
                          job.job ? (
                            <li key={job.job} className={classes.role}>
                              {job.job}
                              <span className={classes.grayText}>
                                {job.episode_count} {t("episodes")}
                              </span>
                            </li>
                          ) : null
                        )
                      : person.job && <li className={classes.role}>{person.job}</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
