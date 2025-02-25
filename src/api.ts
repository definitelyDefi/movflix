import axios, {AxiosInstance} from "axios";
import keywords from "./assets/keywords.json";
import i18n from "./i18n";

interface Keyword {
  id: number;
  name: string;
}
interface Rating {
  iso_3166_1: string;
  rating: string;
  [key: string]: any;
}
interface ProfileData {
  favorites: any[];
  watchlist: any[];
  collections: any[];
}

interface Video {
  name: string;
  key: string;
  [key: string]: any;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  media_type: string;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

interface CreditsResponse {
  cast: CastMember[];
  crew: CrewMember[];
}

interface GetCurrentContentOptions {
  search?: string;
  with_keywords?: string;
  with_genres?: string;
  sort_by?: string;
  vote_average_gte?: string;
  vote_average_lte?: string;
  page?: number;
}

interface DiscoverResponse {
  results: any[];
  total_pages: number;
}

interface ContentDetails {
  id: number;
  title?: string;
  name?: string;
  keywords: {id: number; name: string}[];
  images: {backdrops: any[]; posters: any[]};
  videos: {results: {name: string; key: string}[]};
  video_url: {key: string};
  [key: string]: any;
  reviews: [];
  poster_path: string;
  similar: {}[];
}

// Mapping i18n short codes to TMDB full codes
const TMDB_LANGUAGE_MAP: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  ru: "ru-RU",
};

export const defaultParams = {
  page: 1,
  get language() {
    return TMDB_LANGUAGE_MAP[i18n.language] || "en-US"; // Default to "en-US"
  },
};

export const tmdb_api: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_MOVIES_API_KEY,
  },
});

const omdb_api: AxiosInstance = axios.create({
  baseURL: "https://omdbapi.com/",
  params: {
    apikey: process.env.REACT_APP_MOVIES_OMDB_API_KEY,
  },
});
export const getCollectionDetails = async (collectionId: number) => {
  try {
    const response = await tmdb_api.get(`/collection/${collectionId}`, {
      params: {...defaultParams},
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch collection details for ID ${collectionId}:`, error);
    throw error;
  }
};

export const getProfileData = async (accountId: number, sessionId: string): Promise<ProfileData> => {
  try {
    const [favoritesResponse, watchlistResponse, collectionsResponse] = await Promise.all([
      tmdb_api.get(`/account/${accountId}/favorite/movies`, {
        params: {session_id: sessionId},
      }),
      tmdb_api.get(`/account/${accountId}/watchlist/movies`, {
        params: {session_id: sessionId},
      }),
      tmdb_api.get(`/account/${accountId}/lists`, {
        params: {session_id: sessionId},
      }),
    ]);

    return {
      favorites: favoritesResponse.data.results || [],
      watchlist: watchlistResponse.data.results || [],
      collections: collectionsResponse.data.results || [],
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw new Error("Failed to fetch profile data");
  }
};
export const syncWatchlistWithServer = async () => {
  const response = await tmdb_api.get("/account/{account_id}/watchlist/movies", {
    params: {
      session_id: localStorage.getItem("session_id"),
    },
  });
  return response.data.results.map((item: any) => ({
    id: item.id,
    title: item.title || item.name,
    type: item.media_type,
    poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
  }));
};

export const addToServerWatchlist = async (item: any) => {
  await tmdb_api.post(
    "/account/{account_id}/watchlist",
    {
      media_type: item.type,
      media_id: item.id,
      watchlist: true,
    },
    {
      params: {
        session_id: localStorage.getItem("session_id"),
      },
    }
  );
};

export const removeFromServerWatchlist = async (id: number) => {
  await tmdb_api.post(
    "/account/{account_id}/watchlist",
    {
      media_type: "movie",
      media_id: id,
      watchlist: false,
    },
    {
      params: {
        session_id: localStorage.getItem("session_id"),
      },
    }
  );
};
export const getSessionId = async (requestToken: string): Promise<string> => {
  try {
    const response = await tmdb_api.post("authentication/session/new", {
      request_token: requestToken,
    });
    if (response.data && response.data.session_id) {
      return response.data.session_id;
    }
    throw new Error("Failed to retrieve session ID");
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const createRequestToken = async (): Promise<string> => {
  try {
    const response = await tmdb_api.get("authentication/token/new");
    if (!response.data.success) throw new Error("Failed to create request token");
    return response.data.request_token;
  } catch (error) {
    console.error("Error creating request token:", error);
    throw error;
  }
};

export const fetchSession = async (requestToken: string): Promise<string> => {
  try {
    const response = await tmdb_api.post("authentication/session/new", {
      request_token: requestToken,
    });
    if (!response.data.success) throw new Error("Failed to create session");
    return response.data.session_id;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};

export const getAccountDetails = async (sessionId: string) => {
  try {
    const response = await tmdb_api.get("account", {
      params: {session_id: sessionId},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching account details:", error);
    throw error;
  }
};

export const addItem = async (
  accountId: any,
  sessionId: any,
  contentType: "movie" | "tv",
  itemId: any,
  isWatchlist: boolean
) => {
  try {
    const endpoint = isWatchlist ? `/account/${accountId}/watchlist` : `/account/${accountId}/favorite`;
    await tmdb_api.post(
      endpoint,
      {
        media_type: contentType,
        media_id: itemId,
        [isWatchlist ? "watchlist" : "favorite"]: true,
      },
      {params: {session_id: sessionId}}
    );
    console.log(`Item successfully added to ${isWatchlist ? "watchlist" : "favorites"}.`);
  } catch (error) {
    console.error(`Failed to add item to ${isWatchlist ? "watchlist" : "favorites"}.`, error);
    throw error;
  }
};

export const getItems = async (accountId: number, sessionId: string, isWatchlist: boolean, page: number = 1) => {
  try {
    const endpointType = isWatchlist ? "watchlist" : "favorite";

    const [moviesResponse, tvResponse] = await Promise.all([
      tmdb_api.get(`/account/${accountId}/${endpointType}/movies`, {
        params: {session_id: sessionId, page},
      }),
      tmdb_api.get(`/account/${accountId}/${endpointType}/tv`, {
        params: {session_id: sessionId, page},
      }),
    ]);

    const combinedResults = [...moviesResponse.data.results, ...tvResponse.data.results];

    console.log(`${isWatchlist ? "Watchlist" : "Favorites"} fetched successfully.`, combinedResults);

    return combinedResults;
  } catch (error) {
    console.error(`Failed to fetch ${isWatchlist ? "watchlist" : "favorites"}.`, error);
    throw error;
  }
};

export const removeItem = async (
  accountId: number,
  sessionId: string,
  contentType: "movie" | "tv",
  itemId: number,
  isWatchlist: boolean
) => {
  try {
    const endpoint = isWatchlist ? `/account/${accountId}/watchlist` : `/account/${accountId}/favorite`;
    await tmdb_api.post(
      endpoint,
      {
        media_type: contentType,
        media_id: itemId,
        [isWatchlist ? "watchlist" : "favorite"]: false,
      },
      {params: {session_id: sessionId}}
    );
    console.log(`Item successfully removed from ${isWatchlist ? "watchlist" : "favorites"}.`);
  } catch (error) {
    console.error(`Failed to remove item from ${isWatchlist ? "watchlist" : "favorites"}.`, error);
    throw error;
  }
};
export const getRecommendations = async (
  movieId: string,
  initialContentType: string,
  contentType: "movie" | "tv",
  page: number
) => {
  try {
    let endpoint = "";

    if (contentType === initialContentType) {
      endpoint = `/${contentType}/${movieId}/similar`;
    } else {
      endpoint = `/${contentType}/${movieId}/recommendations`;
    }

    console.log(`Fetching from endpoint: ${endpoint} with page: ${page}`);

    const response = await tmdb_api.get(endpoint, {params: {...defaultParams, page}});

    console.log("Response Data:", response.data);

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from endpoint with ID ${movieId}:`, error);
    throw error;
  }
};

export const findKeywordIdByName = (name: string): number | null => {
  if (!name) return null;
  const keyword = (keywords as Keyword[]).find((k) => k.name.toLowerCase() === name.toLowerCase());
  return keyword ? keyword.id : null;
};

export const findKeywordIdsString = (keywordNames: string = ""): string | null => {
  if (!keywordNames) return null;

  const keywordIds = keywordNames
    .split(",")
    .map((name) => {
      const keyword = (keywords as Keyword[]).find((k) => k.name.toLowerCase().trim() === name.toLowerCase().trim());
      return keyword ? keyword.id : null;
    })
    .filter((id): id is number => id !== null);

  return keywordIds.join(",");
};

export const getPerson = async (personId: number): Promise<any> => {
  try {
    const response = await tmdb_api.get(`/person/${personId}`, {
      params: {
        ...defaultParams,
        append_to_response: "combined_credits,external_ids",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch person with ID ${personId}:`, error);
    throw error;
  }
};

export const discover = async (
  contentType: string,
  options: GetCurrentContentOptions = {}
): Promise<DiscoverResponse> => {
  try {
    console.log("filters", options);
    let results: any[] = [];
    let page = 1;
    let totalPages = 1;

    if (options.search) {
      while (page <= totalPages) {
        const response = await tmdb_api.get(`/search/${contentType}`, {
          params: {
            ...defaultParams,
            query: options.search,
            page,
          },
        });
        results = [...results, ...response.data.results];
        totalPages = response.data.total_pages;
        page++;
        if (page > 5) break;
      }
      return {results, total_pages: 1};
    }

    const findedKeywords = findKeywordIdsString(options.with_keywords);
    const response = await tmdb_api.get(`/discover/${contentType}`, {
      params: {
        ...defaultParams,
        page: options.page || 1,
        sort_by: options.sort_by || "popularity.desc",
        with_genres: options.with_genres || null,
        with_keywords: findedKeywords || null,
        vote_average_gte: options.vote_average_gte || null,
        vote_average_lte: options.vote_average_lte || null,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return {results: [], total_pages: 0};
  }
};

export const getMainPageMovies = async (): Promise<{
  latestMovies: any[];
  topShows: any[];
  popularMovies: any[];
  upcomingMovies: any[];
  popularShows: any[];
}> => {
  const [np_movies, tp_shows, pop_movies, up_movies, pop_shows] = await Promise.all([
    tmdb_api.get("movie/now_playing", {params: defaultParams}),
    tmdb_api.get("tv/top_rated", {params: defaultParams}),
    tmdb_api.get("movie/popular", {params: defaultParams}),
    tmdb_api.get("movie/upcoming", {params: defaultParams}),
    tmdb_api.get("tv/popular", {params: defaultParams}),
  ]);

  return {
    latestMovies: np_movies.data.results,
    topShows: tp_shows.data.results,
    popularMovies: pop_movies.data.results,
    upcomingMovies: up_movies.data.results,
    popularShows: pop_shows.data.results,
  };
};

export const searchKeyword = async (query: string): Promise<any[]> => {
  try {
    const response = await tmdb_api.get("/search/keyword", {
      params: {...defaultParams, query},
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching for keyword:", error);
    throw error;
  }
};

export const getTVGenres = async (): Promise<any[]> => {
  try {
    const response = await tmdb_api.get("/genre/tv/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching TV genres:", error);
    throw error;
  }
};

export const getCurrentContent = async (
  contentType: string,
  contentId: number,
  title: string = ""
): Promise<ContentDetails> => {
  try {
    const isMovie = contentType === "movie";

    const [contentResponse, imagesResponse] = await Promise.all([
      tmdb_api.get(`${contentType}/${contentId}`, {
        params: {
          ...defaultParams,
          append_to_response:
            "keywords,reviews,external_ids,similar,credits,videos,watch/providers" +
            (isMovie ? ",images" : ",content_ratings"),
        },
      }),
      tmdb_api.get(`${contentType}/${contentId}/images`, {
        params: {include_image_language: defaultParams.language},
      }),
    ]);

    const video = contentResponse.data.videos.results.find(
      (video: Video) => video.name === "Official Trailer" || video.name === "Trailer"
    );

    const additionalData: Record<string, any> = {};

    if (!isMovie) {
      additionalData.ratings = contentResponse.data.content_ratings.results.filter(
        (rating: Rating) => rating.iso_3166_1 === "US"
      );
    } else if (title) {
      const omdbResponse = await omdb_api.get("/", {params: {t: title}});
      additionalData.omdbDetails = {
        awards: omdbResponse.data.Awards,
        director: omdbResponse.data.Director,
        writer: omdbResponse.data.Writer,
        actors: omdbResponse.data.Actors,
        rated: omdbResponse.data.Rated,
        language: omdbResponse.data.Language,
      };
    }

    return {
      ...contentResponse.data,
      keywords: isMovie ? contentResponse.data.keywords.keywords : contentResponse.data.keywords.results,
      socials: contentResponse.data.external_ids,
      reviews: contentResponse.data.reviews.results,
      similar: contentResponse.data.similar.results,
      credits: contentResponse.data.credits,
      video_url: video ? `https://www.youtube.com/watch?v=${video.key}` : null,
      images: imagesResponse.data,
      ...additionalData,
    };
  } catch (error) {
    console.error(`Failed to fetch ${contentType} with ID ${contentId}:`, error);
    throw error;
  }
};

export const getTrending = async (contentType: string, page: number = 1): Promise<DiscoverResponse> => {
  try {
    const response = await tmdb_api.get(`/trending/${contentType}/week`, {params: {...defaultParams, page}});
    return response.data;
  } catch (error) {
    console.error(`Error fetching trending ${contentType}:`, error);
    throw error;
  }
};

export const getPopular = async (contentType: string, page: number = 1): Promise<DiscoverResponse> => {
  try {
    const response = await tmdb_api.get(`/${contentType}/popular`, {params: {...defaultParams, page}});
    return response.data;
  } catch (error) {
    console.error(`Error fetching popular ${contentType}:`, error);
    throw error;
  }
};

export const getTopRated = async (contentType: string, page: number = 1): Promise<DiscoverResponse> => {
  try {
    const response = await tmdb_api.get(`/${contentType}/top_rated`, {params: {...defaultParams, page}});
    return response.data;
  } catch (error) {
    console.error(`Error fetching top-rated ${contentType}:`, error);
    throw error;
  }
};

export const getUpcoming = async (content_type: "movie" | "tv", page: number = 1): Promise<DiscoverResponse> => {
  try {
    const response = await tmdb_api.get(content_type === "movie" ? `/movie/upcoming` : "/tv/on_the_air", {
      params: {...defaultParams, page},
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getCredits = async (contentType: string, contentId: number): Promise<CreditsResponse> => {
  try {
    const endpoint = contentType === "movie" ? `movie/${contentId}/credits` : `tv/${contentId}/aggregate_credits`;
    const response = await tmdb_api.get(endpoint, {params: defaultParams});
    return {cast: response.data.cast, crew: response.data.crew};
  } catch (error) {
    console.error(`Failed to fetch ${contentType} credits for ID ${contentId}:`, error);
    throw error;
  }
};

export const getContentDetails = async (contentType: string, contentId: number): Promise<ContentDetails> => {
  try {
    const response = await tmdb_api.get(`${contentType}/${contentId}`, {
      params: {
        ...defaultParams,
        append_to_response: "images,keywords,videos",
      },
    });

    const video = response.data.videos.results.find(
      (video: Video) => video.name === "Official Trailer" || video.name === "Trailer"
    );

    return {
      ...response.data,
      video_url: video ? `https://www.youtube.com/watch?v=${video.key}` : null,
    };
  } catch (error) {
    console.error(`Failed to fetch ${contentType} details for ID ${contentId}:`, error);
    throw error;
  }
};
