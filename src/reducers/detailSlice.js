import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/apiService';
import Config from 'react-native-config';

const initialState = {
  tracks: null,
  error: null,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    clearTracks: state => {
      state.tracks = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAlbumDetails.fulfilled, (state, {payload}) => {
      let tracks = payload.map(track => ({
        ...track,
        url: track.previewURL,
        title: track.name,
        artist: track.artistName,
        album: track.albumName,
        duration: track.playbackSeconds,
      }));
      state.tracks = tracks;
    });
    builder.addCase(fetchAlbumDetails.rejected, (state, {error}) => {
      state.error = error.message;
    });
  },
});

export default detailsSlice.reducer;

export const {clearTracks} = detailsSlice.actions;

export const fetchAlbumDetails = createAsyncThunk(
  'albums/fetchAlbumDetails',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `http://api.napster.com/v2.2/albums/${id}/tracks?apikey=${Config.NAPSTER_API_KEY}`,
      );
      return await response.data.tracks;
    } catch (error) {
      return rejectWithValue({error: error.message});
    }
  },
);
