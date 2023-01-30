import React from "react";
import classes from "./header.module.css";
import logo from "./../../assets/logo100.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BurgerMenu } from "./../";

export const Header = () => {
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuEnabled, setMenuEnabled] = useState(false);
  const handleKeypress = (e) => {
    if (e.key === "Enter" && query) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    if (query) {
      navigate(`/movflix/search/${query}`);
    }
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoBlock} onClick={() => navigate("/movflix/")}>
          <img src={logo} className={classes.logo} alt="" />
          <h3 className={classes.logoText}>Movflix</h3>
        </div>
        <div className={classes.items}>
          <div className={classes.dropDown}>
            <button className={`${classes.link} ${classes.withDropdown}`}>Movies</button>
            <div className={classes.dropDownContent}>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/movie/popular")}>
                Popular
              </button>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/movie/upcoming")}>
                Upcoming
              </button>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/movie/latest")}>
                Latest
              </button>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/movie/top_rated")}>
                Best
              </button>
            </div>
          </div>

          <div className={classes.dropDown}>
            <button className={`${classes.link} ${classes.withDropdown}`}>Shows</button>
            <div className={classes.dropDownContent}>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/tv/popular")}>
                Trending
              </button>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/tv/on_the_air")}>
                On air now
              </button>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/tv/top_rated")}>
                Best
              </button>
            </div>
          </div>

          <div className={classes.dropDown}>
            <button className={`${classes.link} ${classes.withDropdown}`}>Persons</button>
            <div className={classes.dropDownContent}>
              <button className={classes.linkDropdown} onClick={() => navigate("/movflix/categories/person/popular")}>
                Popular
              </button>
            </div>
          </div>
        </div>
        <div className={classes.items}>
          <input
            onKeyPress={handleKeypress}
            type="text"
            placeholder="Search..."
            className={classes.searchBar}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={classes.submitButton} onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <div className={classes.items}>
          <button className={classes.link} onClick={() => navigate("/mofvlix/about")}>
            About
          </button>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="white"
          viewBox="0 0 16 16"
          className={classes.burgerIcon}
          onClick={() => setMenuEnabled(!menuEnabled)}
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </div>
      <BurgerMenu status={menuEnabled} />
    </>
  );
};
