import React, { useEffect } from "react";
import classes from "./personPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPerson } from "../../http";
import { get_cast } from "../../helpers/sortPersonRoles";
import { Preloader, PersonDetails, Header } from "../../components";

import poster_placeholder from "./../../assets/person_placeholder.jpg";

export const PersonPage = () => {
  let dispatch = useDispatch();
  let params = useParams();
  let navigate = useNavigate();
  let person = useSelector((state) => state.person.currentPerson);
  let isFetching = useSelector((state) => state.global.isFetching);
  let rolesHistory = get_cast(person.combined_credits.cast);
  const reversedKeys = Object.keys(rolesHistory).reverse();

  useEffect(() => {
    dispatch(getPerson(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      <Header />
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={classes.container}>
          <div className={classes.leftBlock}>
            <img
              className={classes.posterImage}
              alt=""
              src={
                person.profile_path ? `https://image.tmdb.org/t/p/original${person.profile_path}` : poster_placeholder
              }
            />
            <PersonDetails
              items={{
                homepage: person.homepage,
                ids: person.external_ids,
                known_by: person.known_for_department,
                birth_day: person.birthday,
                death_day: person.deathday,
                birth_place: person.place_of_birth,
                known_as: person.also_known_as,
              }}
              type="person"
            />
          </div>
          <div className={classes.rightBlock}>
            <h3 className={classes.name}>{person.name}</h3>
            <div>
              <h3 className={classes.bioTitle}>Biography</h3>
              <p className={classes.bio}>{person.biography}</p>
            </div>

            <h3 className={classes.rolesTitle}>Acting</h3>
            <div className={classes.rolesBlock}>
              {reversedKeys.map((key) => {
                return (
                  <div className={classes.roleList}>
                    <h3 className={classes.roleYear}>{key}</h3>
                    <div className={classes.roles}>
                      {rolesHistory[key].map((item) => (
                        <div className={classes.role}>
                          <h3 className={classes.roleName}>
                            <span
                              onClick={() => {
                                item.media_type === "tv"
                                  ? navigate(`/movflix/shows/page/${item.id}/${item.title}`)
                                  : navigate(`/movflix/movies/page/${item.id}/${item.title}`);
                              }}
                            >
                              {item.title}
                            </span>{" "}
                            {item.character ? `as ${item.character}` : null}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
