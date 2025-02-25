import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setContentType, setCategory, setPage} from "../../store/filtersSlice";
import {RootState} from "../../store/store";
import {discover, getTrending, getPopular, getTopRated, getUpcoming} from "../../api";
import {Filters, PagesSwitcher, TypeItems, Preloader} from "../../components";
import classes from "./typeExpanded.module.css";

interface Item {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

export const TypeExpanded: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {contentType, selectedCategory, filters, currentPage} = useSelector((state: RootState) => state.filters);
  let touchStartX = 0;
  let touchEndX = 0;
  const [items, setItems] = useState<Item[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // New state for sidebar toggle
  /** Handle swipe gestures */
  // Swipe gestures for opening/closing the sidebar
  const handleTouchStart = (e: any) => {
    e.currentTarget.dataset.touchStart = String(e.touches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    e.currentTarget.dataset.touchMove = String(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: any) => {
    const touchStart = Number(e.currentTarget.dataset.touchStart);
    const touchMove = Number(e.currentTarget.dataset.touchMove);

    if (touchStart - touchMove > 50) {
      setIsSidebarOpen(false);
    } else if (touchMove - touchStart > 50) {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      setIsFetching(true);
      try {
        let response: {results: Item[]; total_pages: number} | undefined;

        if (selectedCategory === "filters") {
          response = await discover(contentType, {
            page: currentPage,
            ...filters,
          });
        } else if (selectedCategory === "trending") {
          response = await getTrending(contentType, currentPage);
        } else if (selectedCategory === "popular") {
          response = await getPopular(contentType, currentPage);
        } else if (selectedCategory === "best") {
          response = await getTopRated(contentType, currentPage);
        } else if (selectedCategory === "upcoming" || selectedCategory === "on_the_air") {
          response = await getUpcoming(contentType, currentPage);
        }

        setItems(response && response.results ? response.results : []);
        setTotalPages(response && response.total_pages ? response.total_pages : 0);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchItems();
  }, [contentType, selectedCategory, filters, currentPage]);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
    dispatch(setPage(1));
    navigate(`/movflix/discover/${contentType}?category=${category}&page=1`);
    setIsSidebarOpen(false); // Close sidebar after selection on mobile
  };

  return (
    <div className={classes.container}>
      {/* Sidebar Toggle Button for Mobile */}

      <div
        className={`${classes.sidebar} ${isSidebarOpen ? classes.open : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className={classes.sidebarTitle}>Browse</h2>

        <div className={classes.contentTypeSwitcher}>
          <button
            className={`${classes.contentTypeButton} ${contentType === "movie" ? classes.active : ""}`}
            onClick={() => dispatch(setContentType("movie"))}
          >
            Movies
          </button>
          <button
            className={`${classes.contentTypeButton} ${contentType === "tv" ? classes.active : ""}`}
            onClick={() => dispatch(setContentType("tv"))}
          >
            TV Shows
          </button>
        </div>

        <div className={classes.categorySwitcher}>
          <button
            className={`${classes.categoryButton} ${selectedCategory === "filters" ? classes.active : ""}`}
            onClick={() => handleCategoryChange("filters")}
          >
            Filters
          </button>
          <button
            className={`${classes.categoryButton} ${selectedCategory === "trending" ? classes.active : ""}`}
            onClick={() => handleCategoryChange("trending")}
          >
            Trending
          </button>
          <button
            className={`${classes.categoryButton} ${selectedCategory === "popular" ? classes.active : ""}`}
            onClick={() => handleCategoryChange("popular")}
          >
            Popular
          </button>
          <button
            className={`${classes.categoryButton} ${selectedCategory === "best" ? classes.active : ""}`}
            onClick={() => handleCategoryChange("best")}
          >
            Best
          </button>
          {contentType === "movie" && (
            <button
              className={`${classes.categoryButton} ${selectedCategory === "upcoming" ? classes.active : ""}`}
              onClick={() => handleCategoryChange("upcoming")}
            >
              Upcoming
            </button>
          )}
        </div>

        {selectedCategory === "filters" && (
          <div className={classes.filtersContainer}>
            <Filters />
          </div>
        )}
      </div>

      <div className={classes.mainContent}>
        {isFetching ? (
          <Preloader />
        ) : (
          <>
            <TypeItems items={items} content_type={contentType} />
            {totalPages > 1 && (
              <PagesSwitcher
                currentPage={currentPage}
                setCurrentPage={(page) => dispatch(setPage(page))}
                totalPages={totalPages}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
