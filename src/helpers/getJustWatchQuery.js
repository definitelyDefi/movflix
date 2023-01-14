export const get_just_watch_query = (title, content_type) => {
  title = title.replace(/\s+/g, "-").toLowerCase();
  let query =
    content_type === "movie"
      ? `https://justwatch.com/uk/movie/${title}`
      : `https://justwatch.com/uk/tv-series/${title}`;
  return query;
};
