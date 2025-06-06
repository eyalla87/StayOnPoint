import { configureStore } from '@reduxjs/toolkit';
import promptReducer from './slices/promptSlice';
import timerReducer from './slices/timerSlice';

export const store = configureStore({
  reducer: {
    prompts: promptReducer,
    timer: timerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
