import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { format } from "date-fns";
import styles from "./style.module.scss";
import type { RootState } from "../../store/store";
import { setDate } from "../../store/dateSlice";
import "./daypicker-custom.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

export interface SideCalendarProps {
  sideFold: boolean;
  handleModal: () => void;
}

export const SideCalendar = ({ sideFold, handleModal }: SideCalendarProps) => {
  const date = useSelector((state: RootState) => state.date.currentDate);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`${styles.sideCalendar} flex flex-col justify-start items-start ${
          sideFold ? styles.folded : styles.unfolded
        }`}
      >
        <div className="text-nowrap">
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleModal}
            fullWidth={false}
            size="large"
          >
            <div className="flex items-center gap-2">
              <FaPlus />
              <div>만들기</div>
            </div>
          </Button>
        </div>
        <DayPicker
          navLayout="after"
          showOutsideDays
          locale={ko}
          selected={date}
          animate
          month={date}
          onMonthChange={(newMonth) => dispatch(setDate(newMonth))}
          onSelect={(date: Date | undefined) => {
            if (date) dispatch(setDate(date));
          }}
          mode="single"
          formatters={{
            formatCaption: (date, options) => format(date, "yyyy년 MM월", options),
          }}
        />
      </div>
    </>
  );
};
