import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from '../utils/apiService';
import Config from 'react-native-config';

const initialState = {
  albums: null,
  loading: false,
  error: null,
  offset: 0,
};

export const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAlbums.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, {payload}) => {
      if (state.albums && state.albums.length > 0) {
        state.albums.push(...payload);
      } else {
        state.albums = payload;
      }
      state.offset += 20;
      state.loading = false;
    });
    builder.addCase(fetchAlbums.rejected, (state, {error}) => {
      state.error = error.message;
      state.loading = false;
    });
  },
});

export default albumSlice.reducer;

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAlbums',
  async (offset, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        `albums/top?apikey=${Config.NAPSTER_API_KEY}&limit=20&offset=${offset}`,
      );
      return await response.data.albums;
    } catch (error) {
      return rejectWithValue({error: error.message});
    }
  },
);
