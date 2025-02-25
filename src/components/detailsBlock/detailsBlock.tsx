import React from "react";
import {getJustWatchQuery} from "../../helpers/getJustWatchQuery";
import {JustWatch, Facebook, Homepage, Instagram, Twitter, Imdb} from "./../decorative/icons";
import classes from "./detailsBlock.module.css";
import {Link} from "react-router-dom";
import {BelongsToCollectionProps, CollectionBlock} from "../collectionBlock/collectionBlock";
import {Share} from "../Share/Share";
import {useTranslation} from "react-i18next";

interface Company {
  name: string;
  logo_path: string | null;
}

interface Country {
  name: string;
}

interface WatchProvider {
  provider_name: string;
  logo_path: string;
  name?: string;
  logo?: string;
}
interface Network {
  logo_path: string | null;
}

interface Keyword {
  id: number;
  name: string;
}

export interface Content {
  production_companies?: Company[];
  production_countries?: Country[];
  external_ids?: any;
  socials?: any;
  homepage?: string;
  original_title?: string;
  known_by?: string;
  birth_day?: string;
  birth_place?: string;
  known_as?: string[];
  status?: string;
  in_production?: boolean;
  belongs_to_collection?: BelongsToCollectionProps;
  languages?: string;
  watch_providers: {
    results: {
      US?: {
        flatrate?: WatchProvider[];
      };
    };
  };
  budget?: number;
  revenue?: number;
  awards?: string;
  type?: string;
  networks?: Network[];
  keywords?: Keyword[];
  title?: string;
  name?: string;
}

interface DetailsBlockProps {
  content: Content;
  variant?: string;
  type: string;
  content_type: string;
}

export const DetailsBlock: React.FC<DetailsBlockProps> = ({content, variant, type, content_type}) => {
  const {t} = useTranslation();
  const companyNames = (content.production_companies || []).map((company) => ({
    name: company.name,
    logo: company.logo_path ? `https://image.tmdb.org/t/p/original${company.logo_path}` : null,
  }));
  console.log("details content", content);
  const countries = (content.production_countries || []).map((country) => country.name).join(", ") || "N/A";

  let watchProviders: WatchProvider[] = [];

  if (
    content.watch_providers &&
    content.watch_providers.results &&
    content.watch_providers.results.US &&
    content.watch_providers.results.US.flatrate
  ) {
    watchProviders = content.watch_providers.results.US.flatrate.map((provider) => ({
      provider_name: provider.provider_name,
      logo_path: provider.logo_path,
    }));
  }

  console.log("watch providers", watchProviders);
  return (
    <div className={classes.wrapper}>
      <div>
        <h3 className={classes.title}>{type === "person" ? "Personal information" : "Details"}</h3>
        <div className={variant === "tv" || type === "person" ? `${classes.info} ${classes.forShow}` : classes.info}>
          <div className={classes.block}>
            <div className={classes.socials}>
              {content.socials.facebook_id && <Facebook className={classes.social} id={content.socials.facebook_id} />}
              {content.socials.twitter_id && <Twitter className={classes.social} id={content.socials.twitter_id} />}
              {content.socials.instagram_id && (
                <Instagram className={classes.social} id={content.socials.instagram_id} />
              )}
              {content.homepage && <Homepage className={classes.social} link={content.homepage} />}
              {type !== "person" && (
                <JustWatch
                  className={classes.social}
                  link={getJustWatchQuery(
                    content.title || content.name || "Sample Movie",
                    content_type as "tv" | "movie"
                  )}
                />
              )}
              {content.socials.imdb_id && <Imdb className={classes.social} id={content.socials.imdb_id} type={type} />}
              <Share title={`Check out this amazing ${content_type === "movie" ? "movie" : "tv show"}!`} />
            </div>

            {content.original_title && (
              <div>
                <h3 className={classes.suptitle}>{t("original_name")}</h3>
                <p className={classes.subtext}>{content.original_title}</p>
              </div>
            )}
            {content.production_companies && (
              <div>
                <h3 className={classes.suptitle}>{t("production_companies")}</h3>
                <div className={classes.productionCompanies}>
                  {companyNames.map((company, index) => (
                    <div className={classes.companyItem} key={index}>
                      {company.logo && <img src={company.logo} alt={company.name} className={classes.companyLogo} />}
                      <p className={classes.subtext}>{company.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {countries && (
              <div>
                <h3 className={classes.suptitle}>{t("production_countries")}</h3>
                <p className={classes.subtext}>{countries}</p>
              </div>
            )}
            {watchProviders.length > 0 && (
              <div>
                <h3 className={classes.suptitle}>{t("where_to_watch")}(US)</h3>
                <div className={classes.watchProviders}>
                  {watchProviders.map((provider, index) => (
                    <div className={classes.providerItem} key={index}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.name}
                        className={classes.providerLogo}
                      />
                      <p className={classes.subtext}>{provider.provider_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {content.budget !== undefined && (
              <div>
                <h3 className={classes.suptitle}>{t("budget")}</h3>
                <p className={classes.subtext}>${content.budget.toLocaleString()}</p>
              </div>
            )}
            {content.revenue !== undefined && (
              <div>
                <h3 className={classes.suptitle}>{t("revenue")}</h3>
                <p className={classes.subtext}>
                  {content.revenue === 0 ? "In the box office now" : `$${content.revenue.toLocaleString()}`}
                </p>
              </div>
            )}
            {content.belongs_to_collection ? <CollectionBlock {...content.belongs_to_collection} /> : null}
            {content.keywords && (
              <div className={classes.block}>
                <h3 className={classes.title}>{t("keywords")}</h3>
                <div className={classes.keywords}>
                  {content.keywords.map((keyword) => (
                    <Link
                      key={keyword.id}
                      to={{
                        pathname: `/movflix/discover/${content_type}`,
                        search: `?with_keywords=${encodeURIComponent(keyword.name)}`,
                      }}
                    >
                      <button className={classes.keyword} value={keyword.id}>
                        {keyword.name}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
