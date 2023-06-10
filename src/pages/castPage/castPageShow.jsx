import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./castPage.module.css";
import { getShowSearchCrew } from "../../http";
import { useDispatch, useSelector } from "react-redux";
import person_placeholder from "./../../assets/person_placeholder.jpg";
import { SmallHeader, Preloader } from "../../components";

export const CastPageShow = () => {
  let dispatch = useDispatch();
  let params = useParams();
  let navigate = useNavigate();
  let title = useSelector((state) => state.shows.currentShow.name);
  let date = useSelector((state) => state.shows.currentShow.first_air_date);
  let full_credits = useSelector((state) => state.shows.currentShow.full_credits);
  let headerImage = useSelector((state) => state.shows.currentShow.poster_path);
  let isFetching = useSelector((state) => state.shows.isFetching);
  useEffect(() => {
    dispatch(getShowSearchCrew(params.id));
  }, [params.id, dispatch]);

  return (
    <div className={classes.container}>
      {isFetching ? (
        <Preloader />
      ) : (
        <div>
          <SmallHeader headerImage={headerImage} title={title} date={date} text={"Back to show"} padding={"250"} />
          <div className={classes.items}>
            <div className={classes.castBlock}>
              <h1 className={classes.castHeader}>
                The cast of the series <span className={classes.grayText}>{full_credits.cast.length}</span>
              </h1>
              <div className={classes.castItems}>
                {full_credits.cast.map((person) => (
                  <div className={classes.castItem}>
                    <img
                      className={classes.castImage}
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                          : person_placeholder
                      }
                      alt={""}
                      onClick={() => navigate(`/movflix/persons/page/${person.id}/${person.name}`)}
                    />
                    <div className={classes.castInfo}>
                      <h3
                        className={classes.castName}
                        onClick={() => navigate(`/movflix/persons/page/${person.id}/${person.name}`)}
                      >
                        {person.name}
                      </h3>
                      <ul className={classes.roles}>
                        {person.roles.map((role) =>
                          role.character ? (
                            <li className={classes.role}>
                              {role.character}
                              <span className={classes.grayText}>{role.episode_count} episodes</span>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.crewBlock}>
              <h1 className={classes.crewHeader}>
                The crew of the series
                <span className={classes.grayText}>{full_credits.crew.length}</span>
              </h1>
              <div className={classes.castItems}>
                {full_credits.crew.map((person) => (
                  <div className={classes.castItem}>
                    <img
                      className={classes.castImage}
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                          : person_placeholder
                      }
                      alt={""}
                      onClick={() => navigate(`/movflix/persons/page/${person.id}/${person.name}`)}
                    />
                    <div className={classes.castInfo}>
                      <h3
                        className={classes.castName}
                        onClick={() => navigate(`/movflix/persons/page/${person.id}/${person.name}`)}
                      >
                        {person.name}
                      </h3>
                      <ul className={classes.jobs}>
                        {person.jobs.map((job) =>
                          job.job ? (
                            <li className={classes.role}>
                              {job.job}
                              <span className={classes.grayText}>{job.episode_count} episodes</span>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
