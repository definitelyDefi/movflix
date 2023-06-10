import { types } from "../types";

const defaultStore = {
  topShows: [
    {
      poster_path: "",
      name: "",
      first_air_date: "",
      genres: [{ name: "", id: 0 }],
      vote_average: 0,
    },
  ],
  popularShows: [
    {
      poster_path: "",
      name: "",
      first_air_date: "",
      genres: [{ name: "", id: 0 }],
      vote_average: 0,
    },
  ],
  currentShow: {
    video_url: [{ key: "" }],
    full_credits: {
      cast: [
        {
          known_for_department: "",
          name: "",
          profile_path: "",
          total_episodes_count: "",
          roles: [{ character: "", episode_count: 0 }],
        },
      ],
      crew: [
        {
          known_for_department: "",
          name: "",
          profile_path: "",
          department: "",
          total_episodes_count: "",
          jobs: [{ job: "", episode_count: 0 }],
        },
      ],
    },
    credits: {
      cast: [{ known_for_department: "", name: "", profile_path: "", character: "" }],
      crew: [{ name: "", department: "", profile_path: "", job: "" }],
    },
    ratings: [{ iso_3166_1: "", rating: "" }],
    poster_path: "",
    name: "",
    rated: null,
    first_air_date: "",
    genres: [{ name: "", id: 0 }],
    keywords: [{ name: "", id: 0 }],
    reviews: [
      {
        author: "",
        content: "",
        created_at: "",
        author_details: { avatar_path: "" },
      },
    ],
    episode_run_time: "",
    number_of_episodes: 0,
    number_of_seasons: 0,
    vote_average: 0,
    tagline: "",
    overview: "",
    seasons: [
      {
        name: "",
        air_date: "",
        episode_count: 0,
        overview: "",
        poster_path: "",
        season_number: 0,
        id: 0,
      },
    ],
    similar: [{ first_air_date: "" }],
    original_name: "",
    status: "",
    homepage: "",
    external_ids: {
      facebook_id: "",
      twitter_id: "",
      instagram_id: "",
    },
    type: "",
    networks: [{ id: 0, logo_path: "" }],
    currentSeason: {
      episodes: [
        {
          air_date: "",
          episode_number: 0,
          id: 0,
          name: "",
          overview: "",
          still_path: "",
          vote_average: "",
        },
      ],
      name: "",
      poster_path: "",
      air_date: "",
      season_number: "",
    },
  },
};

export const showsReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case types.SET_CURRENT_SEASON:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          currentSeason: {
            episodes: action.episodes,
            name: action.name,
            poster_path: action.poster_path,
            air_date: action.air_date,
            season_number: action.season_number,
          },
        },
      };
    case types.SET_SHOW_FULL_CREDITS:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          full_credits: { crew: action.crew, cast: action.cast },
        },
      };
    case types.SET_TOP_RATED_SHOWS:
      return {
        ...state,
        topShows: action.topShows,
      };
    case types.SET_POPULAR_SHOWS:
      return {
        ...state,
        popularShows: action.popularShows,
      };

    case types.SET_CURRENT_SHOW:
      return {
        ...state,
        currentShow: {
          ...state.currentShow,
          ...action.currentShow,
          keywords: action.keywords,
          external_ids: action.external_ids,
          similar: action.similar,
          reviews: action.reviews,
          ratings: action.ratings,
          credits: action.credits,
          video_url: action.video_url,
        },
      };

    default:
      return state;
  }
};
