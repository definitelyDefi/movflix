import { SmallHeader } from "./../smallHeader/smallHeader";
import { Seasons } from "./../seasons/seasons";
import React from "react";
import { useSelector } from "react-redux";

export const SeasonsPage = () => {
  let seasons = useSelector((state) => state.movies.currentShow.seasons);
  let title = useSelector((state) => state.movies.currentShow.name);
  let date = useSelector((state) => state.movies.currentShow.first_air_date);
  let headerImage = useSelector(
    (state) => state.movies.currentShow.poster_path
  );

  return (
    <div>
      <SmallHeader
        headerImage={headerImage}
        title={title}
        date={date}
        padding={"80"}
        text={"Back to show"}
      />
      <Seasons seasons={seasons} title={title} />
    </div>
  );
};
