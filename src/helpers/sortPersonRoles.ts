import {group_by_year} from "./groupByYear";

interface CastItem {
  id: number;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  character?: string;
  media_type?: string;
  [key: string]: any;
}

interface FormattedCastItem {
  id: number;
  release_date: string;
  title: string;
  character?: string;
  media_type: string;
}

export const get_cast = (cast_unformatted: CastItem[]): Record<string, FormattedCastItem[]> => {
  const cast: FormattedCastItem[] = cast_unformatted
    .filter((item): item is CastItem => {
      return (
        !!item.id && !!(item.release_date || item.first_air_date) && !!(item.title || item.name) && !!item.media_type
      );
    })
    .map((item) => ({
      id: item.id,
      release_date: item.release_date || item.first_air_date || "",
      title: item.title || item.name || "",
      character: item.character || "",
      media_type: item.media_type || "",
    }));

  const sortedCast = cast.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

  return group_by_year(sortedCast);
};
