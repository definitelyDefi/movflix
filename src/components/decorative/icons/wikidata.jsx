import React from "react";
import wikidata from "./../../../assets/wikidata.png";

export const Wikidata = (props) => {
  return (
    <a
      className={props.className}
      href={`https://wikidata.org/wiki/${props.id}`}
    >
      <img src={wikidata} alt="" />
    </a>
  );
};
