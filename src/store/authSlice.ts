import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AccountDetails {
  id: number;
  username: string;
  avatar?: {
    gravatar?: {hash: string};
    tmdb?: {avatar_path: string};
  };
}

interface AuthState {
  isAuthenticated: boolean;
  sessionId: string | null;
  accountDetails: AccountDetails | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  sessionId: null,
  accountDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<{sessionId: string; accountDetails: AccountDetails}>) {
      state.isAuthenticated = true;
      state.sessionId = action.payload.sessionId;
      state.accountDetails = action.payload.accountDetails;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.sessionId = null;
      state.accountDetails = null;
    },
  },
});

export const {setAuthState, logout} = authSlice.actions;
export default authSlice.reducer;
