import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logoutSuccess: (state) => {
      return {
        ...state,
        user: null,
      };
    },

  },
});

export const { loginSuccess, logoutSuccess, offlineMode } = userSlice.actions;
export default userSlice.reducer;
