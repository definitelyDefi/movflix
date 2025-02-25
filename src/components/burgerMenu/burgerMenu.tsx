import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {useNavigate} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import classes from "./burgerMenu.module.css";
import {useTranslation} from "react-i18next";
interface MenuItem {
  label: string;
  link: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface BurgerMenuProps {
  status: boolean;
}

export function BurgerMenu({status}: BurgerMenuProps) {
  const {t} = useTranslation();
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/movflix/discover/?content_type=tv&search=${query}`);
    }
  };

  if (!status) return null;

  const menuItems: MenuSection[] = [
    {
      title: t("movies"),
      items: [
        {label: t("popular_movies"), link: "/movflix/discover/?content_type=tv&category=popular"},
        {label: t("best_movies"), link: "/movflix/categories/movie/best"},
        {label: t("upcoming_movies"), link: "/movflix/categories/movie/upcoming"},
      ],
    },
    {
      title: t("shows"),
      items: [
        {label: t("popular_shows"), link: "/movflix/categories/tv/trending"},
        {label: t("best_shows"), link: "/movflix/categories/tv/best"},
        {label: t("on_the_air"), link: "/movflix/categories/tv/upcoming"},
      ],
    },
  ];

  return (
    <nav className={classes.container}>
      <div className={classes.burgerMenuWrapper}>
        {menuItems.map((menu, index) => (
          <div key={index} className={classes.burgerItem}>
            <Dropdown>
              <Dropdown.Toggle className={classes.dropdownToggle}>{menu.title}</Dropdown.Toggle>
              <Dropdown.Menu>
                {menu.items.map((item, idx) => (
                  <Dropdown.Item key={idx} href={item.link}>
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ))}

        <div className={classes.burgerItem}>
          <div className={classes.searchField}>
            <input
              type="text"
              placeholder={t("search")}
              className={classes.searchBar}
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className={classes.submitButton} onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
