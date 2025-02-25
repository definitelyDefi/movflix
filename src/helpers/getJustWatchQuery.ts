export const getJustWatchQuery = (title: string, contentType: "tv" | "movie"): string => {
  title = title.replace(/\s+/g, "-").toLowerCase();
  return contentType === "movie"
    ? `https://justwatch.com/uk/movie/${title}`
    : `https://justwatch.com/uk/tv-series/${title}`;
};
