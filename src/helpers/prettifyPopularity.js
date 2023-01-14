export const get_movie_popularity = (vote) => {
  let popularity = Math.floor(vote * 10);
  return popularity;
};

export const get_persons_popularity = (vote) => {
  let popularity = Math.floor(vote);
  return popularity;
};
