import { configureStore } from '@reduxjs/toolkit'
import albumReducer from '../reducers/albumSlice'

export const store = configureStore({
  reducer: {
    albums: albumReducer
  },
})