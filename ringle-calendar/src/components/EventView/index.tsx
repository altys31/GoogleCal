import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  Appointments,
  WeekView,
  ViewSwitcher,
  MonthView,
  Toolbar,
  EditRecurrenceMenu,
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
    <div className={`duration-300 overflow-x-hidden ${folded ? `w-full` : `w-23/24`}`}>
      <Paper>
        <Scheduler data={appointments} locale={"kr-ko"}>
          <ViewState currentDate={date} />
          <WeekView
            cellDuration={60}
            dayScaleCellComponent={({ startDate, today, ...rest }) => {
              const dayName = startDate.toLocaleDateString("ko-KR", { weekday: "short" }); // ex. 일
              const dayNum = startDate.getDate();

              return (
                <th
                  {...rest}
                  className={`dx-scheduler-header-panel-cell text-center py-2 ${
                    today ? "text-blue-600 font-bold" : "text-gray-800 font-bold"
                  }`}
                >
                  <div className="flex flex-col items-center leading-snug">
                    <span>{dayName}</span>
                    <span className="text-3xl">{dayNum}</span>
                  </div>
                </th>
              );
            }}
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
                    rRule: props.data.rRule ? props.data.rRule : "",
                  });
                }}
              />
            )}
          />
          <EditingState onCommitChanges={() => {}} />
          <EditRecurrenceMenu />
        </Scheduler>
      </Paper>
    </div>
  );
};
