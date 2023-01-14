export const get_show_duration = (mins, episodes) => {
  mins = mins * episodes;
  let hours = mins / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
};
