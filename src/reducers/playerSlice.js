import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/apiService';
import Config from 'react-native-config';

const initialState = {
  tracks: null,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addTracks: (state, {payload}) => {
      state.tracks = payload;
    },
  },
});

export default playerSlice.reducer;

export const {addTracks} = playerSlice.actions;
