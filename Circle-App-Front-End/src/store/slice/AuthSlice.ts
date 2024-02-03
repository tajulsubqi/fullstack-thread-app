import { seAuthToken } from "../../libs/api";
import { User } from "../../types/User";
import { createSlice } from "@reduxjs/toolkit";

const initiaslState: User = {
  id: 0,
  full_name: "",
  username: "",
  email: "",
  photo_profile: "",
  bio: "",
  following: [],
  followers: [],
  numfollowers: 0,
  numfollowing: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initiaslState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;

      seAuthToken(payload.token);
      localStorage.setItem("token", payload.token);

      const user: User = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email,
        photo_profile: payload.photo_profile,
        bio: payload.bio,
        following: payload.following,
        followers: payload.followers,
        numfollowers: payload.numfollowers,
        numfollowing: payload.numfollowing,
      };

      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;

      const user: User = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email,
        photo_profile: payload.photo_profile,
        bio: payload.bio,
        following: payload.following,
        followers: payload.followers,
        numfollowers: payload.numfollowers,
        numfollowing: payload.numfollowing,
      };

      return user;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});
