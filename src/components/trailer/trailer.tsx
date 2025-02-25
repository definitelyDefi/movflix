import React from "react";
import classes from "./trailer.module.css";

interface TrailerProps {
  id: string;
}

export const Trailer: React.FC<TrailerProps> = ({id}) => {
  return (
    <div className={classes.trailerBlock}>
      <iframe
        width="1000"
        height="515"
        src={`https://www.youtube.com/embed/${id}?vq=hd720`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
