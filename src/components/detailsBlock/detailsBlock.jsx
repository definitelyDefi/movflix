import React from "react";
import { get_just_watch_query } from "../../helpers/getJustWatchQuery";

import { JustWatch, Facebook, Homepage, Instagram, Twitter, Imdb } from "./../decorative/icons";
import classes from "./detailsBlock.module.css";

export const DetailsBlock = (props) => {
  const { content, variant, type, content_type, video } = props;

  return (
    <div className={classes.wrapper}>
      <div>
        <h3 className={classes.title}>{type === "person" ? "Personal information" : "Details"}</h3>
        <div className={variant === "show" || type === "person" ? `${classes.info} ${classes.forShow}` : classes.info}>
          <div className={classes.block}>
            <div className={classes.socials}>
              {content.external_ids.facebook_id ? (
                <Facebook className={classes.social} id={content.external_ids.facebook_id} />
              ) : null}
              {content.external_ids.twitter_id ? (
                <Twitter className={classes.social} id={content.external_ids.twitter_id} />
              ) : null}
              {content.external_ids.instagram_id ? (
                <Instagram className={classes.social} id={content.external_ids.instagram_id} />
              ) : null}
              {content.homepage ? <Homepage className={classes.social} link={content.homepage} /> : null}

              {type === "person" ? null : (
                <JustWatch
                  className={classes.social}
                  link={get_just_watch_query(content.title || content.name || "Sample Movie", content_type)}
                />
              )}
              {content.external_ids.imdb_id ? (
                <Imdb className={classes.social} id={content.external_ids.imdb_id} type={type} />
              ) : null}
            </div>

            {content.original_title !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Original name</h3>
                <p className={classes.subtext}>{content.original_title}</p>
              </div>
            ) : null}

            {content.known_by !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Known by</h3>
                <p className={classes.subtext}>{content.known_by}</p>
              </div>
            ) : null}
            {content.birth_day !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Birth date</h3>
                <p className={classes.subtext}>{content.birth_day}</p>
              </div>
            ) : null}
            {content.birth_place !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Birth place</h3>
                <p className={classes.subtext}>{content.birth_place}</p>
              </div>
            ) : null}
            {content.known_as !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Also known as</h3>
                <ul className={classes.knownAs}>
                  {content.known_as.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {content.status !== undefined ? (
              <div>
                {" "}
                <h3 className={classes.suptitle}>Status</h3>
                <p className={classes.subtext}>{content.status}</p>
              </div>
            ) : null}

            {content.languages !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>{"Original language(s)"}</h3>
                <p className={classes.subtext}>{content.languages}</p>
              </div>
            ) : null}

            {content.budget !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Budget</h3>
                <p className={classes.subtext}>${content.budget}</p>
              </div>
            ) : null}

            {content.revenue !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Revenue</h3>
                <p className={classes.subtext}>
                  {content.revenue === 0 ? "In the box office now" : `$${content.revenue}`}
                </p>
              </div>
            ) : null}

            {content.awards !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Awards</h3>
                <p className={classes.subtext}>{content.awards}</p>
              </div>
            ) : null}
            {content.type !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>Type</h3>
                <p className={classes.subtext}>{content.type}</p>
              </div>
            ) : null}
            {content.networks !== undefined ? (
              <div>
                <h3 className={classes.suptitle}>TV Networks</h3>
                <div className={classes.networks}>
                  {content.networks.map((network, i) =>
                    network.logo_path ? (
                      <div className={classes.networkItem} key={i}>
                        <img
                          src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                          alt={""}
                          className={classes.networkImage}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ) : null}
          </div>
          {type === "person" ? null : (
            <div className={classes.block}>
              <h3 className={classes.title}>Keywords</h3>
              <div className={classes.keywords}>
                {content.keywords.map((keyword) => (
                  <div key={keyword.id} className={classes.keyword}>
                    {keyword.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
