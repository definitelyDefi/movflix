import { TypeItem } from "../typeItem/typeItem";
import React from "react";
import classes from "./typeItems.module.css";

export function TypeItems({ items, content_type }) {
  return (
    <div className={classes.items}>
      {items.map((item) => (
        <TypeItem content_type={content_type} item={item} />
      ))}
    </div>
  );
}
