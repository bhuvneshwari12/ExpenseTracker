import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: false,
  reducers: {
    toggleDarkMode: (state) => !state,
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer, 
  },
});

export default store;
