import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addWeeks, subWeeks } from "date-fns";

interface DateState {
  currentDate: Date;
}

const initialState: DateState = {
  currentDate: new Date(),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<Date>) {
      state.currentDate = action.payload;
    },
    goToNextWeek(state) {
      state.currentDate = addWeeks(state.currentDate, 1);
    },
    goToPrevWeek(state) {
      state.currentDate = subWeeks(state.currentDate, 1);
    },
    resetToToday(state) {
      state.currentDate = new Date();
    },
  },
});

export const { setDate, goToNextWeek, goToPrevWeek, resetToToday } = dateSlice.actions;
export default dateSlice.reducer;
