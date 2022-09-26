import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/apiService';
import Config from 'react-native-config';

const initialState = {
  tracks: null,
  currIdx: 0,
  isPlaying: false,
  playerInit: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    initPlayer: state => {
      state.playerInit = true;
    },
    addTracks: (state, {payload}) => {
      state.tracks = payload;
      state.isPlaying = true;
    },
    setTrackIndex: (state, {payload}) => {
      state.currIdx = payload;
    },
    togglePlayPause: (state, {payload}) => {
      state.isPlaying = payload;
    },
  },
});

export default playerSlice.reducer;

export const {initPlayer, addTracks, setTrackIndex, togglePlayPause} = playerSlice.actions;
