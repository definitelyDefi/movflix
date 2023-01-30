import { types } from "../types";

const defaultStore = {
  currentPerson: {
    also_known_as: [],
    biography: "",
    birthday: "",
    deathday: "",
    homepage: "",
    imdb_id: "",
    known_for_department: "",
    name: "",
    place_of_birth: "",
    popularity: "",
    profile_path: "",
    known_for: [{}],
    combined_credits: {
      cast: [{ id: 0, title: "", release_date: "", media_type: "", character: "" }],
      crew: [
        {
          id: 0,
          title: "",
          release_date: "",
          media_type: "",
          department: "",
          job: "",
        },
      ],
    },
    external_ids: {
      tvrage_id: "",
      facebook_id: "",
      instagram_id: "",
      twitter_id: "",
    },
    images: {
      profiles: [{ aspect_ratio: "", file_path: "" }],
    },
  },
};

export const personReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case types.SET_CURRENT_PERSON:
      return {
        ...state,
        currentPerson: { ...state.currentPerson, ...action.currentPerson },
      };

    default:
      return state;
  }
};
