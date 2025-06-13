import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Appointment } from "../types/type";

interface appointmentState{
  currentEvent: Appointment[];
}

const initialState: appointmentState = {
  currentEvent: []
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.currentEvent.push(action.payload);
    },
    deleteAppointment(state, action: PayloadAction<number>) {
      state.currentEvent = state.currentEvent.filter((appointment)=> appointment.id !== action.payload)
    }
  ,}
})

export const { addAppointment, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;