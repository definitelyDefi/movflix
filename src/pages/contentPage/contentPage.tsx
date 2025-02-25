import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import classes from "./contentPage.module.css";
import background from "./../../assets/background.jpg";
import poster_placeholder from "./../../assets/no_poster.png";
import {getCurrentContent} from "../../api";
import {Header, Preloader, Description} from "../../components";
import InfoBlock, {InfoBlockProps} from "../../components/InfoBlock/infoBlock";
import ErrorPage from "../../components/errorPage/ErrorPage";
import {Credits, Genre, OmdbDetails, Ratings} from "../../components/description/description";
import {BelongsToCollectionProps} from "../../components/collectionBlock/collectionBlock";

interface Video {
  key: string;
  type?: string;
  name: string;
}

interface ContentType {
  id: any;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  genres?: Genre[];
  vote_average?: number;
  tagline?: string;
  overview?: string;
  credits?: Credits;
  ratings?: Ratings[];
  omdbDetails?: OmdbDetails;
  poster_path: string;

  video_url?: {key: string};
  reviews: Array<any>;

  belongs_to_collection?: BelongsToCollectionProps;
  images?: any;
  similar: Array<any>;

  videos?: {results: Video[]};
  seasons?: Array<{id: number; name: string; air_date: string}>;
  [key: string]: any;
}

export const ContentPage: React.FC = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const contentType = queryParams.get("content_type") as "movie" | "tv";
  const contentId = queryParams.get("id");
  const searchTitle = queryParams.get("title");

  const [content, setContent] = useState<ContentType | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (!contentType || !contentId) {
        console.error("Invalid content type or ID.");
        return;
      }

      setIsFetching(true);
      try {
        const fetchedContent = await getCurrentContent(contentType, parseInt(contentId, 10), searchTitle || "");
        setContent(fetchedContent);
      } catch (error) {
        console.error(`Failed to fetch ${contentType} data:`, error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchContent();
  }, [contentType, contentId, searchTitle]);

  if (isFetching) {
    return <Preloader />;
  }

  if (!content) {
    return <ErrorPage message="Error loading content" />;
  }

  console.log("content", content);

  const trailerItem =
    (content &&
      content.videos &&
      content.videos.results &&
      content.videos.results.find((item) => item.type === "Trailer")) ||
    undefined;
  const seasons = contentType === "tv" ? content.seasons || [] : [];
  const lastSeason = seasons.length > 0 ? seasons[seasons.length - 1] : null;

  const safeContent: InfoBlockProps["currentContent"] = {
    id: content.id,
    name: content.name,
    title: content.title,
    video_url: content.video_url,
    reviews: content.reviews,
    credits: content.credits || {cast: []},
    belongs_to_collection: content.belongs_to_collection,
    images: content.images,
    similar: content.similar,
    socials: content.socials,
    production_companies: content.production_companies,
    watch_providers: content["watch/providers"],
    production_countries: content.production_countries,
    homepage: content.homepage,
    original_title: content.original_title,
    countries: content.countries,
    budget: content.budget,
    revenue: content.revenue,
    keywords: content.keywords,
  };

  const handleWatchlistChange = () => {
    console.log("Watchlist change triggered.");
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <img className={classes.backgroundImage} src={background} alt="background" />
          <div className={classes.content}>
            <img
              className={classes.posterImage}
              alt="Poster"
              src={
                content.poster_path ? `https://image.tmdb.org/t/p/original${content.poster_path}` : poster_placeholder
              }
            />
            <Description
              data={content}
              type={contentType}
              trailerItem={trailerItem}
              onWatchlistChange={handleWatchlistChange}
            />
          </div>
        </div>
        <InfoBlock
          currentContent={safeContent}
          contentType={contentType}
          isMovie={contentType === "movie"}
          lastSeason={lastSeason}
          trailerItem={trailerItem}
        />
      </div>
    </>
  );
};
