import { group_by_year } from "./groupByYear";

export const get_cast = (cast_unformatted) => {
  let cast = cast_unformatted
    .filter((item) => item.release_date || item.first_air_date)
    .map((item) => ({
      ...item,
      release_date: item.release_date ? item.release_date : item.first_air_date,
      title: item.title ? item.title : item.name,
    }));

  let castFormatted = cast.map((obj) => {
    return {
      ...obj,
      release_date: new Date(obj.release_date),
    };
  });
  let sortedCast = castFormatted.sort(
    (objA, objB) => Number(objB.release_date) - Number(objA.release_date)
  );

  let grouped_by_year = group_by_year(sortedCast);

  return grouped_by_year;
};
