import React from "react";
import {TypeItem} from "../typeItem/typeItem";
import classes from "./typeItems.module.css";

interface TypeItemsProps {
  items: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string | null;
    profile_path?: string | null;
    vote_average?: number | null;
    vote_count?: number | null;
    release_date?: string | null;
    first_air_date?: string | null;
    known_for?: {title?: string; name?: string}[];
  }[];
  content_type: string;
}

export const TypeItems: React.FC<TypeItemsProps> = ({items, content_type}) => {
  return (
    <div className={classes.items}>
      {items.map((item) => (
        <TypeItem key={item.id} content_type={content_type} item={item} />
      ))}
    </div>
  );
};
