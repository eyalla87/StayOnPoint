import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  isComplete: boolean;
}

const initialState: TimerState = {
  timeRemaining: 60, // 60 seconds timer as specified in the README
  isRunning: false,
  isComplete: false,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    startTimer(state) {
      state.isRunning = true;
      state.isComplete = false;
    },
    pauseTimer(state) {
      state.isRunning = false;
    },
    resetTimer(state) {
      state.timeRemaining = 60;
      state.isRunning = false;
      state.isComplete = false;
    },
    tickTimer(state) {
      if (state.isRunning && state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
      if (state.timeRemaining === 0 && state.isRunning) {
        state.isRunning = false;
        state.isComplete = true;
      }
    },
    setTimeRemaining(state, action: PayloadAction<number>) {
      state.timeRemaining = action.payload;
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  resetTimer,
  tickTimer,
  setTimeRemaining,
} = timerSlice.actions;

export default timerSlice.reducer;
