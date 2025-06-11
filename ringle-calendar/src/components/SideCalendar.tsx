import { useEffect, useState } from "react";
import "./SideCalendar.scss";

export interface SideCalendarProps {
  sideFold: boolean;
}

export const SideCalendar = ({ sideFold }: SideCalendarProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <div
        className={`sideCalendar ${sideFold ? "folded" : "unfolded"}`}
        onTransitionEnd={() => setVisible(false)}
        onTransitionRun={() => setVisible(true)}
      >
        캘린더
      </div>
    </>
  );
};
