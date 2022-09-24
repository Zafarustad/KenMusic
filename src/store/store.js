import {configureStore} from '@reduxjs/toolkit';
import albumReducer from '../reducers/albumSlice';
import detailReducer from '../reducers/detailSlice';

export const store = configureStore({
  reducer: {
    albums: albumReducer,
    details: detailReducer,
  },
});
