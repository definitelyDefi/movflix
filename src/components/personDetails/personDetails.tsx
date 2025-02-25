import React from "react";
import {getAge} from "../../helpers/getAge";
import {Imdb} from "../decorative/icons";
import {Wikidata} from "../decorative/icons/wikidata";
import {Facebook} from "./../decorative/icons/facebook";
import {Homepage} from "./../decorative/icons/homepage";
import {Instagram} from "./../decorative/icons/instagram";
import {Twitter} from "./../decorative/icons/twitter";
import classes from "./personDetails.module.css";
import {Share} from "../Share/Share";
import {useTranslation} from "react-i18next";

interface ExternalIds {
  facebook_id?: string;
  twitter_id?: string;
  instagram_id?: string;
  imdb_id?: string;
  wikidata_id?: string;
}

interface PersonDetailsProps {
  items: {
    ids: ExternalIds;
    homepage?: string;
    known_by?: string;
    birth_day?: string;
    birth_place?: string;
    known_as?: string[];
    death_day: string;
  };
  type: string;
}

export const PersonDetails: React.FC<PersonDetailsProps> = ({items}) => {
  const {t} = useTranslation();
  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <div className={classes.block}>
          <Share title={`Check out this amazing actor`} />
          <div className={classes.socials}>
            {items.ids.facebook_id && <Facebook className={classes.social} id={items.ids.facebook_id} />}
            {items.ids.twitter_id && <Twitter className={classes.social} id={items.ids.twitter_id} />}
            {items.ids.instagram_id && <Instagram className={classes.social} id={items.ids.instagram_id} />}
            {items.homepage && <Homepage className={classes.social} link={items.homepage} />}
            {items.ids.imdb_id && <Imdb className={classes.social} id={items.ids.imdb_id} type="person" />}
            {items.ids.wikidata_id && <Wikidata className={classes.social} id={items.ids.wikidata_id} />}
          </div>
          <h3 className={classes.title}>{t("personal_information")}</h3>

          {items.known_by && (
            <div>
              <h3 className={classes.suptitle}>{t("known_by")}</h3>
              <p className={classes.subtext}>{items.known_by}</p>
            </div>
          )}
          {items.birth_day && (
            <div>
              <h3 className={classes.suptitle}>{t("birth_date")}</h3>
              <p className={classes.subtext}>
                {items.birth_day} ({getAge(items.birth_day)} {t("years_old")})
              </p>
            </div>
          )}
          {items.birth_place && (
            <div>
              <h3 className={classes.suptitle}>{t("birth_place")}</h3>
              <p className={classes.subtext}>{items.birth_place}</p>
            </div>
          )}
          {items.known_as && items.known_as.length > 0 && (
            <div>
              <h3 className={classes.suptitle}>{t("also_known_as")}</h3>
              <ul className={classes.knownAs}>
                {items.known_as.map((item, index) => (
                  <li key={index} className={classes.knownAsItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
