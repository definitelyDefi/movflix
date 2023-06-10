import React from "react";
import classes from "./burgerMenu.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const BurgerMenu = ({ status }) => {
  const [query, setQuery] = useState("");
  let navigate = useNavigate();
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
  if (status) {
    return (
      <nav className={classes.container}>
        <div className={classes.burgerMenuWrapper}>
          <div className={classes.burgerItem}>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{ width: "200px", backgroundColor: "transparent" }}
              >
                Movies
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="/movflix/categories/movie/popular">Popular movies</Dropdown.Item>
                <Dropdown.Item href="/movflix/categories/movie/top rated">Best movies</Dropdown.Item>
                <Dropdown.Item href="/movflix/categories/movie/upcoming">Upcoming movies</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className={classes.burgerItem}>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{ width: "200px", backgroundColor: "transparent" }}
              >
                Shows
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="/movflix/categories/tv/popular">Popular shows</Dropdown.Item>
                <Dropdown.Item href="/movflix/categories/tv/top rated">Best shows</Dropdown.Item>
                <Dropdown.Item href="/movflix/categories/tv/upcoming">Upcoming shows</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className={classes.burgerItem}>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{ width: "200px", backgroundColor: "transparent" }}
              >
                Actors
              </Dropdown.Toggle>

              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="/movflix/categories/persons/popular">Popular actors</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className={classes.burgerItem}>
            <div className={classes.searchField}>
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
          </div>
        </div>
      </nav>
    );
  }

  return null;
};
