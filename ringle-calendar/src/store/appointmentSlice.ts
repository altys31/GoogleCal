import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Appointment } from "../types/type";
import { testData } from "../components/EventView/appointments";

interface appointmentState{
  currentEvent: Appointment[];
}

const initialState: appointmentState = {
  currentEvent: testData
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.currentEvent.push(action.payload);
    },
    deleteAppointment(state, action: PayloadAction<string>) {
      state.currentEvent = state.currentEvent.filter((appointment)=> appointment.id !== action.payload)
    }
  ,}
})

export const { addAppointment, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;

