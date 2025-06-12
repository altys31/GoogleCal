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
import { useState } from "react";
import type { Event } from "../../types/type";
export interface EventViewProps {
  folded: boolean;
}
export const EventView = ({ folded }: EventViewProps) => {
  const date = useSelector((state: RootState) => state.date.currentDate);
  const dispatch = useDispatch();
  const [data, setData] = useState([
    {
      title: "일정",
      startDate: new Date(2025, 5, 12, 11, 30),
      endDate: new Date(2025, 5, 12, 23, 30),
    },
  ]);

  return (
    <div className={`h-full duration-300 ${folded ? `w-full` : `w-9/12`}`}>
      <Paper>
        <Scheduler data={data} height={660} locale={"kr-ko"}>
          <ViewState currentDate={date} />
          <WeekView
            cellDuration={60}
            timeTableCellComponent={(props) => (
              <WeekView.TimeTableCell {...props} onClick={() => {}} />
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
