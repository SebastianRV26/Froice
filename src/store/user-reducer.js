import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
