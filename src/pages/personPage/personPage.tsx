import React, {useEffect, useState} from "react";
import classes from "./personPage.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {getPerson} from "../../api";
import {get_cast} from "../../helpers/sortPersonRoles";
import {Preloader, PersonDetails} from "../../components";
import ErrorPage from "../../components/errorPage/ErrorPage";

import poster_placeholder from "./../../assets/person_placeholder.jpg";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface CastItem {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  character?: string;
}

interface PersonDetailsType {
  profile_path?: string;
  homepage?: string;
  external_ids?: Record<string, string | null>;
  known_for_department?: string;
  birthday?: string;
  deathday?: string | null;
  place_of_birth?: string;
  also_known_as?: string[];
  name: string;
  biography?: string;
  combined_credits: {
    cast: CastItem[];
  };
}

export const PersonPage: React.FC = () => {
  const location = useLocation();
  const {t} = useTranslation();
  const [person, setPerson] = useState<PersonDetailsType | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const personId = queryParams.get("id");

    if (!personId) {
      setError("No person ID provided.");
      setIsFetching(false);
      return;
    }

    const fetchPerson = async () => {
      try {
        setIsFetching(true);
        const personData = await getPerson(Number(personId));
        setPerson(personData);
        setError(null);
      } catch (err) {
        console.error("Error fetching person data:", err);
        setError("Failed to fetch person details.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPerson();
  }, [location.search]);

  if (isFetching) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorPage message={"404 not found"} />;
  }

  if (!person) {
    return <ErrorPage message="Person data is not available." />;
  }

  const rolesHistory = get_cast(person.combined_credits.cast);
  const reversedKeys = Object.keys(rolesHistory).reverse();

  return (
    <div className={classes.container}>
      <div className={classes.leftBlock}>
        <img
          className={classes.posterImage}
          alt={person.name}
          src={person.profile_path ? `https://image.tmdb.org/t/p/original${person.profile_path}` : poster_placeholder}
        />
        <PersonDetails
          items={{
            homepage: person.homepage || undefined,
            ids: person.external_ids || {},
            known_by: person.known_for_department || "Unknown",
            birth_day: person.birthday || "Unknown",
            death_day: person.deathday || "N/A",
            birth_place: person.place_of_birth || "Unknown",
            known_as: person.also_known_as || [],
          }}
          type="person"
        />
      </div>
      <div className={classes.rightBlock}>
        <h3 className={classes.name}>{person.name}</h3>
        <div>
          <h3 className={classes.bioTitle}>{t("biography")}</h3>
          <p className={classes.bio}>{person.biography || t("biography_not_available")}</p>
        </div>

        <h3 className={classes.rolesTitle}>{t("acting")}</h3>
        <div className={classes.rolesBlock}>
          {reversedKeys.map((key) => (
            <div key={key} className={classes.roleList}>
              <h3 className={classes.roleYear}>{key}</h3>
              <div className={classes.roles}>
                {rolesHistory[key].map((item) => (
                  <div key={item.id} className={classes.role}>
                    <h3 className={classes.roleName}>
                      <Link
                        className={classes.roleLink}
                        to={
                          item.media_type === "tv"
                            ? `/movflix/page?content_type=tv&id=${item.id}&title=${item.title}`
                            : `/movflix/page?content_type=movie&id=${item.id}&title=${item.title}`
                        }
                      >
                        {item.title || "Untitled"}
                      </Link>{" "}
                      {item.character ? `as ${item.character}` : null}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
