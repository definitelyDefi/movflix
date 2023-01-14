import { get_year } from "./prettifyDate";
export function group_by_year(arr) {
  var result = arr.reduce((x, y) => {
    (x[get_year(y.release_date)] = x[get_year(y.release_date)] || []).push(y);

    return x;
  }, {});
  return result;
}
