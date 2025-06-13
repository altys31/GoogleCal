// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";
import appointmentReducer from './appointmentSlice';

export const store = configureStore({
  reducer: {
    date: dateReducer,
    appointment: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
