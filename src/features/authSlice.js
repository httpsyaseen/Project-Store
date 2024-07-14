import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "http://127.0.0.1:3000/api/v1/users";

const initialState = {
  token: Cookies.get("token") || "",
  isAuthenticated: !!Cookies.get("token"),
  loading: false,
  error: null,
  user: (Cookies.get("user") && JSON.parse(Cookies.get("user"))) || "",
  photo: (Cookies.get("user") && localStorage.getItem("photo")) || "",
};

const setAuthToken = (token, user) => {
  if (token) {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("user", user, { expires: 7 });
  } else {
    Cookies.remove("token");
    Cookies.remove("user");
  }
};

export const signUp = createAsyncThunk(
  `auth/signUp`,
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData);
      const response = await axios.post(`${baseURL}/signUp`, userData);
      if (response.data.user.photo) {
        localStorage.setItem("photo", response.data.user.photo);
        delete response.data.user.photo;
      } else {
        localStorage.setItem("photo", null);
      }
      setAuthToken(response.data.token, JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/login`, credentials);
      if (response.data.user.photo) {
        localStorage.setItem("photo", response.data.user.photo);
        delete response.data.user.photo;
      } else {
        localStorage.setItem("photo", null);
      }
      setAuthToken(response.data.token, JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInfo = createAsyncThunk(
  "auth/updateInfo",
  async (credentials, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.patch(
        `${baseURL}/updateUser`,
        credentials,
        config
      );
      if (response.data.user.photo) {
        localStorage.setItem("photo", response.data.user.photo);
        delete response.data.user.photo;
      } else {
        localStorage.setItem("photo", null);
      }
      setAuthToken(auth.token, JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (credentials, { rejectWithValue, getState }) => {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
    try {
      const response = await axios.patch(
        `${baseURL}/updatePassword`,
        credentials,
        config
      );
      if (response.data.user.photo) {
        localStorage.setItem("photo", response.data.user.photo);
        delete response.data.user.photo;
      } else {
        localStorage.setItem("photo", null);
      }
      setAuthToken(response.data.token, JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      setAuthToken(null);
      state.token = "";
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.error = null;
          state.loading = false;
          if (action.payload.token) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
          }
          if (action.payload.user) {
            state.user = action.payload.user;
            state.photo = localStorage.getItem("photo");
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
