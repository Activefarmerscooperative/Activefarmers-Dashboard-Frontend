import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    clearToken: (state) => {
      return {
        ...state,
        token: null,
      };
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
