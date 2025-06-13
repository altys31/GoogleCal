import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Appointment } from "../types/type";

interface appointmentState{
  currentEvent: Appointment[];
}

const initialState: appointmentState = {
  currentEvent: [{
    id: "1",
    title: "운동",
    startDate: new Date(2025,5, 13, 21,0),
    endDate: new Date(2025,5,13,22,0),
  },
  {
    id: "2",
    title: "업무",
    startDate: new Date(2025,5, 13, 9,0),
    endDate: new Date(2025,5,13,18,0),
  }]
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

