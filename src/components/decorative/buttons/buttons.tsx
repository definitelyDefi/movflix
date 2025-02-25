import React, {useState, useEffect} from "react";
import classes from "./buttons.module.css";

interface BlueButtonProps {
  text: string;
  onClick?: () => void;
}

export const BlueButton: React.FC<BlueButtonProps> = ({text, onClick = () => {}}) => {
  return (
    <button className={classes.blueButton} onClick={onClick}>
      {text}
    </button>
  );
};

export const ScrollButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 600);
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={classes.backToTop}
      onClick={scrollToTop}
      style={{display: visible ? "inline" : "none"}}
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classes.backToTopIcon}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="35"
        height="35"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    </button>
  );
};
