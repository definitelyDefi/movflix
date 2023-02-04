import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSearchEpisodes } from "./../../http";
import { Episodes, SmallHeader, Preloader } from "../../components";

export const EpisodesPage = () => {
  let { id, season } = useParams();

  let dispatch = useDispatch();
  let currentSeason = useSelector((state) => state.shows.currentShow.currentSeason);
  let isFetching = useSelector((state) => state.global.isFetching);
  useEffect(() => {
    dispatch(getSearchEpisodes(id, season));
  }, [dispatch, id, season]);

  return (
    <div>
      {isFetching ? (
        <Preloader />
      ) : (
        <div>
          <SmallHeader
            headerImage={currentSeason.poster_path}
            title={currentSeason.name}
            date={currentSeason.air_date || ""}
            text={"Back to seasons"}
            padding={"330"}
          />

          <Episodes season={currentSeason} />
        </div>
      )}
    </div>
  );
};
