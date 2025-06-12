import { useEffect, useState } from "react";
import { DayPicker, formatCaption } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { format } from "date-fns";
import styles from "./style.module.scss";
import "./daypicker-custom.css";

export interface SideCalendarProps {
  sideFold: boolean;
}

export const SideCalendar = ({ sideFold }: SideCalendarProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div
        className={`${styles.sideCalendar} flex justify-center ${
          sideFold ? styles.folded : styles.unfolded
        }`}
        onTransitionEnd={() => setVisible(false)}
        onTransitionRun={() => setVisible(true)}
      >
        <DayPicker
          navLayout="after"
          showOutsideDays
          locale={ko}
          mode="single"
          formatters={{
            formatCaption: (date, options) => format(date, "yyyy년 M월", options),
          }}
        />
      </div>
    </>
  );
};
