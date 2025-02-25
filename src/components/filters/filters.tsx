import React, {useEffect, useState, ChangeEvent} from "react";
import classes from "./filters.module.css";
import {tvgenres, moviegenres} from "../../genres";
import {useSelector, useDispatch} from "react-redux";
import {setFilters, setContentType} from "../../store/filtersSlice";
import {RootState} from "../../store/store";
import {useTranslation} from "react-i18next";

export const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const filters = useSelector((state: RootState) => state.filters.filters);
  const content_type = useSelector((state: RootState) => state.filters.contentType);

  const [localFilters, setLocalFilters] = useState(filters);

  const genres = content_type === "movie" ? moviegenres : tvgenres;

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    const updatedFilters = {...localFilters, [name]: value};
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));
  };

  const handleGenreChange = (id: number) => {
    const selectedGenres = localFilters.with_genres ? localFilters.with_genres.split(",").map(Number) : [];
    const updatedGenres = selectedGenres.includes(id)
      ? selectedGenres.filter((genreId: number) => genreId !== id)
      : [...selectedGenres, id];
    const updatedFilters = {...localFilters, with_genres: updatedGenres.join(",")};
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));
  };

  const handleContentTypeSwitch = () => {
    const newType = content_type === "movie" ? "tv" : "movie";
    dispatch(setContentType(newType));
  };

  const isDisabled = Boolean(localFilters.search);
  return (
    <div className={classes.filtersContainer}>
      <h3 className={classes.filtersTitle}>{t("filters")}</h3>

      <div className={classes.filterGroup}>
        <label htmlFor="search">{t("search")}</label>
        <input
          type="text"
          name="search"
          placeholder="Search by title or name"
          value={localFilters.search || ""}
          onChange={handleChange}
          className={classes.input}
        />
      </div>

      <div className={classes.switchContainer} onClick={handleContentTypeSwitch}>
        <span className={content_type === "movie" ? classes.active : ""}>{t("movies")}</span>
        <span className={content_type === "tv" ? classes.active : ""}>{t("shows")}</span>
      </div>

      <div className={classes.filterGroup}>
        <label htmlFor="sort_by">{t("sort_by")}</label>
        <select
          name="sort_by"
          value={localFilters.sort_by}
          onChange={handleChange}
          className={classes.select}
          disabled={isDisabled}
        >
          <option value="popularity.desc">{t("popularity_descending")}</option>
          <option value="popularity.asc">{t("popularity_ascending")}</option>
          <option value="vote_average.desc">{t("rating_descending")}</option>
          <option value="vote_average.asc">{t("rating_ascending")}</option>
        </select>
      </div>

      <div className={classes.filterGroup}>
        <label>{t("genres")}</label>
        <div className={classes.genreCheckboxes}>
          {genres.map((genre) => (
            <label key={genre.id} className={classes.checkboxLabel}>
              <input
                disabled={isDisabled}
                type="checkbox"
                checked={
                  localFilters.with_genres ? localFilters.with_genres.split(",").map(Number).includes(genre.id) : false
                }
                onChange={() => handleGenreChange(genre.id)}
              />
              <span className={classes.checkboxText}>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={classes.filterGroup}>
        <label htmlFor="with_keywords">{t("keywords")}</label>
        <input
          type="text"
          name="with_keywords"
          placeholder="Comma-separated keywords"
          value={localFilters.with_keywords || ""}
          onChange={handleChange}
          className={classes.input}
          disabled={isDisabled}
        />
      </div>

      <div className={classes.filterGroup}>
        <label htmlFor="vote_average_gte">{t("min_rating")}</label>
        <input
          type="number"
          name="vote_average_gte"
          value={localFilters.vote_average_gte || ""}
          onChange={handleChange}
          className={classes.input}
        />
      </div>
      <div className={classes.filterGroup}>
        <label htmlFor="vote_average_lte">{t("max_rating")}</label>
        <input
          type="number"
          name="vote_average_lte"
          value={localFilters.vote_average_lte || ""}
          onChange={handleChange}
          className={classes.input}
        />
      </div>
    </div>
  );
};
