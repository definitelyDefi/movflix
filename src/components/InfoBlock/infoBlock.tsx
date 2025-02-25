import React from "react";
import classes from "./infoBlock.module.css";
import {ReviewCarousel, DetailsBlock, CsCarousel, Trailer, SmCarousel, LastSeason} from "..";
import ImageGallery from "../gallery/ImageGallery";
import {Link} from "react-router-dom";
import {BelongsToCollectionProps} from "../collectionBlock/collectionBlock";
import {useTranslation} from "react-i18next";

export interface InfoBlockProps {
  currentContent: {
    id: number;
    socials: any;
    name?: string;
    title?: string;
    video_url?: {key: string};
    reviews: Array<any>;
    credits: {
      cast: Array<any>;
    };
    belongs_to_collection?: BelongsToCollectionProps;
    images?: any;
    similar: Array<any>;
    production_companies: [];
    watch_providers: any;
    production_countries: [];
    homepage: string;
    original_title: string;
    countries: [];
    budget: number;
    revenue: number;
    keywords: [];
  };
  contentType: "movie" | "tv";
  isMovie: boolean;
  lastSeason?: any;
  trailerItem?: {key: string};
}

const InfoBlock: React.FC<InfoBlockProps> = ({currentContent, contentType, isMovie, lastSeason, trailerItem}) => {
  // console.log("images", currentContent.images);
  const {t} = useTranslation();
  const trailerToShow = trailerItem || currentContent.video_url;

  return (
    <div className={classes.container}>
      {currentContent.reviews.length > 0 && <ReviewCarousel items={currentContent.reviews} />}

      {!isMovie ? (
        <div className={classes.details}>
          <div>
            {lastSeason && <LastSeason season={lastSeason} title={currentContent.name || ""} id={currentContent.id} />}

            {currentContent.images && <ImageGallery currentContent={currentContent} />}

            {trailerToShow && <Trailer id={trailerToShow.key} />}

            {currentContent.credits.cast.length > 0 && (
              <div className={classes.castBlock}>
                <div className={classes.headerWithButton}>
                  <h3 className={classes.castHeader}>{t("the_cast_of_the_series")}</h3>
                  <Link
                    className={classes.viewFullCastButton}
                    to={`/movflix/cast_crew?content_type=${contentType}&id=${currentContent.id}&title=${currentContent.name}`}
                  >
                    {t("view_full_cast")}
                  </Link>
                </div>
                <CsCarousel items={currentContent.credits.cast.slice(0, 11)} />
              </div>
            )}
          </div>

          <DetailsBlock content={currentContent} variant="tv" content_type="tv" type="tv" />
        </div>
      ) : (
        <>
          <DetailsBlock content={currentContent} content_type={contentType} type={contentType} />

          {currentContent.images && <ImageGallery currentContent={currentContent} />}

          {trailerToShow && <Trailer id={trailerToShow.key} />}

          {currentContent.credits.cast.length > 0 && (
            <div className={classes.castBlock}>
              <div className={classes.headerWithButton}>
                <h3 className={classes.castHeader}>{t("the_cast_of_the_movie")}</h3>
                <Link
                  className={classes.viewFullCastButton}
                  to={`/movflix/cast_crew?content_type=${contentType}&id=${currentContent.id}&title=${currentContent.name}`}
                >
                  {t("view_full_cast")}
                </Link>
              </div>
              <CsCarousel items={currentContent.credits.cast.slice(0, 11)} />
            </div>
          )}
        </>
      )}

      {currentContent.similar.length > 0 && (
        <SmCarousel
          header={isMovie ? `${t("similar")} ${t("movies")}` : `${t("similar")} ${t("shows")}`}
          isLight={true}
          items={currentContent.similar}
          moreButton={`${contentType}/recommendations`}
          marginTop="30px"
        />
      )}
    </div>
  );
};

export default InfoBlock;
