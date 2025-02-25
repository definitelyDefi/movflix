import {Seasons, SmallHeader, Preloader} from "../../components";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {getContentDetails} from "../../api";
import ErrorPage from "../../components/errorPage/ErrorPage";

export const SeasonsPage = () => {
  const location = useLocation();

  const [seasons, setSeasons] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const showId = queryParams.get("id");

  useEffect(() => {
    if (!showId) {
      setError("No show ID provided.");
      setIsFetching(false);
      return;
    }

    const fetchShowDetails = async () => {
      try {
        setIsFetching(true);
        const response = await getContentDetails("tv", showId);
        const {seasons, name, first_air_date, poster_path} = response;

        setSeasons(seasons || []);
        setTitle(name || "Untitled");
        setDate(first_air_date || "Unknown Date");
        setHeaderImage(poster_path || "");
        setError(null);
      } catch (err) {
        console.error("Error fetching show details:", err);
        setError("Failed to fetch show details.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchShowDetails();
  }, [location.search]);

  if (isFetching) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <div>
      <SmallHeader headerImage={headerImage} title={title} date={date} padding={"80"} text={"Back to show"} />
      <Seasons seasons={seasons} title={title} show_id={showId} />
    </div>
  );
};
