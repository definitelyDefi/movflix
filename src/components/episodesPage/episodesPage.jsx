import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSearchEpisodes } from "./../../http";
import { useEffect } from "react";
import Preloader from "./../decorative/preloader/preloader";
import { SmallHeader } from "../smallHeader/smallHeader";
import { Episodes } from "../episodes/episodes";

const EpisodesPage = () => {
  let { id, season } = useParams();

  let dispatch = useDispatch();
  let currentSeason = useSelector(
    (state) => state.movies.currentShow.currentSeason
  );
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let isFetching = useSelector((state) => state.movies.isFetching);
  useEffect(() => {
    dispatch(getSearchEpisodes(api_key, id, season));
  }, [api_key, dispatch, id, season]);

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

export default EpisodesPage;
