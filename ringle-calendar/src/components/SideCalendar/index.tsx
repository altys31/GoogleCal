import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { format } from "date-fns";
import styles from "./style.module.scss";
import type { RootState } from "../../store/store";
import { setDate } from "../../store/dateSlice";
import "./daypicker-custom.css";
import { useDispatch, useSelector } from "react-redux";

export interface SideCalendarProps {
  sideFold: boolean;
}

export const SideCalendar = ({ sideFold }: SideCalendarProps) => {
  const date = useSelector((state: RootState) => state.date.currentDate);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div
        className={`${styles.sideCalendar} flex justify-center ${
          sideFold ? styles.folded : styles.unfolded
        }`}
        onTransitionEnd={() => setVisible(false)}
      >
        <DayPicker
          navLayout="after"
          showOutsideDays
          locale={ko}
          selected={date}
          animate
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
