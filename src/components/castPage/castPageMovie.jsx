import React from "react";
import classes from "./castPage.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import person_placeholder from "./../../assets/person_placeholder.jpg";
import { SmallHeader } from "../smallHeader/smallHeader";
import Preloader from "../decorative/preloader/preloader";

const CastPageMovie = () => {
  let navigate = useNavigate();
  let title = useSelector((state) => state.movies.currentMovie.title);
  let date = useSelector((state) => state.movies.currentMovie.release_date);
  let full_credits = useSelector((state) => state.movies.currentMovie.credits);
  let headerImage = useSelector(
    (state) => state.movies.currentMovie.poster_path
  );
  let isFetching = useSelector((state) => state.movies.isFetching);

  return (
    <div className={classes.container}>
      {isFetching ? (
        <Preloader />
      ) : (
        <>
          <SmallHeader
            headerImage={headerImage}
            title={title}
            date={date}
            text={"Back to movie"}
            padding={"250"}
          />

          <div className={classes.items}>
            <div className={classes.castBlock}>
              <h1 className={classes.castHeader}>
                The cast of the movie{" "}
                <span className={classes.grayText}>
                  {full_credits.cast.length}
                </span>
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
                    />
                    <div className={classes.castInfo}>
                      <h3
                        className={classes.castName}
                        onClick={() =>
                          navigate(
                            `/movflix/persons/page/${person.id}/${person.name}`
                          )
                        }
                      >
                        {person.name}
                      </h3>
                      <ul className={classes.roles}>
                        {person.character ? (
                          <li className={classes.role}>{person.character}</li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={classes.crewBlock}>
              <h1 className={classes.crewHeader}>
                The crew of the movie
                <span className={classes.grayText}>
                  {full_credits.crew.length}
                </span>
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
                    />
                    <div className={classes.castInfo}>
                      <h3
                        className={classes.castName}
                        onClick={() =>
                          navigate(
                            `/movflix/persons/page/${person.id}/${person.name}`
                          )
                        }
                      >
                        {person.name}
                      </h3>
                      <ul className={classes.jobs}>
                        {person.job ? (
                          <li className={classes.role}>{person.job}</li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CastPageMovie;
