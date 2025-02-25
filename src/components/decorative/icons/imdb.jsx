import React from "react";
import imdb from "./../../../assets/imdb.png";
export const Imdb = (props) => {
  return (
    <a
      className={props.className}
      href={
        props.type === "person"
          ? `https://imdb.com/name/${props.id}`
          : `https://imdb.com/title/${props.id}`
      }
    >
      <img src={imdb} alt={""} className={props.className} />
    </a>
  );
};
