import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {resetFilters} from "../../store/filtersSlice";
import {setContentType} from "../../store/filtersSlice";
import {setCategory} from "../../store/filtersSlice";
import classes from "./DropDown.module.css";
interface DropdownProps {
  title: string;
  links: {label: string; category: string; content_type: "movie" | "tv"}[];
}

export const DropDown: React.FC<DropdownProps> = ({title, links}) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const dropdownHandle = (category: string, content_type: "movie" | "tv") => {
    dispatch(resetFilters());
    dispatch(setContentType(content_type));
    dispatch(setCategory(category));
    navigate(`/movflix/discover/${content_type}?category=${category}`);
  };

  return (
    <div className={classes.dropDown}>
      <button className={`${classes.link} ${classes.withDropdown}`}>{title}</button>
      <div className={classes.dropDownContent}>
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => dropdownHandle(link.category, link.content_type)}
            className={classes.linkDropdown}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
};
