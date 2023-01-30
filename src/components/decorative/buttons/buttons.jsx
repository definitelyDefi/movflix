import React from "react";
import classes from "./buttons.module.css";

export const BlueButton = ({ text, onClick = (fn) => fn }) => {
  return (
    <button className={classes.blueButton} onClick={onClick}>
      {text}
    </button>
  );
};
