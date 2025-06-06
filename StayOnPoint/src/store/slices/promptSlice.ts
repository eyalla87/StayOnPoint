import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Prompt {
  id: string;
  text: string;
}

interface PromptState {
  currentPrompt: Prompt | null;
  promptHistory: Prompt[];
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  currentPrompt: null,
  promptHistory: [],
  loading: false,
  error: null,
};

const promptSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    fetchPromptStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPromptSuccess(state, action: PayloadAction<Prompt>) {
      state.loading = false;
      state.currentPrompt = action.payload;
      state.promptHistory.push(action.payload);
    },
    fetchPromptFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPrompt(state) {
      state.currentPrompt = null;
    },
  },
});

export const {
  fetchPromptStart,
  fetchPromptSuccess,
  fetchPromptFailure,
  resetPrompt,
} = promptSlice.actions;

export default promptSlice.reducer;
