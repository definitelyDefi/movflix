import React from "react";
import classes from "./trailer.module.css";
export function Trailer({ id }) {
  return (
    <div className={classes.trailerBlock}>
      <iframe
        width="1000"
        height="515"
        src={`https://www.youtube.com/embed/${id}?vq=hd720`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowfullscreen
      ></iframe>
    </div>
  );
}
