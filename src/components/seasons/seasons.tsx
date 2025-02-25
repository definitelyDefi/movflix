import React from "react";
import {Season} from "./season/season";

interface SeasonProps {
  id: number;
  name: string;
  air_date?: string;
  episode_count?: number;
  poster_path?: string;
  overview?: string;
  season_number: number;
}

interface SeasonsProps {
  seasons: SeasonProps[];
  title: string;
  show_id: number;
}

export const Seasons: React.FC<SeasonsProps> = ({seasons, title, show_id}) => {
  return (
    <div>
      {seasons.map((season) => (
        <Season key={season.id} season={season} title={title} show_id={show_id} />
      ))}
    </div>
  );
};
