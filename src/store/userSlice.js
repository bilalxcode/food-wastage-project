// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null, // Initial state is null (no user logged in)
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
