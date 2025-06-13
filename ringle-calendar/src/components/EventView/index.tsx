import { ViewState } from "@devexpress/dx-react-scheduler";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  Appointments,
  WeekView,
  ViewSwitcher,
  MonthView,
  Toolbar,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setDate } from "../../store/dateSlice";

import { useState } from "react";
export interface EventViewProps {
  folded: boolean;
  handleModal: () => void;
}
export const EventView = ({ folded, handleModal }: EventViewProps) => {
  const date = useSelector((state: RootState) => state.date.currentDate);
  const appointments = useSelector((state: RootState) => state.appointment.currentEvent);
  const dispatch = useDispatch();

  return (
    <div className={`h-full duration-300 ${folded ? `w-full` : `w-10/12`}`}>
      <Paper>
        <Scheduler data={appointments} height={660} locale={"kr-ko"}>
          <ViewState currentDate={date} />
          <WeekView
            cellDuration={60}
            timeTableCellComponent={(props) => (
              <WeekView.TimeTableCell
                {...props}
                onClick={() => {
                  if (props.startDate) {
                    dispatch(setDate(props.startDate));
                    handleModal();
                  }
                }}
              />
            )}
          />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
};
