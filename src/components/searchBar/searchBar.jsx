import React, { useState } from "react";
import { useNavigate } from "react-router";
import classes from "./searchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  let navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Millions of films and shows</h1>
      <h2 className={classes.suptitle}>Discover and enjoy</h2>
      <div className={classes.searchBar}>
        <input
          placeholder="e.g Barack Obama, Godfather etc."
          className={classes.input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className={classes.submit}
          onClick={() => navigate(`/movflix/search/${query}`)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
