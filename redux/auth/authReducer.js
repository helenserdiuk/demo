import { createSlice } from "@reduxjs/toolkit";
import { createNewUser, userLogin, userLogOut } from "./authOperations";

const initialState = {
  user: {},
  token: "",
  isLogin: false,
  loading: false,
  error: null,
};

const pending = (store) => ({
  ...store,
  loading: true,
  error: null,
});

const rejected = (store, { payload }) => ({
  ...store,
  loading: false,
  error: payload,
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [createNewUser.pending]: pending,
    [createNewUser.rejected]: rejected,
    [createNewUser.fulfilled]: (store, { payload }) => ({
      ...store,
      loading: false,
      token: payload.token,
      user: {
        email: payload.email,
        uid: payload.uid,
        displayName: payload.displayName,
      },
    }),
    [userLogin.pending]: pending,
    [userLogin.rejected]: rejected,
    [userLogin.fulfilled]: (store, { payload }) => ({
      ...store,
      loading: false,
      token: payload.token,
      user: {
        email: payload.email,
        uid: payload.uid,
        displayName: payload.displayName,
      },
    }),

    [userLogOut.pending]: pending,
    [userLogOut.rejected]: rejected,
    [userLogOut.fulfilled]: (store) => ({
      ...initialState,
    }),
  },

  reducers: {
    userCurrent: (store, { payload }) => ({
      ...store,
      token: payload.token,
      user: {
        email: payload.email,
        uid: payload.uid,
        displayName: payload.displayName,
      },
    }),
  },
});

export const { userCurrent } = authSlice.actions;

export default authSlice;
