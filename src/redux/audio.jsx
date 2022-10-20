import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initializing state
const initialState = {
  loading: false,
  musics: null,
  music: null,
  charts: null,
  error: null,
  playstate: "",
  nowplaying: false,
  index: "",
  success: null,
};

// Generates async functions

export const fetchMusics = createAsyncThunk("musics/fetchMusics", () => {
  return axios.get("https://musicapp-api.onrender.com/api/").then((response) => response.data);
});

export const fetchCharts = createAsyncThunk("musics/fetchCharts", () => {
  return axios.get("https://musicapp-api.onrender.com/api/charts/").then((response) => response.data);
});
export const fetchPlaylist = createAsyncThunk("musics/fetchPlaylist", (e) => {
  return axios.get(`https://musicapp-api.onrender.com/api/${e}`).then((response) => response.data);
});

// working for likes

//
const musicSlice = createSlice({
  name: "music",
  initialState,

  // working for async fetching data
  extraReducers: (builder) => {
    builder.addCase(fetchMusics.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMusics.fulfilled, (state, action) => {
      state.loading = false;
      state.musics = action.payload;
      state.error = null;
    });
    builder.addCase(fetchMusics.rejected, (state, action) => {
      state.loading = false;
      state.musics = null;
      state.error = action.error.message;
    });
    //
    // CHARTS
    builder.addCase(fetchCharts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCharts.fulfilled, (state, action) => {
      state.loading = false;
      state.charts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchCharts.rejected, (state, action) => {
      state.loading = false;
      state.charts = null;
      state.error = action.error.message;
    });
    //
    // Playlist
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.loading = false;
      state.music = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      state.loading = false;
      state.music = null;
      state.error = action.error.message;
    });
  },
  reducers: {
    setPlaystate: (state, action) => {
      state.playstate = action.payload;
    },
    setPlaying: (state, action) => {
      state.nowplaying = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    setMusic: (state, action) => {
      state.music = action.payload;
    },
    setMusics: (state, action) => {
      state.musics = action.payload;
    },
  },
});

export const { setPlaystate, setPlaying, setIndex, setMusic ,setMusics} =
  musicSlice.actions;

export default musicSlice.reducer;
