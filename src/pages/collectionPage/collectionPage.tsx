import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {getCollectionDetails} from "../../api";
import classes from "./collectionPage.module.css";
import ErrorPage from "../../components/errorPage/ErrorPage";
import {Preloader} from "../../components";
import {useTranslation} from "react-i18next";

interface CollectionDetails {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  parts: {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
  }[];
}

export const CollectionPage: React.FC = () => {
  const location = useLocation();
  const {t} = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [collection, setCollection] = useState<CollectionDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(id);
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCollectionDetails(Number(id));
        setCollection(data);
      } catch (err) {
        setError("Failed to load collection details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCollection();
    }
  }, [id]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <ErrorPage message={"Something went wrong"} />;
  }

  if (!collection) {
    return <ErrorPage message={"Collection not found"} />;
  }

  const backdropUrl = collection.backdrop_path
    ? `https://image.tmdb.org/t/p/original${collection.backdrop_path}`
    : null;

  const posterUrl = collection.poster_path
    ? `https://image.tmdb.org/t/p/w500${collection.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className={classes.collectionPage}>
      {backdropUrl && (
        <div className={classes.backdrop} style={{backgroundImage: `url(${backdropUrl})`}}>
          <div className={classes.overlay} />
        </div>
      )}
      <div className={classes.collectionBlock}>
        <div className={classes.header}>
          <img src={posterUrl} alt={collection.name} className={classes.poster} />
          <div className={classes.details}>
            <h1 className={classes.title}>{collection.name}</h1>
            <p className={classes.overview}>{collection.overview || t("no_description")}</p>
          </div>
        </div>

        <div className={classes.movies}>
          <h2 className={classes.sectionTitle}>{t("movies_in_collection")}</h2>
          <div className={classes.grid}>
            {collection.parts.map((movie) => (
              <Link to={`/movflix/page?id=${movie.id}&content_type=movie&title=${movie.title}`}>
                <div key={movie.id} className={classes.movieCard}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.title}
                    className={classes.moviePoster}
                  />
                  <h3 className={classes.movieTitle}>{movie.title}</h3>
                  <p className={classes.movieReleaseDate}>{movie.release_date || t("unknown_release_date")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
