import dayjs from "dayjs";

export const get_date = (date) => {
  const dateobj = dayjs(date);
  const date_time = dateobj.format("DD/MM/YYYY");
  return date_time;
};

export const get_date_withdot = (date) => {
  const dateobj = dayjs(date);
  const date_time = dateobj.format("DD.MM.YYYY");
  return date_time;
};

export const get_season_date = (date) => {
  const dateobj = dayjs(date);
  const date_time = dateobj.format("DD MMMM YYYY");
  return date_time;
};

export const get_year = (date) => {
  const dateobj = dayjs(date);
  const date_time = dateobj.format("YYYY").toString();
  return date_time;
};
