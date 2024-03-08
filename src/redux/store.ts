import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './news.slice';

export default configureStore({
  reducer: {
    news: newsSlice,
  },
});