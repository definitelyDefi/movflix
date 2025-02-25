import {getYear} from "./prettifyDate";

interface Item {
  release_date: string;
  [key: string]: any;
}

export function group_by_year<T extends {release_date: string}>(arr: T[]): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const year = item.release_date.slice(0, 4);
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}
