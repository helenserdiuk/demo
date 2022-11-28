import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import db from "../../firebase/config";

const auth = getAuth(db);

export const createNewUser = createAsyncThunk(
  "users/register",
  async (data, { rejectWithValue }) => {
    try {
      const { userName, email, password } = data;
      // console.log("data", data);
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: userName });
      const user = auth.currentUser;
      console.log("user", user);

      const value = {
        token: user.accessToken,
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };
      console.log(value);
      return value;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const value = {
        token: user.accessToken,
        email: user.email,
        displayName: user.displayName,
        uid: user.uid,
      };
      return value;
      console.log(value);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLogOut = createAsyncThunk(
  "users/logOut",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
