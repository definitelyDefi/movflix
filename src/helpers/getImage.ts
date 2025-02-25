export const getImageUrl = (path: string | null, size: string): string => {
  if (!path) return "/path/to/fallback/image.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
