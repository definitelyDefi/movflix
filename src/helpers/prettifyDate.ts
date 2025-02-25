import dayjs from "dayjs";

export const getDate = (date: string | null | undefined): string => {
  if (!date) return "";
  const dateObj = dayjs(date);
  return dateObj.isValid() ? dateObj.format("DD/MM/YYYY") : "";
};

export const getDateWithDot = (date: string | null | undefined): string => {
  if (!date) return "";
  const dateObj = dayjs(date);
  return dateObj.isValid() ? dateObj.format("DD.MM.YYYY") : "";
};

export const getSeasonDate = (date: string | null | undefined): string => {
  if (!date) return "";
  const dateObj = dayjs(date);
  return dateObj.isValid() ? dateObj.format("DD MMMM YYYY") : "";
};

export const getYear = (date: string | null | undefined): string => {
  if (!date) return "";
  const dateObj = dayjs(date);
  return dateObj.isValid() ? dateObj.format("YYYY") : "";
};
