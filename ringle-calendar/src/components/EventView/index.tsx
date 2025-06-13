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
import type { Appointment } from "../../types/type";

export interface EventViewProps {
  folded: boolean;
  openAddModal: () => void;
  openEditModal: () => void;
  handleSelectedEvent: (e: Appointment) => void;
}

export const EventView = ({
  folded,
  openAddModal,
  openEditModal,
  handleSelectedEvent,
}: EventViewProps) => {
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
                    openAddModal();
                  }
                }}
              />
            )}
          />
          <MonthView />
          <Toolbar />
          <ViewSwitcher />
          <Appointments
            appointmentComponent={(props) => (
              <Appointments.Appointment
                {...props}
                onClick={() => {
                  openEditModal();
                  if (
                    !props.data.id ||
                    !props.data.title ||
                    !props.data.startDate ||
                    !props.data.endDate
                  )
                    return;
                  handleSelectedEvent({
                    id: props.data.id.toString(),
                    title: props.data.title,
                    startDate: new Date(props.data.startDate),
                    endDate: new Date(props.data.endDate),
                  });
                }}
              />
            )}
          />
        </Scheduler>
      </Paper>
    </div>
  );
};
