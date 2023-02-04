import React, { useState } from "react";
import classes from "./buttons.module.css";

export const BlueButton = ({ text, onClick = (fn) => fn }) => {
  return (
    <button className={classes.blueButton} onClick={onClick}>
      {text}
    </button>
  );
};

export const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 600) {
      setVisible(true);
    } else if (scrolled <= 600) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <button className={classes.backToTop} onClick={scrollToTop} style={{ display: visible ? "inline" : "none" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classes.backToTopIcon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="35"
        height="35"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    </button>
  );
};
