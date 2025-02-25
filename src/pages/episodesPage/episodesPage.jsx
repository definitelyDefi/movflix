import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Episodes, SmallHeader, Preloader} from "../../components";

import ErrorPage from "../../components/errorPage/ErrorPage";
import {tmdb_api} from "../../api";

export const EpisodesPage = () => {
  const location = useLocation();

  const [currentSeason, setCurrentSeason] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const showId = queryParams.get("id");
    const seasonId = queryParams.get("season_id");

    if (!showId || !seasonId) {
      setError("Missing show ID or season ID.");
      setIsFetching(false);
      return;
    }

    const fetchSeasonDetails = async () => {
      try {
        setIsFetching(true);

        const response = await tmdb_api.get(`tv/${showId}/season/${seasonId}`, {
          params: {language: "en-US"},
        });

        setCurrentSeason(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching season details:", err);
        setError("Failed to fetch season details.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchSeasonDetails();
  }, [location.search]);

  if (isFetching) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div>
      <SmallHeader
        headerImage={currentSeason.poster_path}
        title={currentSeason.name || `Season ${currentSeason.season_number}`}
        date={currentSeason.air_date || ""}
        text={"Back to seasons"}
        padding={"330"}
      />
      <Episodes season={currentSeason} />
    </div>
  );
};
